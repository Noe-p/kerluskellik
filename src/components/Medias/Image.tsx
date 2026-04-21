import NextImage from "next/image";
import React, { CSSProperties } from "react";
import tw from "tailwind-styled-components";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  objectFit?: CSSProperties["objectFit"];
}

export function Image(props: ImageProps): React.JSX.Element {
  const {
    src,
    alt,
    width,
    height,
    priority = false,
    fill,
    loading = "lazy",
    className,
    objectFit = "cover",
    ...rest
  } = props;

  // For local images, use Next.js Image optimization
  if (src?.startsWith("/")) {
    // Check if fill is explicitly set or if both dimensions are missing
    const shouldUseFill =
      fill === true ||
      (fill !== false && !width && !height && className?.includes("h-"));

    if (shouldUseFill) {
      return (
        <ImageContainer className={className}>
          <NextImage
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit,
              objectPosition: "center",
            }}
            loading={priority ? "eager" : "lazy"}
            {...rest}
          />
        </ImageContainer>
      );
    }

    // For images with explicit dimensions
    return (
      <NextImage
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 600}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          objectFit,
          objectPosition: "center",
          width: "100%",
          height: "auto",
        }}
        loading={priority ? "eager" : "lazy"}
        className={className}
        {...rest}
      />
    );
  }

  // Fallback for external images
  return <ImageStyled {...props} loading={loading} />;
}

const ImageContainer = tw.div`
  w-full
  h-full
  relative
  rounded
  overflow-hidden
`;

const ImageStyled = tw.img`
  w-full
  h-full
  object-cover
  object-center
  rounded
`;
