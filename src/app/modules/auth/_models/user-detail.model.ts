import { AuthModel } from './auth.model'
import { AddressModel } from './address.model'
import { SocialNetworksModel } from './social-networks.model'
import { Timestamp } from 'rxjs/internal/operators/timestamp'

export class UserDetailModel extends AuthModel {
  userDetailId: number
  applicationUserId: number
  firstName: string
  middleName: string
  lastName: string
  phone: string
  placeOfBirth: string
  country: string
  nationality: string
  passportNumber: string
  dateOfBirth: Date
  createdAt: Date
  updatedAt: Date

  setUser(user: any) {
    this.userDetailId = user.userDetailId
    this.applicationUserId = user.applicationUserId
    this.firstName = user.firstName
    this.middleName = user.middleName
    this.lastName = user.lastName
    this.phone = user.phone
    this.placeOfBirth = user.placeOfBirth
    this.country = user.country
    this.nationality = user.nationality
    this.passportNumber = user.passportNumber
    this.dateOfBirth = user.dateOfBirth
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt

    // this.id = user.id
    // this.userName = user.userName || ''
    // this.password = user.password || ''
    // this.fullname = user.fullname || ''
    // this.email = user.email || ''
    // this.pic = user.pic || './assets/media/users/default.jpg'
    // this.roles = user.roles || []
    // this.occupation = user.occupation || ''
    // this.companyName = user.companyName || ''
    // this.phone = user.phone || ''
    // this.address = user.address
    // this.socialNetworks = user.socialNetworks
  }
}
