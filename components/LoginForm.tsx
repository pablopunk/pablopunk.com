import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@supabase/auth-helpers-react'
import { useTranslation } from 'hooks/useTranslation'
import { FaGithub } from 'react-icons/fa'
import { Button } from './neon/Button'

export const LoginForm = ({ error = null }) => {
  const { _ } = useTranslation()
  const { user, error: userError } = useUser()

  return (
    <div className="mt-4 flex flex-col gap-3 items-center">
      {(userError || error) && (
        <p className="text-danger">{error || error.message}</p>
      )}
      {user == null ? (
        <>
          <h2 className="text-xl">Who are you?</h2>
          <Button
            text={_('Login with github')}
            onClick={() => supabaseClient.auth.signIn({ provider: 'github' })}
            LeftIcon={FaGithub}
          />
        </>
      ) : (
        <>
          <h2>{user?.email}</h2>
          <Button
            text={_('Logout')}
            onClick={() => supabaseClient.auth.signOut()}
          />
        </>
      )}
    </div>
  )
}
