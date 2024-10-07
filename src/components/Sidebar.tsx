'use client'

import { ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState, useEffect } from "react"
import { ReactNode } from "react";

const SidebarContext = createContext({
    expanded: true,
    activeItem: '',
    setActiveItem: (item: string) => {}
})

export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(true)
  const [activeItem, setActiveItem] = useState('')
  
  return (
    <aside className="h-screen flex flex-col justify-between">
      <nav className="h-full flex flex-col bg-gray-800 border-r-2 border-customDarkBlue">
        <div className="p-4 flex justify-between items-center">
        
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-3 rounded-lg bg-customMediumBlue hover:bg-customLightBlue"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <div className="border-t-2 border-customDarkBlue"></div>

        <SidebarContext.Provider value={{ expanded, activeItem, setActiveItem }}>
          <ul className="flex px-3 flex-col justify-center">{children}</ul>
        </SidebarContext.Provider>

        
      </nav>
    </aside>
  )
}

interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    active: boolean;
    alert?: boolean;
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
    const { expanded, activeItem, setActiveItem } = useContext(SidebarContext)
    const [isActive, setIsActive] = useState(active)

    const handleClick = () => {
        setActiveItem(text)
    }

    useEffect(() => {
        setIsActive(activeItem === text)
    }, [activeItem, text])

    useEffect(() => {
        if (text === 'Real-Time Data Layers') {
            setActiveItem('Real-Time Data Layers')
        }
    }, [text, setActiveItem])

    return (
        <li
            onClick={handleClick}
            className={`
                relative flex items-center justify-center py-5 px-3 my-4
                 rounded-md cursor-pointer
                transition-colors group
                ${
                    isActive
                        ? "bg-gradient-to-tr from-customDarkBlue to-customMediumBlue text-customOrgange"
                        : "hover:bg-customMediumBlue text-customOrgange "
                }
                whitespace-nowrap
            `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all text-base ${
                    expanded ? "w-52 ml-3" : "w-0 "
                }`}
            >
                {text}
            </span>

            {!expanded && (
                <div
                    className={`
                        absolute left-full rounded-md px-2 py-1 ml-6
                        text-sm invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        whitespace-nowrap
                    `}
                >
                    {text}
                </div>
            )}
        </li>
    )
}