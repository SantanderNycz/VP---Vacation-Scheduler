"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { VacationDay, UserWithoutPassword } from "@/lib/types"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AllVacationsProps {
  vacations: VacationDay[]
  users: UserWithoutPassword[]
}

export default function AllVacations({ vacations, users }: AllVacationsProps) {
  const [selectedUser, setSelectedUser] = useState<string | "all">("all")

  // Get user name by ID
  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    return user ? user.name : "Unknown User"
  }

  // Filter vacations by selected user
  const filteredVacations = selectedUser === "all" ? vacations : vacations.filter((v) => v.userId === selectedUser)

  // Convert vacation dates to Date objects for the calendar
  const vacationDates = filteredVacations.map((v) => new Date(v.date))

  return (
    <div className="space-y-4">
      <Tabs defaultValue="list">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <select className="border rounded p-2" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="all">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <TabsContent value="list">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Day of Week</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVacations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No vacations scheduled
                  </TableCell>
                </TableRow>
              ) : (
                filteredVacations.map((vacation, index) => {
                  const date = new Date(vacation.date)
                  return (
                    <TableRow key={index}>
                      <TableCell>{getUserName(vacation.userId)}</TableCell>
                      <TableCell>{format(date, "MMMM d, yyyy")}</TableCell>
                      <TableCell>{format(date, "EEEE")}</TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardContent className="pt-6">
              <Calendar mode="multiple" selected={vacationDates} className="rounded-md border" disabled />
              <div className="mt-4 text-sm text-muted-foreground">
                {selectedUser === "all"
                  ? "Showing vacations for all users"
                  : `Showing vacations for ${getUserName(selectedUser)}`}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

