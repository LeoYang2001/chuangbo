
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import { fetchPosts } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in')
   
  }

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  

  return (
    <>
      <h1 className='head-text text-left'>Welcome to the Vessels System</h1>

    </>
  );
}

export default Home;