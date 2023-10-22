export const FeatureImage = ({ src, alt }: React.PropsWithChildren<{ src: string, alt: string }>) => {
  return (
    <div className="flex justify-center">
      <img src={src} alt={alt} className="max-w-full rounded-md" />
    </div>
  );
}