import { Col, Grid2, H2, P16 } from "@/components";
import { Trans, useTranslation } from "next-i18next";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

export function Tarifs(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Main id={NAVBAR_LINKS.TARIFS}>
      <Col>
        <Title>{t("tarifs.left.title")}</Title>
        <Col>
          <P16>
            <Trans
              i18nKey="tarifs.left.summer"
              components={{
                b: <b key="b-1" />,
              }}
            />
          </P16>
          <P16>
            <Trans
              i18nKey="tarifs.left.beforeSummer"
              components={{
                b: <b key="b-2" />,
              }}
            />
          </P16>
        </Col>
      </Col>
      <Col className="mt-10 md:mt-0">
        <Title>{t("tarifs.right.title")}</Title>
        <Col>
          <P16>
            <Trans
              i18nKey="tarifs.right.start"
              components={{
                b: <b key="b-3" />,
              }}
            />
          </P16>
          <P16>
            <Trans
              i18nKey="tarifs.right.end"
              components={{
                b: <b key="b-4" />,
              }}
            />
          </P16>
        </Col>
      </Col>
    </Main>
  );
}

const Main = tw(Grid2)`
  w-full
  px-5 md:px-10
  py-20
  justify-center
`;

const Title = tw(H2)`
  text-center
  mb-7
`;
