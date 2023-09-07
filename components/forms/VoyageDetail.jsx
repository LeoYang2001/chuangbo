import Link from 'next/link';
import Image from 'next/image';
import DeleteButton from '@/components/shared/DeleteButton'
import { formatDate } from '@/lib/utils';
import ApplicationCard from '@/components/cards/ApplicationCard'
import { fetchApplicationsByVoyageId } from '@/lib/actions/application.action';
import FileDownloader from '../shared/FileDownloader';


const VoyageDetail = async ({voyageData,ifAccess}) => {

  const user = voyageData.author
  const voyageInfo = voyageData
  const voyageNum = voyageData.voyageNumber
  const applications = await fetchApplicationsByVoyageId(voyageInfo._id)
  return (

    <section className='table-section' style={{
      backgroundImage:'url(/assets/boat.png)', 
      backgroundRepeat:'no-repeat',
      backgroundPosition:'top right'
    }}>
      
      {
        ifAccess && (
          <div className='btnGroup'>
        <Link href={`/voyages/edit/${voyageInfo.voyageNumber}`}>
              <div className='flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2'>
                <Image
                  src='/assets/edit.svg'
                  alt='logout'
                  width={16}
                  height={16}
                />

                <p className='text-light-2 max-sm:hidden'>Edit</p>
              </div>
            </Link>
            
            <Link href={`/voyages/detail/request/${voyageInfo.voyageNumber}`}>

              <div className='flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2'>
                <Image
                  src='/assets/edit.svg'
                  alt='logout'
                  width={16}
                  height={16}
                />

                <p className='text-light-2 max-sm:hidden'>Request</p>
              </div>
            </Link>
      </div>
        )
      }
      <div className='detailItem'>
          <h1>Creator</h1>
          <h2>{user.name}</h2>
      </div>
      <div className='detailItem'>
          <h1>Port Toll</h1>
          <h2>{voyageInfo.portToll}</h2>
      </div>
      <div className='detailItem'>
          <h1>Departure</h1>
          
          <h2>{`${voyageInfo.departure} | ${formatDate(voyageInfo.departureTime)}`}</h2>
      </div>
      
      <div className='detailItem'>
          <h1>Arrival</h1>
          <h2>{`${voyageInfo.arrival} | ${formatDate(voyageInfo.arrivalTime)}`}</h2>
      </div>

      <div className='detailItem'>
          <h1>Download File</h1>
          <FileDownloader fileUrl={voyageInfo.file}/>
      </div>

      <div style={{
        margin:"3rem 0"
      }} className='detailItem'>
        <h1>Applications</h1>
        <div style={{marginBottom:'1.5rem'}} className='mt-6 h-0.5 w-full bg-dark-3' />
        <ApplicationCard ifAccess={ifAccess} ifAction={false} result={applications}/>
      </div>
      {
        ifAccess ? (
          <>
            <Link href='/voyages'>
            <button
                type='button'
                className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 bg-primary-500'
              >
                Save
            </button>
          
            </Link>
            <DeleteButton voyageNumber = {voyageInfo.voyageNumber} />
          </>
        ):(
          <>
            <Link href='/voyages'>
            <button
                type='button'
                className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 bg-primary-500'
              >
                Return
            </button>
          
            </Link>
          </>
        )
      }
        

    </section>
  )
}

export default VoyageDetail