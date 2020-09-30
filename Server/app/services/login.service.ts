"use strict";

import { User, Users } from '../../database/models/user.model';

export class LoginService {
    constructor() {}

    public register(form: any){
        return new Promise((resolve, reject) => {
            Users.findOne({'email': form.email}, (error: any, user: User) => {
                if (error) {
                    return reject(error);
                }
                if (user) {
                    return resolve(user);
                } else {
                    let user = new User(form);
                    Users.create(user, (error: any, data: any) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(data);
                    });
                }
            });
        });
    }

}
