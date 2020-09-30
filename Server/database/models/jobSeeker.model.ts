
import mongoose from 'mongoose';
import { Comment } from './comment.model';

let Schema = mongoose.Schema;

export interface IJobSeeker {
    name: string;
    email:string;
    phoneNumber: number;
    likeWorking: boolean;
    resume: string;
    appliedOn: Date;
    ipAddress: string;
    comments: Array<Comment>;
    rating: number;
    _id: any;
}

export class JobSeeker  {
    name: string;
    email:string;
    phoneNumber: number;
    likeWorking: boolean;
    resume: string;
    appliedOn: Date;
    ipAddress: string;
    comments: Array<Comment>;
    rating: number;
    _id: any;

  constructor(data: JobSeeker) {
    this.name = data.name;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.likeWorking = data.likeWorking;
    this.resume = data.resume;
    this.appliedOn = new Date();
    this.ipAddress = data.ipAddress;
    this.comments = [];
    this.rating = 0;
  }
}

// Define the schema for the showcase item
let jobSeekerSchema = new Schema({
    name : { type : String, required: true },
    email : {type: String, unique: true, required: true },
    likeWorking : {type: Boolean, required: true },
    phoneNumber : { type : Number, required: true},
    resume : { type : String, required: true },
    appliedOn : { type : Date, default: new Date() },
    ipAddress : { type : String },
    comments : { type : Array, default: [] },
    rating : { type : String, default: 0 },
});

// Export `Document`
export interface JobSeekerDocument extends JobSeeker, mongoose.Document { }

// Expose the `model` so that it can be imported and used in
// the controller (to search, delete, etc.)
export let JobSeekers = mongoose.model<JobSeekerDocument>('JobSeeker', jobSeekerSchema);
