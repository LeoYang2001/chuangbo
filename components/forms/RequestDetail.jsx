import Link from 'next/link';
import Image from 'next/image';
import { fetchVoyageById } from '@/lib/actions/voyage.action';
import ReturnButton from '@/components/shared/ReturnButton'
import FileDownloader from '@/components/shared/FileDownloader'

const inputCss = 'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 account-form_input no-focus'


const RequestDetail = async ({applicationData}) => {

  const user = applicationData.author
  const applicationInfo = applicationData
  const voyage = await fetchVoyageById(applicationInfo.voyage)

  
  return (

    <section className='table-section' style={{
      backgroundImage:'url(/assets/request.png)', 
      backgroundRepeat:'no-repeat',
      backgroundPosition:'90% 5%',
      backgroundSize:'40%'
    }}>
    
        <div className='detailItem'>
          <h1>Department</h1>
          <h2>{applicationInfo.department}</h2>
      </div>
      <div className='detailItem'>
          <h1>Applicant</h1>
          <h2>{user.username}</h2>
      </div>
      <div className='detailItem'>
          <h1>Currency</h1>
          <h2>{applicationInfo.currency}</h2>
      </div>
      
      <div className='detailItem'>
          <h1>Amount</h1>
          <h2> 
            
          {
            applicationInfo.currency === 'Yuan' && 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-yen" viewBox="0 0 16 16">
            <path d="M8.75 14v-2.629h2.446v-.967H8.75v-1.31h2.445v-.967H9.128L12.5 2h-1.699L8.047 7.327h-.086L5.207 2H3.5l3.363 6.127H4.778v.968H7.25v1.31H4.78v.966h2.47V14h1.502z"/>
          </svg>
          }
          {
            applicationInfo.currency === 'Dollar' && 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
            <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
          </svg>
          }
          
            
             {applicationInfo.amount}
             
            </h2>
      </div>

      <fieldset>
          <div  style={{ width: '100%' }} className='flex flex-col gap-3'>
          <label htmlFor='paymentReason' className='text-base-semibold text-light-2'>
              Payment Reason
            </label>
            <textarea
              readOnly
              disabled
              value={applicationInfo.paymentReason}
              style={{ width: '60%', marginBottom:'10px', padding: '2px 10px ' , height:"130px"}}
              className={inputCss}
              type='text'
            />
          </div>
        </fieldset>
        <fieldset>
          <div  style={{ width: '100%' }} className='flex flex-col gap-3'>
          <label htmlFor='paymentReason' className='text-base-semibold text-light-2'>
              Payment Information
            </label>
            <textarea
              readOnly
              disabled
              value={applicationInfo.paymentReason}
              style={{ width: '60%', marginBottom:'10px', padding: '2px 10px ' , height:"230px"}}
              className={inputCss}
              type='text'
            />
          </div>
        </fieldset>
        <fieldset>
          <div  style={{ width: '100%' }} className='flex flex-col gap-3'>
          <label htmlFor='paymentReason' className='text-base-semibold text-light-2'>
              Note
            </label>
            <textarea
              readOnly
              disabled
              value={applicationInfo.paymentReason}
              style={{ width: '60%', marginBottom:'10px', padding: '2px 10px ' , height:"130px"}}
              className={inputCss}
              type='text'
            />
          </div>
        </fieldset>
        <fieldset>
          <div  style={{ width: '100%', marginBottom:'10px'}} className='flex flex-col gap-3'>
          <label  className='text-base-semibold text-light-2'>
              Document
            </label>
           <FileDownloader fileUrl={applicationInfo.file}/>
          </div>
        </fieldset>
        <>
        {/* <Link href={`/voyages/detail/${voyage.voyageNumber}`}>
            <button
                type='button'
                className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 bg-primary-500'
              >
                Return
            </button>
          </Link> */}
        <ReturnButton/>
      </>
        

    </section>
  )
}

export default RequestDetail