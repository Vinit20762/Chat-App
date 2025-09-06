"use client"
import { TextInput } from "@repo/ui/text-input";
import { useRouter } from "next/navigation";
import { useRef, useState,} from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter()
  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      background: "black",
      color: "white",
      display: "flex",
      justifyContent: "center",
      justifyItems: "center",
      fontSize: "2rem"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "2rem"
      }}>
        
        <TextInput 
         ref={ref}
         value={value} 
         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            console.log(ref.current?.value);
          }} type="text" placeholder="Enter text here" variant="small"/>
        <button onClick={() =>
          router.push(`/room/${value}`)
        }>Join Room</button>
      </div>
    </div>
  );
}
