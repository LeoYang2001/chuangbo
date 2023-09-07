import CreateVoyage from '@/components/forms/CreateVoyage'
import { fetchUser } from '@/lib/actions/user.action';
import {currentUser} from '@clerk/nextjs'
import {redirect, useRouter} from 'next/navigation'

const page = async () => {

  const user = await currentUser();


    if(!user) return null;

    const userInfo = await fetchUser(user.id)

    if(!userInfo?.onboarded) redirect('/onboarding')


  return (
    <section>
            <h1 className="head-text mb-10">
                Create Voyage
            </h1>
            <CreateVoyage  userId={userInfo._id}/>
        </section>
  )
}

export default page