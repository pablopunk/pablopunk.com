const mainUrl = "pablopunk.com";
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

const site = {
  SITE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://${vercelUrl || mainUrl}`,
  SITE_NAME: "Pablo Varela | Remote Web Developer",
  SITE_DESC:
    "Pablo Varela. Remote Web Developer. Check out my work or contact me. You can also find me on popular social networks as @pablopunk.",
  SITE_IMAGE:
    "https://ik.imagekit.io/pablopunk/yellow_small.jpg?updatedAt=1698073905261",
  SITE_COPYRIGHT: "Pablo Varela",
  SITE_REPO: "https://github.com/pablopunk/pablopunk.com",
};

export default site;
