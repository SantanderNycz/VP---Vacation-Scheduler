"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { addVacationDay, removeVacationDay } from "@/lib/actions"
import type { VacationDay } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { format } from "date-fns"

interface VacationCalendarProps {
  vacations: VacationDay[]
  userId?: string
  readOnly?: boolean
}

export default function VacationCalendar({ vacations, userId, readOnly = false }: VacationCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Convert vacation dates to Date objects
  const vacationDates = vacations.map((v) => new Date(v.date))

  // Function to check if a date is already booked
  const isDateBooked = (date: Date) => {
    return vacationDates.some(
      (v) =>
        v.getFullYear() === date.getFullYear() && v.getMonth() === date.getMonth() && v.getDate() === date.getDate(),
    )
  }

  // Function to handle date selection
  const handleSelect = (date: Date | undefined) => {
    if (readOnly) return
    setSelectedDate(date)
  }

  // Function to book a vacation day
  const bookVacation = async () => {
    if (!selectedDate) return

    setIsSubmitting(true)

    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      const result = await addVacationDay(formattedDate)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Vacation day booked successfully",
        })
        // Refresh the page to update the calendar
        window.location.reload()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to cancel a vacation day
  const cancelVacation = async () => {
    if (!selectedDate) return

    setIsSubmitting(true)

    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      const result = await removeVacationDay(formattedDate)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Vacation day cancelled successfully",
        })
        // Refresh the page to update the calendar
        window.location.reload()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        className="rounded-md border"
        modifiers={{
          booked: vacationDates,
        }}
        modifiersStyles={{
          booked: {
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          },
        }}
      />

      {!readOnly && selectedDate && (
        <div className="flex gap-2">
          {isDateBooked(selectedDate) ? (
            <Button variant="destructive" onClick={cancelVacation} disabled={isSubmitting}>
              Cancel Vacation
            </Button>
          ) : (
            <Button onClick={bookVacation} disabled={isSubmitting}>
              Book Vacation
            </Button>
          )}
        </div>
      )}

      <Toaster />
    </div>
  )
}

