export const mainUrl = "https://pablopunk.com"

const processEnv = import.meta.env
const vercelUrl = processEnv.NEXT_PUBLIC_VERCEL_URL
const url = processEnv.DEV
  ? "http://localhost:4321"
  : `https://${vercelUrl || mainUrl.replace("https://", "")}`

const site = {
  SITE_URL: url,
  SITE_NAME: "Pablo Varela | Remote Developer",
  SITE_DESC:
    "Pablo Varela. Remote Developer. Check out my work or contact me. You can also find me on popular social networks as @pablopunk.",
  SITE_IMAGE:
    "https://ik.imagekit.io/pablopunk/yellow_small.jpg?updatedAt=1698073905261",
  SITE_COPYRIGHT: "Pablo Varela",
  SITE_REPO: "https://github.com/pablopunk/pablopunk.com",
}

export default site
