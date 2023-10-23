import Image from "next/image";
import { Post } from "~/app/blog/posts";
import { imageKitUrl } from "~/imagekit/url";

const width = 700;
const height = 500;

export const PostFeatureImage = ({ post }: { post: Post }) => {
  const imageSrc = imageKitUrl({
    src: post.image,
    width,
    height,
  });
  const imageThumbnail = imageKitUrl({
    src: post.image,
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
        alt={post.title}
        width={width}
        height={height}
        priority
        placeholder="blur"
        blurDataURL={imageThumbnail}
      />
    </div>
  );
};
