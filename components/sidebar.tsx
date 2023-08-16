"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";


const monsterrat = Montserrat({ weight: "600", subsets: ["latin"] });
import {usePathname} from "next/navigation";
import { FreeCounter } from "./free-counter";
import { 
  Code, ImageIcon, Settings, LayoutDashboard, MessageSquare, Music, VideoIcon, MailQuestion , BookOpen , PencilRuler , MonitorUp , PlusSquare , Mic  
} from "lucide-react";


const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-teal-300",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-blue-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-600",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-400",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-red-700",
  },
  {
    label: 'Cover Letter Generator',
    icon: MailQuestion,
    color: "text-blue-600",
    href: '/cover-letter',
  },
  // {
  //   label: 'Recipe Generation',
  //   icon: BookOpen,
  //   color: "text-yellow-700",
  //   href: '/recipe',
  // },
  // {
  //   label: 'Anime Generation',
  //   icon: PencilRuler,
  //   color: "text-red-700",
  //   href: '/anime',
  // },
  // {
  //   label: 'Image Restoration',
  //   icon: MonitorUp ,
  //   color: "text-teal-700",
  //   href: '/restore',
  // },
  // {
  //   label: 'Super Resolution',
  //   icon: PlusSquare,
  //   color: "text-violet-500",
  //   href: '/resolution',
  // },
  // {
  //   label: 'Speech to Text',
  //   icon: Mic,
  //   color: "text-gray-700",
  //   href: '/speech-to-text',
  // },
  // {
  //   label: "Settings",
  //   icon: Settings,
  //   href: "/settings",
  // },
  
];

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
};


export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#0f3840] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", monsterrat.className)}>
            Daedalus
          </h1>
        </Link>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn("text-sm group flex p-3 w-full justify-start font-medium curor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", 
              pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter 
      isPro={isPro}
      apiLimitCount={apiLimitCount}
      />
    </div>
  );
};


