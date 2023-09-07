import UpdateVoyage from '@/components/forms/UpdateVoyage'
import { fetchVoyageByNum } from '@/lib/actions/voyage.action'
import CreateVoyage from '@/components/forms/CreateVoyage'
import { fetchUser } from '@/lib/actions/user.action';
import {currentUser} from '@clerk/nextjs'
import {redirect} from 'next/navigation'


const page = async ({ params }: { params: { id: string } }) => {

  const voyage = await fetchVoyageByNum(params.id)
  if (!voyage) return null;

  const user = await currentUser();

  if(!user) return null;

  const authorId = voyage.author.id
  const userId = user.id

  const ifAccess = authorId === userId

  const userInfo = await fetchUser(user.id)

  if(!userInfo?.onboarded) redirect('/onboarding')
  const voyageInfo = {
    voyageNumber : voyage.voyageNumber || "",
    portToll : voyage.portToll || "",
    departure : voyage.departure || "",
    departureTime : voyage.deparureTime || new Date(),
    arrival : voyage.arrival || "",
    arrivalTime : voyage.arrivalTime || new Date(),
  }

  return (
    <section>
            <h1 className="head-text mb-10">
                Edit Voyage ({params.id})
            </h1>
            {
              ifAccess ? (
                <UpdateVoyage userId={userInfo._id} voyageInfo={voyageInfo} />
              ):(
                <p style={{color:'red'}} className='head-text mb-10'>You Don't Have Access To This Action</p>
              )
            }
        </section>
  )
}

export default page