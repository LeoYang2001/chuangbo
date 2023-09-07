'use client'
import {sidebarLinks} from '@/constants/index'
import Image from 'next/image'
import {usePathname, useRouter} from 'next/navigation'
import { currentUser, SignedIn, SignOutButton, useAuth } from '@clerk/nextjs'
import Link from 'next/link'

const LeftSidebar = ({userIdentity,applicationNum} : any) => {
    const router = useRouter()
    const pathname = usePathname()
    const {userId} = useAuth()
    

  return (
    <section className="custom-scrollbar leftsidebar">
        <div className="flex w-full flex-1 flex-col gap-6 px-6">
            {sidebarLinks.map((link)=>{
                const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route


                if(link.route === '/profile') link.route = `${link.route}/${userId}`
                if(link.route === '/create-voyage' && userIdentity !== "Clerk")
                    return null
                if(link.route === '/todo-page' && userIdentity === "Clerk")
                    return null
                if(link.route === '/todo-page' && userIdentity !== "Clerk")
                    return (
                        <Link 
                        href={link.route}
                        key={link.label}
                        className={`leftsidebar_link  ${!isActive && 'leftsidebar_link_hover'} ${isActive && 'bg-primary-500 '}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            <p className='text-light-1 max-lg:hidden'>
                                {link.label}
                            </p>
                            <div className='sidebar-badge'>
                                <span>{applicationNum}</span>
                            </div>
                        </Link>
                        )
                return (
                    <Link 
                        href={link.route}
                        key={link.label}
                        className={`leftsidebar_link  ${!isActive && 'leftsidebar_link_hover'} ${isActive && 'bg-primary-500 '}`}
                    >
                        <Image
                            src={link.imgURL}
                            alt={link.label}
                            width={24}
                            height={24}
                        />
                        <p className='text-light-1 max-lg:hidden'>
                            {link.label}
                        </p>
                    </Link>
                )
            })}
        </div>
        <div className='mt-10 px-6'>
            <SignedIn>
                    <SignOutButton signOutCallback={()=>{
                        router.push('sign-in')
                    }}>
                        <div className='flex cursor-pointer gap-4 p-4'>
                            <Image
                                src='/assets/logout.svg'
                                alt='logout'
                                width={24}
                                height={24}
                            ></Image>

                            <p className='text-light-2 max-lg:hidden'>Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
        </div>
    </section>
  )
}

export default LeftSidebar