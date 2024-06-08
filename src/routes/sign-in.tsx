import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() { 


    return (
        <div>
          <SignIn forceRedirectUrl={'/dashboard'}/>
        </div>
    )
}