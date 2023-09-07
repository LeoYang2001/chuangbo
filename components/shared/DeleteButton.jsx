'use client'

import { deleteVoyageByNum } from "@/lib/actions/voyage.action"
import { useRouter } from "next/navigation"

const DeleteButton =  ({voyageNumber}) => {
    const router = useRouter()

  const handleDelete = async ()=>{
    var confirmDel = confirm('Are you sure to delete this voyage?')
    if(!confirmDel) return
    else{
        try {

            await deleteVoyageByNum(voyageNumber)
            alert("Delete successfully!")

            router.push("/voyages");
            router.refresh()
        } catch (error) {
            console.log(error)
            alert("Delete failed!")
        }
    }
  }
  return (
    <button 
  
    className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 bg-primary-500' 
    onClick={handleDelete} style={{color:'white',marginLeft:'10px'}}>Delete</button>
  )
}

export default DeleteButton