import type { NextApiRequest, NextApiResponse } from 'next';
import ical, { VEvent } from 'node-ical';

export interface BookedRange {
  start: string;
  end: string;
}

interface AvailabilityResponse {
  booked: BookedRange[];
  configured: boolean;
  updatedAt: string;
}

const ICAL_URLS = [
  process.env.GOOGLE_ICAL_URL,
  process.env.AIRBNB_ICAL_URL,
].filter((url): url is string => Boolean(url));

async function fetchBookedRanges(url: string): Promise<BookedRange[]> {
  const events = await ical.async.fromURL(url);

  return Object.values(events)
    .filter((event): event is VEvent => Boolean(event) && event?.type === 'VEVENT')
    .filter((event): event is VEvent & { start: Date; end: Date } =>
      Boolean(event.start) && Boolean(event.end),
    )
    .map((event) => ({
      start: new Date(event.start).toISOString(),
      end: new Date(event.end).toISOString(),
    }));
}

function mergeRanges(ranges: BookedRange[]): BookedRange[] {
  const sorted = [...ranges].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );

  const merged = sorted.reduce<BookedRange[]>((acc, range) => {
    const last = acc[acc.length - 1];

    if (last && new Date(range.start).getTime() <= new Date(last.end).getTime()) {
      if (new Date(range.end).getTime() > new Date(last.end).getTime()) {
        return [...acc.slice(0, -1), { ...last, end: range.end }];
      }
      return acc;
    }

    return [...acc, { ...range }];
  }, []);

  return merged;
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AvailabilityResponse>,
): Promise<void> {
  if (ICAL_URLS.length === 0) {
    res.status(200).json({ booked: [], configured: false, updatedAt: new Date().toISOString() });
    return;
  }

  const results = await Promise.allSettled(ICAL_URLS.map(fetchBookedRanges));
  const allRanges = results
    .filter((result): result is PromiseFulfilledResult<BookedRange[]> => result.status === 'fulfilled')
    .flatMap((result) => result.value);

  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
  res.status(200).json({
    booked: mergeRanges(allRanges),
    configured: true,
    updatedAt: new Date().toISOString(),
  });
}
