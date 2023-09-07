import ApplicationCard from "@/components/cards/ApplicationCard"
import { fetchApplicationsWithApproveLevel } from "@/lib/actions/application.action";
import { fetchUser } from "@/lib/actions/user.action";
import { identityToApproveLevel } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";

const Page = async ()=>{

    const user = await currentUser();
    if (!user) return null; // to avoid typescript warnings
      
    const userInfo = await fetchUser(user.id)
    const userIdentity = userInfo.identity
    const approveLevel = identityToApproveLevel(userIdentity)
    const applications = await fetchApplicationsWithApproveLevel(approveLevel)

    return (
        <div>
            <h1 className="head-text mb-10">
                Applications need to be approved
            </h1>
            <section className='table-section'>
                <ApplicationCard ifAction={true} ifAccess={false} result={applications}/>
            </section>
        </div>
    )
}

export default Page