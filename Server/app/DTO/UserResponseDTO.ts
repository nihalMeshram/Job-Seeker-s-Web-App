import { User, Users } from '../../database/models/user.model';
export class UserResponseDTO {
    name: string;
    email: string;
    role: string;
    constructor(user: User) {
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
    }

    getUserDetails() {
        let user = {
            name: this.name,
            email: this.email,
            role: this.role,
        }
        return user;
    }

    setUserDetails(user: User, rememberMe: boolean = false) {
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
    }
}