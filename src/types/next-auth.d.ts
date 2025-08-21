import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      firstName?: string
      lastName?: string
      image?: string
      role: "TALENT" | "HIRER" | "ADMIN"
    }
  }

  interface User {
    id: string
    email: string
    name?: string
    firstName?: string
    lastName?: string
    image?: string
    role: "TALENT" | "HIRER" | "ADMIN"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "TALENT" | "HIRER" | "ADMIN"
    firstName?: string
    lastName?: string
  }
}
