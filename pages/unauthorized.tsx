import { T } from "components/T";

export default function Unauthorized() {
  return (
    <div className="fill-height flex items-center justify-center">
      <h1 className="text-xl text-danger">
        <T>You're not an admin of this site, so this session is useless.</T>
      </h1>
    </div>
  )
}
