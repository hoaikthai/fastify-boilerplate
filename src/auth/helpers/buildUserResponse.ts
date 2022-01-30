import { User } from "@prisma/client"

export type UserResponse = {
  id: string
  username: string
}

export const buildUserResponse = (user: User) => {
  return {
    id: user.id,
    username: user.username,
  }
}
