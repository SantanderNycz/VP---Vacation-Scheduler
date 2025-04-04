import { cookies } from "next/headers"

// Mock user data - in a real app, this would be fetched from a database
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    phone: "123456789",
    position: "Administrator",
    password: "admin123", // In a real app, this would be hashed
    type: "admin" as const,
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    phone: "987654321",
    position: "Employee",
    password: "user123", // In a real app, this would be hashed
    type: "user" as const,
  },
]

export async function getSession() {
  const userId = cookies().get("userId")?.value

  if (!userId) {
    return null
  }

  const user = mockUsers.find((u) => u.id === userId)

  if (!user) {
    return null
  }

  // Return user data without the password
  const { password, ...session } = user
  return session
}

