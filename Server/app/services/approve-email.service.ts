"use strict";

import { Users } from '../../database/models/user.model';

export class ApproveEmailService {
    constructor() {}

    public getAllUsers(){
        return new Promise((resolve, reject) => {
            Users.find({}, (error, users)=>{
                if (error) {
                    return reject(error);
                }    
                return resolve(users);
            });
        }) ;  
    }

    public approveUserEmail(userId: string, approved: boolean){
        return new Promise((resolve, reject) => {
            Users.findOneAndUpdate({_id: userId}, { $set: { isEmailApproved: approved } }, (err, result) => {
                if (err) {
                  return reject(err);
                } else {
                  return resolve(result);
                }
            });
        })   
    }

}
