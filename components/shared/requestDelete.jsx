'use client'

import { deleteApplicationById } from "@/lib/actions/application.action"
import { useRouter } from "next/navigation"

const RequestDelete =  ({applicationId, ifAccess}) => {
    const router = useRouter()

  const handleDelete = async ()=>{
    if(!ifAccess) return alert("You don't have access to delete it!")    
    var confirmDel = confirm('Are you sure to delete this Application?')
    if(!confirmDel) return
    else{
        try {

            await deleteApplicationById(applicationId)
            alert("Delete successfully!")

            router.refresh()
        } catch (error) {
            console.log(error)
            alert("Delete failed!")
        }
    }
  }
  return (
    <p onClick={handleDelete} style={{cursor:'pointer' , textAlign:'left'}} className='no-result'>Delete</p>
  )
}

export default RequestDelete