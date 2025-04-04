import { getSession } from "@/lib/auth"
import { getUserVacations } from "@/lib/actions"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import VacationCalendar from "@/components/vacation-calendar"
import type { VacationDay } from "@/lib/types"

export default async function CalendarPage() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  const { vacations, error } = (await getUserVacations()) as { vacations?: VacationDay[]; error?: string }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Calendar</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Calendar</h1>
      <p className="text-muted-foreground">Schedule and manage your vacation days.</p>

      <Card>
        <CardHeader>
          <CardTitle>Vacation Calendar</CardTitle>
          <CardDescription>Click on a date to schedule or cancel a vacation day</CardDescription>
        </CardHeader>
        <CardContent>
          <VacationCalendar vacations={vacations || []} />
        </CardContent>
      </Card>
    </div>
  )
}

