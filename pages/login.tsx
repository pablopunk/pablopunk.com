import { LoginForm } from "components/LoginForm";
import { useEffect, useState } from "react";

export default function Login() {
  const [error, setError] = useState(null)
  useEffect(() => {
    const errorInUrl = new URL(window.location.href).searchParams.get("error");
    if (errorInUrl) {
      setError(errorInUrl)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LoginForm error={error} />
    </div>
  )
}