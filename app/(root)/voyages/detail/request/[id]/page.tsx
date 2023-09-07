import Request from '@/components/forms/Request'
import { fetchVoyageByNum } from '@/lib/actions/voyage.action'
import { fetchUser } from '@/lib/actions/user.action';
import {currentUser} from '@clerk/nextjs'

const Page = async ({ params }: { params: { id: string } })=>{

    const voyage = await fetchVoyageByNum(params.id)
    if (!voyage) return null;
  
    const user = await currentUser();
  
    if(!user) return null;
  
    const authorId = voyage.author.id
    const userId = user.id
    const ifAccess = authorId === userId
    
    const voyageNum = voyage.voyageNumber
    const userInfo = await fetchUser(user.id)
    const username = userInfo.username

    return (
        <section>
            <h1 className="head-text mb-10">
              Request
            </h1>
            {
              ifAccess ? (
                <Request username = {username} voyageNum = {voyageNum} voyageId = {voyage._id} userId={userInfo._id} />

              ):(
                <p style={{color:'red'}} className='head-text mb-10'>You Don't Have Access To This Action</p>
              )
            }
        </section>
    )
}

export default Page