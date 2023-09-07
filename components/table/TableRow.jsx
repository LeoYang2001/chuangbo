import Image from "next/image";
import Link from "next/link";
import Processing from "../shared/Processing";

const TableRow = ({data}) => {
     // Parse the ISO 8601 string to a Date object
  const createdAtDate = new Date(data.createdAt);

  // Format the Date object as "YYYY-MM-DD HH:mm:ss"
  const formattedCreatedAt = createdAtDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const formattedCreatedAt_arr = formattedCreatedAt.split(" ")
  const [date,time] = formattedCreatedAt_arr
  return (
    <>
        <tr>
                    <td>
                        {date}
                    </td>
                    <td>
                        {time}
                    </td>
                    <td >
                        <Link href={`/profile/${data.author.id}`} style={{
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        gap:'6px'
                    }}>

                        <Image
                            
                            src={data.author.image}
                            alt='user_community_image'
                            width={20}
                            height={20}
                            className='cursor-pointer rounded-full'
                        />
                          <p className='cursor-pointer text-base-semibold text-light-1'>
                            {data.author.name}
                        </p>
                        </Link>
                      
                       
                    </td>
                    <td>
                        {data.voyageNumber}
                    </td>
                    <td>
                        {data.portToll}
                    </td>
                    <td>
                        {data.departure}
                    </td>
                    <td>
                        {data.arrival}
                    </td>
                    <td>
                    <Processing status={data.status}/>
                    </td>
                    <td >
                        <Link href={`/voyages/detail/${data.voyageNumber}`} style={{
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            gap:'6px'
                        }}>
                            <p  className='no-result'>Detail</p>
                        </Link>
                        
                    </td>
        </tr>
    </>
  )
}

export default TableRow