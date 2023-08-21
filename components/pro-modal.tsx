"use client";

import axios from "axios";
import { useState } from "react";
import { useProModal } from "@/hooks/use-pro-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { BookOpen, Check, Code, ImageIcon, MailQuestion, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";

// make sure to update these as I am adding more services 
const tools = [
  {
    label: "Converstaion",
    icon: MessageSquare,
    color: "text-sky-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-red-700",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Cover Letter Generator',
    icon: MailQuestion,
    color: "text-blue-600",
    bgColor: "bg-blue-700/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-blue-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-400",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-600",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Recipe Generation",
    icon: BookOpen,
    color: "text-yellow-700",
    bgColor: "bg-orange-700/10",
  },
];

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = axios.get("/api/stripe");
      window.location.href = (await response).data.url;
      
    } catch (error) {
      toast.error("Something is broken")
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Daedalus
              <Badge variant="premium" className="uppercase text-sm py-1">
                Premium
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-cener justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">
                    {tool.label}
                  </div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="w-full"
            >
                Upgrade
                <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
