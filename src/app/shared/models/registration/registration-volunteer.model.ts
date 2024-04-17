import { RegistrationModel } from "./registration.model";

export class RegistrationVolunteerModel extends RegistrationModel {
  //Example of extra fields
  
  // userDetails: {
  //   schoolEmail: string;
  // } & RegistrationModel['userDetails'] = Object.assign({}, this.userDetails, {
  //   schoolEmail: ''
  // });
}
