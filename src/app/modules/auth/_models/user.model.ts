import { AuthModel } from './auth.model'
import { AddressModel } from './address.model'
import { SocialNetworksModel } from './social-networks.model'
import { Timestamp } from 'rxjs/internal/operators/timestamp'
import { UserDetailModel } from './user-detail.model'

export class UserModel extends AuthModel {
  id: number
  userName: string
  normalizedUserName: string
  email: string
  normalizedEmail: string
  emailConfirmed: boolean
  passwordHash: string
  securityStamp: string
  concurrencyStamp: string
  phoneNumber: string
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd: Date
  lockoutEnabled: boolean
  accessFailedCount: number
  userDetail: UserDetailModel

  password: string
  fullname: string
  pic: string
  roles: number[]
  occupation: string
  companyName: string
  phone: string
  address?: AddressModel
  socialNetworks?: SocialNetworksModel
  // personal information
  firstname: string
  lastname: string
  website: string
  // account information
  language: string
  timeZone: string
  communication: {
    email: boolean
    sms: boolean
    phone: boolean
  }
  // email settings
  emailSettings: {
    emailNotification: boolean
    sendCopyToPersonalEmail: boolean
    activityRelatesEmail: {
      youHaveNewNotifications: boolean
      youAreSentADirectMessage: boolean
      someoneAddsYouAsAsAConnection: boolean
      uponNewOrder: boolean
      newMembershipApproval: boolean
      memberRegistration: boolean
    }
    updatesFromKeenthemes: {
      newsAboutKeenthemesProductsAndFeatureUpdates: boolean
      tipsOnGettingMoreOutOfKeen: boolean
      thingsYouMissedSindeYouLastLoggedIntoKeen: boolean
      newsAboutMetronicOnPartnerProductsAndOtherServices: boolean
      tipsOnMetronicBusinessProducts: boolean
    }
  }

  setUser(user: any) {
    this.id = user.id
    this.userName = user.userName || ''
    this.password = user.password || ''
    this.fullname = user.fullname || ''
    this.email = user.email || ''
    this.pic = user.pic || './assets/media/users/default.jpg'
    this.roles = user.roles || []
    this.occupation = user.occupation || ''
    this.companyName = user.companyName || ''
    this.phone = user.phone || ''
    this.address = user.address
    this.socialNetworks = user.socialNetworks
  }
}
