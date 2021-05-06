export class ResetPasswordDTO {
  token: string;
  email: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
