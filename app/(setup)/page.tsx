import { initialProfile } from "@/lib/initial-profile";
import prisma from "@/lib/db"
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/models/initial-modal";


const SetupPage = async () => {
  const profile = await initialProfile();
  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id
        }
      }
    }
  })

  if(server){
    return redirect(`/servers/${server.id}`)
  }

  return (
    <div className="h-full">
      <InitialModal/>
    </div>
  );
}

export default SetupPage;