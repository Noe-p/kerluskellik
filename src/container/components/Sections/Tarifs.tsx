import { useTranslation } from "next-i18next";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

export function Tarifs(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Main id={NAVBAR_LINKS.TARIFS}>
      <Col>
        <Eyebrow>{t("tarifs.title")}</Eyebrow>
        <Rule />
        <Row>
          <Label>{t("tarifs.summer.label")}</Label>
          <Value>{t("tarifs.summer.value")}</Value>
        </Row>
        <Row>
          <Label>{t("tarifs.beforeSummer.label")}</Label>
          <Value>{t("tarifs.beforeSummer.value")}</Value>
        </Row>
      </Col>
      <Col className="mt-14 md:mt-0">
        <Eyebrow>{t("tarifs.infoTitle")}</Eyebrow>
        <Rule />
        <Row>
          <Label>{t("tarifs.start.label")}</Label>
          <Value>{t("tarifs.start.value")}</Value>
        </Row>
        <Row>
          <Label>{t("tarifs.end.label")}</Label>
          <Value>{t("tarifs.end.value")}</Value>
        </Row>
      </Col>
    </Main>
  );
}

const Main = tw.div`
  grid
  md:grid-cols-2
  gap-16 md:gap-20
  w-full
  max-w-300
  mx-auto
  px-5 md:px-10
  py-20
  md:py-28
`;

const Col = tw.div`
  flex
  flex-col
`;

const Eyebrow = tw.p`
  font-sanchez
  text-goldDeep
  text-xs
  font-medium
  tracking-[0.22em]
  uppercase
`;

const Rule = tw.div`
  w-14
  h-px
  bg-goldDeep
  my-5
`;

const Row = tw.div`
  flex
  flex-col
  md:flex-row
  md:items-baseline
  justify-between
  gap-1.5 md:gap-6
  py-5
  border-b
  border-primary/10
  first:pt-0
`;

const Label = tw.p`
  font-sanchez
  text-primary/65
  text-[11.5px]
  tracking-[0.08em]
  uppercase
  md:max-w-58
  leading-relaxed
`;

const Value = tw.p`
  font-title
  font-semibold
  text-primary
  text-lg
  md:text-2xl
  whitespace-nowrap
`;
