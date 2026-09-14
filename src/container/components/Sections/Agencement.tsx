import { Grid4, H2, H3, Image, P16 } from "@/components";
import { Trans, useTranslation } from "next-i18next";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

export function Agencement(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Main id={NAVBAR_LINKS.AGENCEMENT}>
      <Head>
        <HeadText>
          <Eyebrow>{t("agencement.title")}</Eyebrow>
          <Rule />
          <Heading>{t("agencement.heading")}</Heading>
        </HeadText>
        <Porthole>
          <Image
            fill
            objectFit="cover"
            className="rounded-full"
            loading="lazy"
            src="/images/jardin/jardin-3.webP"
            alt="Vue sur la baie"
          />
        </Porthole>
      </Head>
      <CardsGrid>
        <Card>
          <Index>{"01"}</Index>
          <CardTitle>{t("agencement.items.item1.title")}</CardTitle>
          <CardText>{t("agencement.items.item1.content")}</CardText>
        </Card>
        <Card>
          <Index>{"02"}</Index>
          <CardTitle>{t("agencement.items.item2.title")}</CardTitle>
          <List>
            <Item>{t("agencement.items.item2.list.item1")}</Item>
            <Item>{t("agencement.items.item2.list.item2")}</Item>
            <Item>{t("agencement.items.item2.list.item3")}</Item>
            <Item>{t("agencement.items.item2.list.item4")}</Item>
          </List>
        </Card>
        <Card>
          <Index>{"03"}</Index>
          <CardTitle>{t("agencement.items.item3.title")}</CardTitle>
          <List>
            <Item>{t("agencement.items.item3.list.item1")}</Item>
            <Item>{t("agencement.items.item3.list.item2")}</Item>
          </List>
        </Card>
        <Card>
          <Index>{"04"}</Index>
          <CardTitle>{t("agencement.items.item4.title")}</CardTitle>
          <List>
            <Item>
              <Trans
                i18nKey="agencement.items.item4.list.item1"
                components={{ b: <b key="b-1" className="text-cream" /> }}
              />
            </Item>
            <Item>
              <Trans
                i18nKey="agencement.items.item4.list.item2"
                components={{ b: <b key="b-2" className="text-cream" /> }}
              />
            </Item>
          </List>
        </Card>
      </CardsGrid>
    </Main>
  );
}

const Main = tw.div`
  bg-primary
  w-full
  px-5 md:px-10
  py-20
  md:py-28
`;

const Head = tw.div`
  flex
  flex-col-reverse
  md:flex-row
  items-center
  justify-between
  gap-10
  md:gap-14
  max-w-300
  mx-auto
  mb-14
`;

const HeadText = tw.div`
  flex
  flex-col
`;

const Eyebrow = tw.p`
  font-sanchez
  text-secondary
  text-xs
  font-medium
  tracking-[0.22em]
  uppercase
  text-center
  md:text-left
`;

const Rule = tw.div`
  w-14
  h-px
  bg-secondary
  my-5
  mx-auto
  md:mx-0
`;

const Heading = tw(H2)`
  text-cream
  text-3xl
  leading-tight
  text-center
  md:text-left
  max-w-140
`;

const Porthole = tw.div`
  relative
  shrink-0
  w-40 h-40
  md:w-56 md:h-56
  rounded-full
  border-4
  border-secondary
  p-2
  shadow-2xl
`;

const CardsGrid = tw(Grid4)`
  max-w-300
  mx-auto
`;

const Card = tw.div`
  bg-navySoft
  border-t-2
  border-secondary
  p-7
  flex
  flex-col
`;

const Index = tw.span`
  font-title
  italic
  text-secondary
  text-sm
  mb-4
`;

const CardTitle = tw(H3)`
  text-cream
  mb-4
`;

const CardText = tw(P16)`
  text-cream/85
  text-sm
  leading-relaxed
`;

const List = tw.ul`
  flex
  flex-col
  gap-2.5
`;

const Item = tw.li`
  text-cream/85
  text-sm
  leading-snug
  pl-4
  relative
  before:content-['']
  before:absolute
  before:left-0
  before:top-2
  before:w-1.5
  before:h-1.5
  before:bg-secondary
  before:rotate-45
`;
