import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

export const Img = ({
  src,
  alt,
}: DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  return <img src={src} alt={alt} className="my-2 rounded-sm w-9/12 mx-auto" />;
};
