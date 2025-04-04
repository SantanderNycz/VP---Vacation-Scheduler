import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Calendar, User } from "lucide-react"

export default async function Dashboard() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {session.name}</h1>
      <p className="text-muted-foreground">Manage your vacations and view team members.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">View Team</div>
            <p className="text-xs text-muted-foreground">See all users in the system</p>
            <div className="mt-4">
              <Link href="/dashboard/users" passHref>
                <Button>View Users</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Calendar</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manage Vacations</div>
            <p className="text-xs text-muted-foreground">Schedule and view your vacation days</p>
            <div className="mt-4">
              <Link href="/dashboard/calendar" passHref>
                <Button>Open Calendar</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {session.type === "admin" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin Panel</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Admin Controls</div>
              <p className="text-xs text-muted-foreground">Manage users and view all vacations</p>
              <div className="mt-4">
                <Link href="/dashboard/admin" passHref>
                  <Button>Admin Panel</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

