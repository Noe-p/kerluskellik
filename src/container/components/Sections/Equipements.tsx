import { ColCenter, H2, Reveal, staggerChild, staggerParent } from "@/components";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import tw from "tailwind-styled-components";
import { NAVBAR_LINKS } from "../Navbar";

export function Equipements(): React.JSX.Element {
  const { t } = useTranslation();
  const items = Array.from({ length: 16 }, (_, i) =>
    t(`equipements.list.item${i + 1}`)
  );

  return (
    <Main id={NAVBAR_LINKS.EQUIPEMENTS}>
      <Reveal className="flex flex-col items-center">
        <Eyebrow>{t("equipements.title")}</Eyebrow>
        <Rule />
        <Heading>{t("equipements.heading")}</Heading>
      </Reveal>
      <ItemsGrid
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerParent}
        transition={{ staggerChildren: 0.05, delayChildren: 0.02 }}
      >
        {items.map((item) => (
          <ListItem key={item} variants={staggerChild}>
            <Dot />
            <Label>{item}</Label>
          </ListItem>
        ))}
      </ItemsGrid>
    </Main>
  );
}

const Main = tw(ColCenter)`
  w-full
  px-5 md:px-10
  py-14
  md:py-20
  justify-center
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

const Heading = tw(H2)`
  text-primary
  text-3xl
  md:text-4xl
`;

const ItemsGrid = tw(motion.div)`
  grid
  md:grid-cols-4
  grid-cols-1
  gap-y-5
  md:gap-5
  w-full
  max-w-300
  mt-14
  gap-x-8
  gap-y-0
`;

const ListItem = tw(motion.div)`
  flex
  items-center
  gap-3
  py-3.5
  border-b
  border-primary/10
`;

const Dot = tw.span`
  shrink-0
  w-1.5
  h-1.5
  bg-goldDeep
  rotate-45
`;

const Label = tw.p`
  font-sanchez
  text-primary
  text-[15px]
`;
