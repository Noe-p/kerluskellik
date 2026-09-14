import { staggerChild, staggerParent } from "@/components";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import tw from "tailwind-styled-components";

export function Stats(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Main
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerParent}
    >
      <Stat variants={staggerChild}>
        <Num>{"9"}</Num>
        <Label>{t("stats.travelers")}</Label>
      </Stat>
      <Stat variants={staggerChild}>
        <Num>{"4"}</Num>
        <Label>{t("stats.rooms")}</Label>
      </Stat>
      <Stat variants={staggerChild}>
        <Num>{"50 m"}</Num>
        <Label>{t("stats.beach")}</Label>
      </Stat>
      <Stat variants={staggerChild} className="border-r-0">
        <Num>{t("stats.exposureValue")}</Num>
        <Label>{t("stats.exposure")}</Label>
      </Stat>
    </Main>
  );
}

const Main = tw(motion.div)`
  grid
  grid-cols-2
  md:grid-cols-4
  w-full
  bg-primary
  border-y
  border-cream/15
`;

const Stat = tw(motion.div)`
  flex
  flex-col
  items-center
  justify-center
  gap-1
  py-8
  px-4
  border-r
  border-b
  md:border-b-0
  border-cream/10
  [&:nth-child(2)]:border-r-0
  md:[&:nth-child(2)]:border-r
`;

const Num = tw.p`
  font-title
  font-semibold
  text-secondary
  text-3xl
  md:text-4xl
`;

const Label = tw.p`
  font-sanchez
  text-cream/80
  text-[11px]
  tracking-[0.13em]
  uppercase
`;
