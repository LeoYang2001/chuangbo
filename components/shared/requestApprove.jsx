'use client'

import { approveApplicationById, deleteApplicationById } from "@/lib/actions/application.action"
import { useRouter } from "next/navigation"

const RequestApprove =  ({applicationId, ifAccess}) => {
    const router = useRouter()

  const handleDelete = async ()=>{
    var confirmDel = confirm('Are you sure to approve this Application?')
    if(!confirmDel) return
    else{
      try {
        await approveApplicationById(applicationId)
        // alert("approved successfully")
             router.refresh()
      } catch (error) {
        // alert("action failed!")
      }
      router.refresh()

       
    }
  }
  return (
    <p onClick={handleDelete}  style={{cursor:'pointer', textAlign:'left'}} className='no-result'>Approve</p>
  )
}

export default RequestApprove