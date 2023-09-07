
import TableRow from '@/components/table/TableRow'
import { fetchVoyages } from '@/lib/actions/voyage.action';

const Thead = ["Date","Time","Creator","Voyage Number","Port Toll","Departure","Arrival","Status","Detail"]


const Page = async ()=>{
    const result = await fetchVoyages( );
    console.log(result)
      
    return (
        <section>
            <h1 className="head-text mb-10">
                Voyage Creation
            </h1>
            <div className="table-section">
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
                        result.posts.length === 0 && 
                        (
                            <tr>
                            <td>
                                <p className='no-result'>
                                    No Voyages found
                                    </p>
                            </td>
                        </tr>
                        )
                    }
                    {
                    result.posts.length > 0 && 
                    <>
                        {result.posts.map((post) => (
                        <TableRow
                            key={post._id}
                            data={post}
                        />
                        ))}
                    </>
                    
                    }
                </tbody>
                </table>
            </div>
           
        </section>
    )
}

export default Page