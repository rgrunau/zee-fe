import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <div className='w-full h-screen flex flex-col items-center justify-start bg-gray-900 text-gray-50'>
        <header className="header w-full flex items-center justify-between p-2 h-[5vh]">
          <div className='w-1/2'>
            <div>
              <p>ZEE</p>
            </div>
            </div>
            <div className='w-1/2 flex items-center justify-end'>
              <SignedIn>
                <UserButton afterSignOutUrl='/sign-in' />
              </SignedIn>
              <SignedOut>
                <Link to="/sign-in">Sign In</Link>
              </SignedOut>
            </div>
        </header>
        <main className='w-full h-full'>
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  )
}