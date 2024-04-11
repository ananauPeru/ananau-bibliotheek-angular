import { RoleModel } from "./role.model";

export class UserRoleModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: RoleModel[];
}