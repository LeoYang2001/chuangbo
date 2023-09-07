import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider, currentUser, useAuth } from "@clerk/nextjs"
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Topbar from '@/components/shared/Topbar'
import BottomBar from '@/components/shared/Bottombar'
import { fetchUser } from '@/lib/actions/user.action'
import { identityToApproveLevel } from '@/lib/utils'
import { fetchApplicationsWithApproveLevel } from '@/lib/actions/application.action'


const inter = Inter({ subsets: ['latin'] })



export const  metadata = {
  title:'Vessel',
  description:'A vessel backend system'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings
    
  const userInfo = await fetchUser(user.id)
  const userIdentity = userInfo?.identity

    const approveLevel = identityToApproveLevel(userIdentity)
    const applications = await fetchApplicationsWithApproveLevel(approveLevel)


  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>
        <Topbar/>
        <main className='flex flex-row'>
           <LeftSidebar userIdentity={userIdentity} applicationNum = {applications.length} />
            <section className='main-container'>
              <div className='w-full max-w-5xl'>
                  {children}
              </div>
            </section>
          {/* <RightSidebar/> */}
        </main>
        <BottomBar/>
      </body>
    </html>
    </ClerkProvider>
    
  )
}
