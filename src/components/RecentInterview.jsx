"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"

export default function RecentInterview() {
  const [interviews, setInterviews] = useState([2,33,4]);
  return (
    <Card className="border-0">
      <CardHeader className="">
        <CardTitle>Recent Interviews</CardTitle>
      </CardHeader>
      
{interviews.length>0  ? (<div>
  <CardContent className="grid gap-5">
  <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Jaiyesh Chahar</p>
            <p className="text-sm text-muted-foreground">
            jaiyesh.chahar@email.com
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>BG</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Bijon Guha</p>
            <p className="text-sm text-muted-foreground">
              bijon.guha@email.com
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>PK</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Pravar Kulbhushan</p>
            <p className="text-sm text-muted-foreground">
              pravar.k@email.com
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/avatars/04.png" alt="Avatar" />
            <AvatarFallback>RM</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Rishav Mahapatra</p>
            <p className="text-sm text-muted-foreground">rishav24@email.com</p>
          </div>
          
        </div>
        </CardContent>
</div>) : (<p className="mx-auto text-center my-5">No Interviews taken yet</p>) }
    </Card>
  )
}
