"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";
import type { Session } from "@/lib/types";
import { LogOut, User, Calendar, Users } from "lucide-react";

interface NavbarProps {
  session: Session;
}

export default function Navbar({ session }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/dashboard" className="font-semibold">
            <img
              src="/vertsaplay_logo.png"
              alt="Vertsa Play Logo"
              className="h-6 md:h-8 w-auto"
            />
          </Link>
          <div className="hidden md:flex gap-2">
            <Link href="/dashboard/users" passHref>
              <Button
                variant={
                  pathname.includes("/dashboard/users") ? "default" : "ghost"
                }
                className="gap-2"
              >
                <Users className="h-4 w-4" />
                Users
              </Button>
            </Link>
            <Link href="/dashboard/calendar" passHref>
              <Button
                variant={
                  pathname.includes("/dashboard/calendar") ? "default" : "ghost"
                }
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                My Calendar
              </Button>
            </Link>
            {session.type === "admin" && (
              <Link href="/dashboard/admin" passHref>
                <Button
                  variant={
                    pathname.includes("/dashboard/admin") ? "default" : "ghost"
                  }
                  className="gap-2"
                >
                  <User className="h-4 w-4" />
                  Admin Panel
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden md:inline-block text-sm mr-2">
            {session.name} ({session.type})
          </span>
          <form action={logout}>
            <Button variant="ghost" size="icon" type="submit">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </form>
        </div>
      </div>
      <div className="md:hidden border-t">
        <div className="flex justify-between px-2">
          <Link href="/dashboard/users" passHref>
            <Button
              variant={
                pathname.includes("/dashboard/users") ? "default" : "ghost"
              }
              size="sm"
              className="flex-1"
            >
              <Users className="h-4 w-4 mr-2" />
              Users
            </Button>
          </Link>
          <Link href="/dashboard/calendar" passHref>
            <Button
              variant={
                pathname.includes("/dashboard/calendar") ? "default" : "ghost"
              }
              size="sm"
              className="flex-1"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
          </Link>
          {session.type === "admin" && (
            <Link href="/dashboard/admin" passHref>
              <Button
                variant={
                  pathname.includes("/dashboard/admin") ? "default" : "ghost"
                }
                size="sm"
                className="flex-1"
              >
                <User className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
