export type UserType = "admin" | "user"

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  position: string
  password: string
  type: UserType
}

export interface UserWithoutPassword {
  id: string
  name: string
  email: string
  phone?: string
  position: string
  type: UserType
}

export interface VacationDay {
  date: string
  userId: string
}

export interface Session {
  id: string
  name: string
  email: string
  phone?: string
  position: string
  type: UserType
}

