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

  setUserDetail(userDetail: any) {
    this.userDetailId = userDetail.userDetailId
    this.applicationUserId = userDetail.applicationUserId
    this.firstName = userDetail.firstName
    this.middleName = userDetail.middleName
    this.lastName = userDetail.lastName
    this.phone = userDetail.phone
    this.placeOfBirth = userDetail.placeOfBirth
    this.country = userDetail.country
    this.nationality = userDetail.nationality
    this.passportNumber = userDetail.passportNumber
    this.dateOfBirth = userDetail.dateOfBirth
    this.createdAt = userDetail.createdAt
    this.updatedAt = userDetail.updatedAt

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
