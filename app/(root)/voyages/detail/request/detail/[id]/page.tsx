import RequestDetail from '@/components/forms/RequestDetail'
import { fetchApplicationById } from '@/lib/actions/application.action';
import { fetchVoyageByNum } from "@/lib/actions/voyage.action";
import { currentUser } from '@clerk/nextjs';

const page = async ({ params }: { params: { id: string } }) => {

 
  const application = await fetchApplicationById(params.id)
 
  if (!application) return null;

  const user = await currentUser();

  if(!user) return null;
  const authorId = application.author.id
  const userId = user.id

  const ifAccess = authorId === userId

  return (
    <section >
         <h1 className="head-text mb-10">
                Request Detail             
          </h1>
          
          
          <section className='mt-12'>
         
            <RequestDetail  applicationData= {application}/>
        </section>
    </section>
  )
}

export default page