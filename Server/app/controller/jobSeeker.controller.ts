import * as express from 'express';
import { JobSeekerService } from '../services/jobSeeker.service';
import { ErrorDTO } from '../DTO/ErrorDTO';
import fs from 'fs';


const BASE_URI = '/jobseeker';

module JobSeekerModule {
    export class JobSeekerController {
        jobSeekerService: JobSeekerService;
        router: express.Router;
        auth: any;
        upload: any;
        constructor(router: express.Router, auth: any, upload: any) {
            this.jobSeekerService = new JobSeekerService();
            this.router = router;
            this.auth = auth;
            this.upload = upload;
            this.configureController();
        }

        private configureController() {

            // Configure routes
            this.router.post(`${BASE_URI}/validate-recaptcha`, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    let recaptcha = req.body.recaptcha;
                    let remoteAddress = req.connection.remoteAddress
                    this.jobSeekerService.verifyRecaptchaToken(recaptcha, remoteAddress)
                    .then((data: any) => {
                        res.status(200);
                        res.send(data);
                     })
                    .catch((err: any) => {
                        let error = new ErrorDTO(err, 1);
                        res.status(500).json(error);
                     });
                    
                } catch(e) {
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                }
                
            });

            this.router.post(`${BASE_URI}/job-seeker-form`, this.upload.single('resume'), (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    let form =  req.body;
                    const url = req.protocol + '://' + req.get('host')
                    form.path = url + '/dist/public/' + req.file.filename;
                    form.resume = req.file.filename; 
                    form.ipAddress = req.connection.remoteAddress;
                    this.jobSeekerService.saveJobSeekerDetails(form)
                    .then((data: any) => {
                        res.status(200);
                        res.send(data);
                     })
                    .catch((err: any) => {
                        let error = new ErrorDTO(err, 1);
                        res.status(500).json(error);
                     });
                } catch(e) {
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                }
                
            });

            this.router.get(`${BASE_URI}/get-resume`, this.auth, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    var filePath = "../../../dist/public/" + req.query.filename;
                    res.contentType("application/pdf");
                    fs.readFile(__dirname + filePath , function (err,data){
                        if(err){
                            let error = new ErrorDTO(err, 1);
                            res.status(500).json(error);
                        }
                        res.send(data);
                    });
                } catch(e) {
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                }
                
            });

            this.router.get(`${BASE_URI}/get-by-id/:id`, this.auth, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                    try { 
                        this.jobSeekerService.getJobSeekerById(req.params.id)
                        .then((data: any) => {
                            res.status(200);
                            res.send(data);
                         })
                        .catch((err: any) => {
                            let error = new ErrorDTO(err, 1);
                            res.status(500).json(error);
                         });
                    } catch(e) {
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);
                    }
            });

            this.router.get(`${BASE_URI}/get-all/:page?/:limit?/:searchQuery?`, this.auth, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    let page = parseInt(req.params.page);
                    let limit = parseInt(req.params.limit);
                    this.jobSeekerService.getAllJobSeekers(page, limit, req.params.searchQuery)
                    .then((data: any) => {
                        res.status(200);
                        res.send(data);
                     })
                    .catch((err: any) => {
                        let error = new ErrorDTO(err, 1);
                        res.status(500).json(error);
                     });
                } catch(e) {
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                }
            });

            this.router.post(`${BASE_URI}/comment`, this.auth, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                    let from = { 
                            email: req.session?.passport?.user?.email,
                            name: req.session?.passport?.user?.name
                        }
                    req.body.comment['from'] = from;
                    try { 
                        this.jobSeekerService.addComment(req.body)
                        .then((data: any) => {
                            res.status(200);
                            res.send(data);
                         })
                        .catch((err: any) => {
                            let error = new ErrorDTO(err, 1);
                            res.status(500).json(error);
                         });
                    } catch(e) {
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);
                    }
            });
        }
    }
}

export = JobSeekerModule;