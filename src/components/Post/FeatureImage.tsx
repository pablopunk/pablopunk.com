import Image from "next/image";
import { imageKitUrl } from "~/imagekit/url";

const width = 700;
const height = 500;

export const FeatureImage = ({
  src,
  alt,
}: React.PropsWithChildren<{ src: string; alt: string }>) => {
  const imageSrc = imageKitUrl({ src, width, height });
  const imageThumbnail = imageKitUrl({
    src,
    width: width / 4,
    height: height / 4,
    quality: 0.4,
    blur: 5,
  });

  return (
    <div className="flex justify-center">
      <Image
        className="rounded-md"
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        priority
        placeholder="blur"
        blurDataURL={imageThumbnail}
      />
    </div>
  );
};
