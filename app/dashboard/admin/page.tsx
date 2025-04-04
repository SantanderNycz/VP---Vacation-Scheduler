import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getAllUsers, getAllVacations } from "@/lib/actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { UserWithoutPassword, VacationDay } from "@/lib/types"
import UserManagement from "@/components/user-management"
import AllVacations from "@/components/all-vacations"

export default async function AdminPage() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  if (session.type !== "admin") {
    redirect("/dashboard")
  }

  const users = (await getAllUsers()) as UserWithoutPassword[]
  const { vacations, error } = (await getAllVacations()) as { vacations?: VacationDay[]; error?: string }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p className="text-muted-foreground">Manage users and view all vacation schedules.</p>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="vacations">All Vacations</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Add, edit, or remove users from the system</CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagement users={users} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vacations">
          <Card>
            <CardHeader>
              <CardTitle>All Vacations</CardTitle>
              <CardDescription>View all scheduled vacations across the organization</CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : (
                <AllVacations vacations={vacations || []} users={users} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

