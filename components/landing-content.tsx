"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Quincy",
    avatar: "Q",
    title: "Content Creator",
    description: "This is the best application I've ever used!",
  },
//   {
//     name: "Antonio",
//     avatar: "A",
//     title: "Designer",
//     description: "I use this daily for generating new photos!",
//   },
  {
    name: "Josie",
    avatar: "J",
    title: "Director of Strategy",
    description: "It's not just an AI tool, it's a strategic partner for our business. Highly recommended!",
  },
  {
    name: "Mark",
    avatar: "M",
    title: "CEO",
    description: "This app has changed my life, cannot imagine working without it!",
  },
  {
    name: "Robbie",
    avatar: "R",
    title: "CEO",
    description: "The best in class, definitely worth the premium subscription!",
  },
//   {
//     name: "Harish",
//     avatar: "H",
//     title: "Tech Lead",
//     description: "Transitioning to this platform transformed our workflows.",
//   }
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#1d5f6c] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}