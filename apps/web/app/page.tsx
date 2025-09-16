"use client";
import { useRouter } from "next/navigation";
import { SparklesPreview } from "./components/sparklespreview";
import { Button } from "./components/button";


export default function Home() {
  const router = useRouter()
  return (
    <div className="top-0 left-0 bg-black h-screen w-full flex items-center ">
      <div className="w-full px-4 py-16 flex flex-col items-center justify-center mb-30 ">
        <SparklesPreview />
        <div className="mt-30 flex flex-col items-center space-y-6">
          <Button />
        </div>
     </div>
    </div>
   );
}
