import Image from "next/image";

export const FeatureImage = ({
  src,
  alt,
}: React.PropsWithChildren<{ src: string; alt: string }>) => {
  const filename = src.split("/").pop()?.split(".").shift() || "";
  const thumbnail = `/posts/thumbnails/${filename}.jpg`;

  return (
    <div className="flex justify-center">
      <Image
        className="rounded-md"
        src={src}
        blurDataURL={thumbnail}
        alt={alt}
        width={700}
        height={500}
        placeholder="blur"
      />
    </div>
  );
};
