import type React from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import Navbar from "@/components/navbar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar session={session} />
      <main className="flex-1 container mx-auto py-6 px-4">{children}</main>
    </div>
  )
}

