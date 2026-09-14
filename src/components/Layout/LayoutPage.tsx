import { SeoHead } from "@/container/components";
import { ReactNode } from "react";

interface LayoutPageProps {
  children?: ReactNode;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export function LayoutPage(props: LayoutPageProps): React.JSX.Element {
  const { children, seoTitle, seoDescription, seoKeywords } = props;

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
      />
      {children}
    </>
  );
}
