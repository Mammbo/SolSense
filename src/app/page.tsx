import React from 'react'
import { LayoutDashboard, ChartColumnIncreasing, CircleAlert, Mails, CircleHelp, FileStack, Settings, Activity } from "lucide-react";
import Sidebar, {SidebarItem} from '~/components/Sidebar'

const HomePage = () => {
  return (
    <main className="flex flex-col ">
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
    </main>
  )
}
export default HomePage