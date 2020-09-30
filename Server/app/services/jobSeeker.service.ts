"use strict";

import request from 'request';
import { JobSeeker, JobSeekers } from '../../database/models/jobSeeker.model';
import { Comment } from '../../database/models/comment.model';

export class JobSeekerService {
    constructor() {}

    public verifyRecaptchaToken(token: string, remoteAddress: any): any {
        return new Promise((resolve, reject) => {
            if(token === undefined || token === '' || token === null) {
                return resolve(JSON.parse(JSON.stringify({"responseCode" : 1,"responseDesc" : "Please select captcha"})));
            }
            var secretKey = process.env.RECAPTCHA_TOKEN_SERVER;

            let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + token + "&remoteip=" + remoteAddress;
            request(verificationUrl,(error: any,response: any, body: any) => {
                body = JSON.parse(body);
                // Success will be true or false depending upon captcha validation.
                if(body.success !== undefined && !body.success) {
                  return resolve({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
                }
                resolve({"responseCode" : 0,"responseDesc" : "Sucess"});
              }); 
        });
    }

    public saveJobSeekerDetails(form: any){
        return new Promise((resolve, reject) => {
            JobSeekers.findOne({'email': form.email}, (error: any, jobSeeker: JobSeeker) => {
                if (error) {
                    return reject(error);
                }
                if (jobSeeker) {
                    return resolve(null);
                } else {
                    let newJobSeeker = new JobSeeker(form);
                    JobSeekers.create(newJobSeeker, (error: any, data: any) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(data);
                    });
                }
            });
        });
    }

    public getAllJobSeekers(page: number, limit: number, searchQuery?: string){
        return new Promise((resolve, reject) => {
            let query = {};
            if(searchQuery && searchQuery.trim().length){
                query = {$or: [{ 'name': { $regex: '.*' + searchQuery + '.*', $options:'i'} }, 
                    { 'email': { $regex: '.*' + searchQuery + '.*', $options:'i'} }]}
            }
            JobSeekers.find(query, { _id:1, name:1, email: 1}, { skip: page * limit, limit: limit}, (error, jobSeekers)=>{
                if (error) {
                    return reject(error);
                }
                JobSeekers.count(query).exec(function(err, count) {
                    if(err){
                        return reject(err);
                    }
                    let totalPages = 0;
                    if(count != 0){
                        totalPages = Math.ceil(count/limit);
                    }
                    return resolve({'jobSeekers': jobSeekers, 'totalPages': totalPages});
                })
            });
        })   
    }

    public getJobSeekerById(id: string){
        return new Promise((resolve, reject) => {
            JobSeekers.findOne({_id: id},(error, jobSeekers)=>{
                if (error) {
                    return reject(error);
                }
                return resolve(jobSeekers);
            });
        })   
    }

    public addComment(data: any){
        return new Promise((resolve, reject) => {
            let comment = new Comment(data.comment);
            JobSeekers.findOneAndUpdate({_id: data._id}, { $push: { comments: comment } }, (err, result) => {
                if (err) {
                  return reject(err);
                } else {
                  result?.comments.push(comment);
                  return resolve(result);
                }
              });
        })   
    }

}
