import React from 'react'
import { SignedOut, SignedIn, UserButton, SignInButton } from '@clerk/clerk-react';

function App() {
  return (
    <div>

      <h1>Home</h1>
      <SignedOut>
        <SignInButton mode="modal"/>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

    </div>
  )
}

export default App