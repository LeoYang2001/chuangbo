import { formatDate } from '@/lib/utils'
import RequestDelete from '@/components/shared/requestDelete'
import RequestApprove from '@/components/shared/requestApprove'
import Link from 'next/link'
import Pending from '@/components/shared/Pending'
import Completed from '@/components/shared/Completed'

const Thead = ["Date","Finance","Director","Cashier","Detail","Action"]

const ApplicationCard = ({result,ifAccess,ifAction}) => {
  return (
    <table>
               <thead>
               <tr>
                    {
                        Thead.map(th => (
                            <td key={th}>
                                {th}
                            </td>
                        ))
                    }
                </tr>
                
               </thead>
                <tbody>
                    {
                        result.length === 0 && 
                        (
                            <tr>
                            <td>
                                <p className='no-result'>
                                    No Application found
                                    </p>
                            </td>
                        </tr>
                        )
                    }
                    {
                    result.length > 0 && 
                    <>
                        {result.map((rs) => (
                        <tr key={rs._id}>
                        <td>
                            {formatDate(rs.createdAt)}
                        </td>
                        <td>
                            {   
                                rs.approveLevel > 1 ? 
                                (
                                    <>
                                        <Completed/>
                                    </>
                                ):(
                                    <>
                                        <Pending/>
                                    </>
                                )
                            }
                        </td>
                        <td>
                            {   
                                rs.approveLevel > 2 ? 
                                (
                                    <>
                                        <Completed/>
                                    </>
                                ):(
                                    <>
                                        <Pending/>
                                    </>
                                )
                            }
                        </td>
                        <td>
                            {   
                                rs.approveLevel > 3 ? 
                                (
                                    <>
                                         <Completed/>
                                    </>
                                ):(
                                    <>
                                       <Pending/>
                                    </>
                                )
                            }
                        </td>
                       
                        <td >
                        <Link href={`/voyages/detail/request/detail/${rs._id}`} style={{
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            gap:'6px'
                        }}>
                            <p  className='no-result'>Detail</p>
                        </Link>
                        
                    </td>
                    {
                        ifAction ? (
                            <td >
                            <RequestApprove ifAccess={ifAccess} applicationId = {rs._id} />
                        </td>
                        ):(
                            <td >
                            <RequestDelete ifAccess={ifAccess} applicationId = {rs._id} />
                        </td>
                        )
                    }
                        
                        </tr>
                        ))}
                    </>
                    
                    }
                </tbody>
                </table>
  )
}

export default ApplicationCard