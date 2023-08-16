import { 
  Code, ImageIcon, LayoutDashboard, MessageSquare, Music, VideoIcon, MailQuestion , BookOpen , PencilRuler , MonitorUp , PlusSquare , Mic  
} from "lucide-react";
export const MAX_FREE_COUNTS = 5;
export const tools = [
  // {
    //   label: "Dashboard",
    //   icon: LayoutDashboard,
    //   href: "/dashboard",
    //   color: "text-sky-500",
    // },
    {
      label: 'Conversation',
      icon: MessageSquare,
      href: '/conversation',
    color:"text-teal-300",
    bgColor:"bg-teal-500/10",
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-red-700",
    bgColor: "bg-violet-500/10",
    href: '/code',
  },
  {
    label: 'Cover Letter Generator',
    icon: MailQuestion,
    color: "text-blue-600",
    bgColor: "bg-blue-700/10",
    href: '/cover-letter',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: "text-blue-500",
    bgColor: "bg-blue-700/10",
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    href: '/video',
  },
  // {
  //   label: 'Recipe Generation',
  //   icon: BookOpen,
  //   color: "text-yellow-700",
  //   bgColor: "bg-orange-700/10",
  //   href: '/recipe',
  // },
  // {
  //   label: 'Anime Generation',
  //   icon: PencilRuler,
  //   color: "text-red-700",
  //   bgColor: "bg-orange-700/10",
  //   href: '/anime',
  // },
  // {
  //   label: 'Image Restoration',
  //   icon: MonitorUp ,
  //   color: "text-teal-700",
  //   bgColor: "bg-teal-700/10",
  //   href: '/restore',
  // },
  // {
  //   label: 'Super Resolution',
  //   icon: PlusSquare,
  //   color: "text-violet-500",
  //   bgColor: "bg-violet-500/10",
  //   href: '/resolution',
  // },
  // {
  //   label: 'Speech to Text',
  //   icon: Mic,
  //   color: "text-gray-700",
  //   bgColor: "bg-gray-700/10",
  //   href: '/speech-to-text',
  // },
];