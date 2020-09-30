
import mongoose from 'mongoose';

import bcrypt from 'bcrypt-nodejs';

let Schema = mongoose.Schema;

export interface IUser {
    name: string;
    email:string;
    password: string;
    createdOn: Date;
    isEmailApproved: boolean;
    role: string;
    _id: any;
}

export class User  {
    name: string;
    email:string;
    password: string;
    createdOn: Date;
    isEmailApproved: boolean;
    role: string;
    _id: any;

  constructor(data: User) {
    this.name = data.name;
    this.email = data.email;
    this.password = this.generateHash(data.password);
    this.createdOn = new Date();
    this.isEmailApproved = false;
    this.role = data.role || 'EMPLOYER';
  }

  generateHash(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };

  validPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  };
}

// Define the schema for the showcase item
let userSchema = new Schema({
    name : { type : String, required: true },
    email : {type: String, unique: true, required: true },
    password : { type : String, required: true },
    createdOn : { type : Date, default : new Date() },
    isEmailApproved : { type : Boolean, default : false },
    role : { type : String },
});

// Register methods
userSchema.method('generateHash', User.prototype.generateHash);
userSchema.method('validPassword', User.prototype.validPassword);

// Export `Document`
export interface UserDocument extends User, mongoose.Document { }

// Expose the `model` so that it can be imported and used in
// the controller (to search, delete, etc.)
export let Users = mongoose.model<UserDocument>('User', userSchema);
