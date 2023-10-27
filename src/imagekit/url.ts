type Props = {
  src: string;
  width: number;
  height: number;
  quality?: number;
  blur?: number;
};

export const imageKitUrl = ({ src, width, height, quality, blur }: Props) => {
  const params = [
    `w-${width}`,
    `h-${height}`,
    `q-${quality || 85}`,
    blur ? `bl-${blur}` : undefined,
  ];
  const url = new URL(src);
  url.searchParams.set("tr", params.join(","));
  return url.toString();
};
