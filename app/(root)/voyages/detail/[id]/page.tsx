import VoyageDetail from '@/components/forms/VoyageDetail'
import Processing from '@/components/shared/Processing';
import { fetchVoyageByNum } from "@/lib/actions/voyage.action";
import { currentUser } from '@clerk/nextjs';

const page = async ({ params }: { params: { id: string } }) => {

  const voyage = await fetchVoyageByNum(params.id)
  if (!voyage) return null;

  const user = await currentUser();

  if(!user) return null;
  const authorId = voyage.author.id
  const userId = user.id

  const ifAccess = authorId === userId

  return (
    <section >
         <h1 className="head-text mb-10">
                {voyage.voyageNumber}
          </h1>
          
          
          <section className='mt-12'>
         
            <VoyageDetail ifAccess={ifAccess} voyageData= {voyage}/>
        </section>
    </section>
  )
}

export default page