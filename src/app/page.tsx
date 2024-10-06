import React from 'react'
import { LayoutDashboard, ChartColumnIncreasing, CircleAlert, Mails, CircleHelp, FileStack, Settings, Activity } from "lucide-react";
import Sidebar, {SidebarItem} from '~/components/Sidebar'
import { SignedIn, SignedOut,  SignInButton } from '@clerk/nextjs';
import Header from '~/components/header';
import { getMyGeoData } from '~/server/queries';

// This is a dynamic import you should use this in more projects lol 
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const geoData = await getMyGeoData();

  return (
    <main className="flex flex-col text-2xl ">

      <SignedOut>
        <div className="flex justify-center p-80 w-full h-full gap-2 align-middle">
          <h1 className="text-4xl">Welcome to SolSense Please </h1>
          <button className='text-4xl text-green-300'> <SignInButton /></button>
        </div>
      </SignedOut>

      <SignedIn>
        <Header />

        <div className="flex flex-1">
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Real-Time Data Layers" active={false} />
            <SidebarItem icon={<ChartColumnIncreasing size={20} />} text="Predictive Analytics" alert active={false} />
            <SidebarItem icon={<Mails size={20} />} text="Farm Specific Reports" active={false} />
            <SidebarItem icon={<CircleAlert size={20} />} text="Alerts" active={false} />
            <SidebarItem icon={<Activity size={20} />} text="Insights" active={false} />
            <SidebarItem icon={<FileStack size={20} />} text="Historical Data"  active={false}/>
            <SidebarItem icon={<Settings size={20} />} text="Settings" active={false} />
            <SidebarItem icon={<CircleHelp size={20} />} text="Help" active={false} />
          </Sidebar>
          <div className="flex-1">
            {/* Your main content goes here */}
          </div>
        </div>
      </SignedIn>
    </main>
  )
}