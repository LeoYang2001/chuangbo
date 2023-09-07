"use client"
import { createVoyage } from '@/lib/actions/voyage.action';
import { UploadButton } from '@uploadthing/react';
import { useRouter } from 'next/navigation/';
import React, { useState } from 'react';

const inputCss = 'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 account-form_input no-focus'

const CreateVoyage = ({userId}) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false); 
  const [formData, setFormData] = useState({
    voyageNum: '',
    portToll: '',
    departureAddr: '',
    departureTime: '',
    arrivalAddr: '',
    arrivalTime: '',
    note:"",
    file:null
  });
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault();
    if(formData.file == null) return alert('File Uploading is required!')
    try {
      // Call the createVoyage function with the required parameters
      await createVoyage({
        author: userId,
        voyageNumber: formData.voyageNum,
        portToll: formData.portToll,
        departure: formData.departureAddr,
        arrival: formData.arrivalAddr,
        status:"pending",
        arrivalTime:formData.arrivalTime,
        departureTime:formData.departureTime,
        file:formData.file
      });
      
      console.log('Test: Voyage created successfully!');
       router.push("/voyages");
       router.refresh()

    } catch (error) {
      console.error('Test: Failed to create voyage:', error);
      alert(error)
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
              htmlFor='voyageNum'
              className='text-base-semibold text-light-2'
            >
              Voyage Number
            </label>
            <input
            required
              id='voyageNum'
              name='voyageNum'
              value={formData.voyageNum}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px ' }}
              className={inputCss}
              type='text'
            />
          </div>
          <div style={{ width: '50%' }} className='flex flex-col gap-3'>
            <label htmlFor='portToll' className='text-base-semibold text-light-2'>
              Port Toll
            </label>
            <input
            required

              id='portToll'
              name='portToll'
              value={formData.portToll}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px ' }}
              className={inputCss}
              type='text'
            />
          </div>
        </fieldset>
        <fieldset className='flex w-full flex-row gap-3'>
          <div style={{ width: '50%' }} className='flex flex-col gap-3'>
            <label htmlFor='departureAddr' className='text-base-semibold text-light-2'>
              Departure
            </label>
            <input
            required

              id='departureAddr'
              name='departureAddr'
              value={formData.departureAddr}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px ' }}
              className={inputCss}
              type='text'
            />
          </div>
          <div style={{ width: '50%' }} className='flex flex-col gap-3'>
            <label htmlFor='departureTime' className='text-base-semibold text-light-2'>
              Departure Date
            </label>
            <input
            required

              id='departureTime'
              name='departureTime'
              value={formData.departureTime}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px ' }}
              className={inputCss}
              type='date'
            />
          </div>
        </fieldset>
        <fieldset className='flex w-full flex-row gap-3'>
          <div style={{ width: '50%' }} className='flex flex-col gap-3'>
            <label htmlFor='arrivalAddr' className='text-base-semibold text-light-2'>
              Arrival
            </label>
            <input
            required

              id='arrivalAddr'
              name='arrivalAddr'
              value={formData.arrivalAddr}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px ' }}
              className={inputCss}
              type='text'
            />
          </div>
          <div style={{ width: '50%' }} className='flex flex-col gap-3'>
            <label htmlFor='arrivalTime' className='text-base-semibold text-light-2'>
              Arrival Date
            </label>
            <input
            required

              id='arrivalTime'
              name='arrivalTime'
              value={formData.arrivalTime}
              onChange={handleInputChange}
              style={{ width: '60%', padding: '2px 10px ' }}
              className={inputCss}
              type='date'
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
        <fieldset className='flex w-full flex-col gap-3'>{/* Additional fields go here */}</fieldset>
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
          Create Voyage
        </button>
      </form>
    </section>
  );
};

export default CreateVoyage;
