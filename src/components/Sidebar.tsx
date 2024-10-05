'use client'

import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
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
      <nav className="h-full flex flex-col bg-gray-800 border-r border-green-700">
        <div className="p-4 pb-8 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-green-500 hover:bg-green-400"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <div className="  border-t border-green-700"></div>

        <SidebarContext.Provider value={{ expanded, activeItem, setActiveItem }}>
          <ul className="flex-1 px-3 flex flex-col justify-center">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t border-green-700 flex p-3">
          <img
          /* add clerk auth here */
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-white-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
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
                relative flex items-center py-6 px-3 my-1
                font-medium rounded-md cursor-pointer
                transition-colors group
                ${
                    isActive
                        ? "bg-gradient-to-tr from-green-400 to-green-300 text-emerald-600"
                        : "hover:bg-green-200 text-emerald-600"
                }
                whitespace-nowrap
            `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                }`}
            >
                {text}
            </span>

            {!expanded && (
                <div
                    className={`
                        absolute left-full rounded-md px-2 py-1 ml-6
                        bg-green-100 text-green-800 text-sm
                        invisible opacity-20 -translate-x-3 transition-all
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
