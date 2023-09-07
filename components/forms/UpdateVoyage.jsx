"use client"
import { useRouter } from 'next/navigation/';
import React, { useState } from 'react';
import {formatDate} from '@/lib/utils'
import { updateVoyageByNum } from '@/lib/actions/voyage.action';

const inputCss = 'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 account-form_input no-focus'

const UpdateVoyage =  ({voyageInfo,userId}) => {
  const [formData, setFormData] = useState({
    voyageNum: voyageInfo.voyageNumber,
    portToll: voyageInfo.portToll,
    departureAddr: voyageInfo.departure,
    departureTime: formatDate(voyageInfo.departureTime),
    arrivalAddr: voyageInfo.arrival,
    arrivalTime: formatDate(voyageInfo.arrivalTime),
    note:""
  });
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault();
    var updateConfirm = confirm("Are you sure you wanna update this data?")
    if(!updateConfirm) return
    else{
        try {
            //   Call the createVoyage function with the required parameters
              await updateVoyageByNum({
                oldVoyageNum:voyageInfo.voyageNumber,
                author: userId,
                voyageNumber: formData.voyageNum,
                portToll: formData.portToll,
                departure: formData.departureAddr,
                arrival: formData.arrivalAddr,
                status:"pending",
                arrivalTime:formData.arrivalTime,
                departureTime:formData.departureTime,
              });
              
              console.log('Test: Voyage updated successfully!');
               router.push("/voyages");
               router.refresh()
            } catch (error) {
                console.error('Test: Failed to create voyage:', error);
                alert(error)
              }
    }

   
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


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
              style={{ width: '60%', padding: '2px 10px ' }}
              className={inputCss}
              
              type='text'
            />
          </div>
        </fieldset>
        <fieldset className='flex w-full flex-col gap-3'>{/* Additional fields go here */}</fieldset>
        <button
          type='submit'
          className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 bg-primary-500'
        >
          Update Voyage
        </button>
        
            <button
            onClick={()=>{
                
                router.push(`/voyages/detail/${voyageInfo.voyageNumber}`);
                router.refresh()
            }}
            type='button'
            className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 bg-primary-500'
            >
            Cancel
            </button>
      </form>
    </section>
  );
};

export default UpdateVoyage;
