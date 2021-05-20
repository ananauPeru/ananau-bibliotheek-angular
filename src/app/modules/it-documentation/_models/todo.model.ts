import { UserModel } from '../../auth'

export class TodoModel {
  toDoId: number
  appUser: UserModel
  assignedUser: UserModel
  assignedUserId: number
  title: string
  content: string
  status: string
  archived: boolean
  createdAt: Date
  updatedAt: Date
}
