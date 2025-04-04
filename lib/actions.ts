"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { User, VacationDay } from "@/lib/types"

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    phone: "123456789",
    position: "Administrator",
    password: "admin123", // In a real app, this would be hashed
    type: "admin",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    phone: "987654321",
    position: "Employee",
    password: "user123", // In a real app, this would be hashed
    type: "user",
  },
]

// Mock vacation data
const mockVacations: Record<string, VacationDay[]> = {
  "1": [
    { date: "2024-04-10", userId: "1" },
    { date: "2024-04-11", userId: "1" },
  ],
  "2": [
    { date: "2024-05-15", userId: "2" },
    { date: "2024-05-16", userId: "2" },
    { date: "2024-05-17", userId: "2" },
  ],
}

// Mock getSession function for demonstration
async function getSession() {
  const userId = cookies().get("userId")?.value
  if (!userId) return null

  const user = mockUsers.find((u) => u.id === userId)
  return user || null
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  // In a real app, you would validate against a database
  const user = mockUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    return { error: "Invalid email or password" }
  }

  // Set a cookie with the user ID
  cookies().set("userId", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return { success: true }
}

export async function logout() {
  cookies().delete("userId")
  redirect("/")
}

export async function getAllUsers() {
  // In a real app, you would fetch from a database
  return mockUsers.map(({ password, ...user }) => user) // Remove passwords from the response
}

export async function addUser(formData: FormData) {
  const session = await getSession()

  if (!session || session.type !== "admin") {
    return { error: "Unauthorized" }
  }

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const position = formData.get("position") as string
  const password = formData.get("password") as string
  const type = formData.get("type") as "admin" | "user"

  if (!name || !email || !position || !password || !type) {
    return { error: "Missing required fields" }
  }

  // Check if email is already in use
  const existingUser = mockUsers.find((u) => u.email === email)
  if (existingUser) {
    return { error: "Email already in use" }
  }

  const newUser: User = {
    id: String(mockUsers.length + 1),
    name,
    email,
    phone,
    position,
    password,
    type,
  }

  mockUsers.push(newUser)

  return { success: true }
}

export async function removeUser(userId: string) {
  const session = await getSession()

  if (!session || session.type !== "admin") {
    return { error: "Unauthorized" }
  }

  const userIndex = mockUsers.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    return { error: "User not found" }
  }

  mockUsers.splice(userIndex, 1)

  return { success: true }
}

export async function addVacationDay(date: string) {
  const session = await getSession()

  if (!session) {
    return { error: "Unauthorized" }
  }

  if (!mockVacations[session.id]) {
    mockVacations[session.id] = []
  }

  // Check if the date is already booked
  const alreadyBooked = mockVacations[session.id].some((v) => v.date === date)

  if (alreadyBooked) {
    return { error: "Date already booked" }
  }

  mockVacations[session.id].push({
    date,
    userId: session.id,
  })

  return { success: true }
}

export async function removeVacationDay(date: string) {
  const session = await getSession()

  if (!session) {
    return { error: "Unauthorized" }
  }

  if (!mockVacations[session.id]) {
    return { error: "No vacations found" }
  }

  const vacationIndex = mockVacations[session.id].findIndex((v) => v.date === date)

  if (vacationIndex === -1) {
    return { error: "Vacation day not found" }
  }

  mockVacations[session.id].splice(vacationIndex, 1)

  return { success: true }
}

export async function getUserVacations(userId?: string) {
  const session = await getSession()

  if (!session) {
    return { error: "Unauthorized" }
  }

  // If userId is provided and the current user is an admin, return that user's vacations
  if (userId && session.type === "admin") {
    return { vacations: mockVacations[userId] || [] }
  }

  // Otherwise, return the current user's vacations
  return { vacations: mockVacations[session.id] || [] }
}

export async function getAllVacations() {
  const session = await getSession()

  if (!session || session.type !== "admin") {
    return { error: "Unauthorized" }
  }

  // Combine all vacations into a single array
  const allVacations = Object.entries(mockVacations).flatMap(([userId, vacations]) =>
    vacations.map((v) => ({ ...v, userId })),
  )

  return { vacations: allVacations }
}

