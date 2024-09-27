import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import NavigationAction from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import Link from "next/link";
import Image from "next/image";
import { links } from "@/config";

const NavigationSidebar = async () => {
  const profile = await currentProfile()

  if (!profile) return redirect('/');

  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#E3E5E8] dark:bg-[#1E1F22] py-3">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Discord Clone"
          width={48}
          height={48}
          className="rounded-full"
        />
      </Link>

      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      
      <NavigationAction />
      <Separator
        className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
      />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <Link href={links.sourceCode} target="_blank" rel="noreferrer noopener">
          <Image
            src="/github.png"
            alt="Source Code"
            height={20}
            width={20}
            className="dark:invert-0 invert"
          />
        </Link>
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            baseTheme: dark,
            elements: {
              avatarBox: 'h-[48px] w-[48px]',
            }
          }}
        />
      </div>
    </div>
  );
}

export default NavigationSidebar; 