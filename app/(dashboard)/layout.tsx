import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiLimitCount, setApiLimitCount] = useState<number>(0);
  const [isPro, setIsPro] = useState<boolean>(false);

  useEffect(() => {
    // Use an IIFE (Immediately Invoked Function Expression) to handle async operations within useEffect
    (async () => {
      const fetchedApiLimitCount = await getApiLimitCount();
      const fetchedIsPro = await checkSubscription();

      setApiLimitCount(fetchedApiLimitCount);
      setIsPro(fetchedIsPro);
    })();
  }, []); // The empty dependency array means this effect will only run once, similar to componentDidMount

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
