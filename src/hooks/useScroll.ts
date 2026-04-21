import { useEffect, useRef, useState } from "react";

type SSRRect = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
};
const EmptySSRRect: SSRRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
};

/**
 * useScroll React custom hook
 *
 * Original source: {@link https://gist.github.com/joshuacerbito/ea318a6a7ca4336e9fadb9ae5bbb87f4}
 * Typescript version: {@link https://gist.github.com/gusfune/5ee7d6815db966ab16d88dda7cf414da}
 *
 * @param scrollX - Horizontal scroll position in pixels
 * @param scrollY - Vertical scroll position in pixels
 * @param scrollDirection - returns last position of movement, either `up`, `down` or `undefined`.
 *
 * @example ```ts
 * const { scrollX, scrollY, scrollDirection } = useScroll();
 * ```
 */
/**
 * Hook that returns information about the current scroll position of the page.
 * @returns An object containing the current scroll position in the Y and X axis, as well as the scroll direction.
 */
const useScroll = () => {
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [bodyOffset, setBodyOffset] = useState<DOMRect | SSRRect>(
    typeof window === "undefined" || !window.document
      ? EmptySSRRect
      : document.body.getBoundingClientRect(),
  );
  const [scrollY, setScrollY] = useState<number>(bodyOffset.top);
  const [scrollX, setScrollX] = useState<number>(bodyOffset.left);
  const [scrollDirection, setScrollDirection] = useState<
    "down" | "up" | undefined
  >();
  const ticking = useRef(false);

  const handleScroll = () => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const newBodyOffset =
          typeof window === "undefined" || !window.document
            ? EmptySSRRect
            : document.body.getBoundingClientRect();
        const newScrollY = -newBodyOffset.top;

        setBodyOffset(newBodyOffset);
        setScrollY(newScrollY);
        setScrollX(newBodyOffset.left);
        setScrollDirection(lastScrollTop > newScrollY ? "down" : "up");
        setLastScrollTop(newScrollY);
        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return {
    scrollY,
    scrollX,
    scrollDirection,
  };
};

export { useScroll };
