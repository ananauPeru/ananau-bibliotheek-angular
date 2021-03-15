export class UserDTO {
  userId: number
  email: string
  firstName: string
  lastName: string
  phone: string
  // Don't forget to save date in UTC format!!!
  dateOfBirth: Date
  nationality: String
  country: String
}
