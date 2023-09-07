'use client'
import { createApplication } from '@/lib/actions/application.action';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import "@uploadthing/react/styles.css";
 
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";



const inputCss = 'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 account-form_input no-focus'


const Request = ({voyageNum,username,userId,voyageId}) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false); 
  const router = useRouter()
  const [formData, setFormData] = useState({
    department:"",
    applicant:username,
    currency:"dollars",
    amount:0,
    paymentReason:"",
    paymentInfo:"",
    note:"",
    approveLevel:1,
    file:null
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  const returnPage = ()=>{
    router.back()
    router.refresh()
  }

    const handleSubmit = async (event)=>{
      event.preventDefault();
      if(formData.file == null) return alert('File Uploading is required!')
      try {
        // Call the createVoyage function with the required parameters
        await createApplication({
          author: userId,
          department: formData.department,
          currency: formData.currency,
          amount: formData.amount,
          voyage: voyageId,
          paymentReason:formData.paymentReason,
          paymentInfo:formData.paymentInfo,
          note:formData.note,
          approveLevel:1,
          file:formData.file
        });
        
        router.back()
        router.refresh()
  
      } catch (error) {
        console.error('Test: Failed to create voyage:', error);
        alert(error)
      }
   
    }

    const handleUpload = (res) => {
      const fileUrl = res[0].fileUrl
      setFormData((prevData) => ({
        ...prevData,
        file: fileUrl,
      }));
      setIsFileUploaded(true)
    };
  
   

  return (
    <section
      style={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
      }}
     
    >
      <form
        onSubmit={handleSubmit}
        style={{
          margin: '1em',
        }}
        className='flex flex-col justify-start gap-10'
      >
        <fieldset className='flex w-full flex-row gap-3'>
          <div style={{ width: '50%' }} className='flex flex-col gap-3'>
            <label
              htmlFor='department'
              className='text-base-semibold text-light-2'
            >
              Department
            </label>
            <input
            required
              id='department'
              name='department'
              value={formData.department}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px ' }}
              className={inputCss}
              type='text'
            />
          </div>
          <div style={{ width: '50%' }} className='flex flex-col gap-3'>
            <label htmlFor='applicant' className='text-base-semibold text-light-2'>
              Applicant
            </label>
            <input
            required
              disabled
              id='applicant'
              name='applicant'
              value={formData.applicant}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px ' }}
              className={inputCss}
              type='text'
            />
          </div>
        </fieldset>
        <fieldset className='flex w-full flex-row gap-3'>
          <div style={{ width: '50%' }} className='flex flex-col gap-3'>
            <label htmlFor='currency' className='text-base-semibold text-light-2'>
              Currency
            </label>
            <select
            required

              id='currency'
              name='currency'
              value={formData.currency}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px ' ,appearance:'none'}}
              className={`${inputCss}`}
              type='text'
            >
            <option value="dollars">Dollars</option>
            <option value="yuan">Yuan</option>
            </select>
          </div>
          <div style={{ width: '50%' }} className='flex flex-col gap-3'>
            <label htmlFor='amount' className='text-base-semibold text-light-2'>
              Amount
            </label>
            <input
            required
              id='amount'
              name='amount'
              value={formData.amount}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px '}}
              className={inputCss}
              type='number'
              min="0" 
            />
          </div>
        </fieldset>
        <fieldset>
          <div  style={{ width: '100%' }} className='flex flex-col gap-3'>
          <label htmlFor='paymentReason' className='text-base-semibold text-light-2'>
              Payment Reason
            </label>
            <textarea

              id='paymentReason'
              name='paymentReason'
              value={formData.paymentReason}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px ' , height:"130px"}}
              className={inputCss}
              type='text'
            />
          </div>
        </fieldset>
        <fieldset>
          <div  style={{ width: '100%' }} className='flex flex-col gap-3'>
          <label htmlFor='paymentInfo' className='text-base-semibold text-light-2'>
              Payment Information
            </label>
            <textarea

              id='paymentInfo'
              name='paymentInfo'
              value={formData.paymentInfo}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px ' , height:"230px"}}
              className={inputCss}
              type='text'
            />
          </div>
        </fieldset>
        <fieldset>
          <div  style={{ width: '100%' }} className='flex flex-col gap-3'>
          <label htmlFor='note' className='text-base-semibold text-light-2'>
              Note (Optional)
            </label>
            <textarea

              id='note'
              name='note'
              value={formData.note}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px ',height:"130px" }}
              className={inputCss}
              
              type='text'
            />
          </div>
        </fieldset>
        <fieldset>
        <div style={{ width: '100%' }} className='flex flex-col gap-3 uploadDiv'>
          <label htmlFor='file' className='text-base-semibold text-light-2'>
            Upload File
          </label>
          <main style={{fontSize:'15px', alignItems:'start' }} className="flex flex-row  justify-start pr-10">
          <UploadButton
            endpoint="media"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              handleUpload(res)
            }}
            onUploadError={(error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
            
        <div style={{
          marginLeft:'1.5rem'
        }}>
        {
          !isFileUploaded ? 
          (
            <svg
            xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
          </svg>
          ) : (
            <svg
            xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#198754" className="bi bi-cloud-check" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
        </svg>
          )
        }
        </div>
        </main>
        </div>
      </fieldset>
        <button
          type='submit'
          className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 bg-primary-500'
        >
          Post Request
        </button>
        <button
          type='button'
          onClick={returnPage}
          className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 bg-primary-500'
        >
          Cancel
        </button>
      </form>
    </section>
  )
}

export default Request