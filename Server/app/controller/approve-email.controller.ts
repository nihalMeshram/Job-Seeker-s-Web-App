import * as express from 'express';
import { ApproveEmailService } from '../services/approve-email.service';
import { ErrorDTO } from '../DTO/ErrorDTO';


const BASE_URI = '/approve-email';

module ApproveEmailModule {
    export class ApproveEmailController {
        approveEmailService: ApproveEmailService;
        router: express.Router;
        auth: any;
        admin: any;
        constructor(router: express.Router, auth: any, admin: any) {
            this.approveEmailService = new ApproveEmailService();
            this.router = router;
            this.auth = auth;
            this.admin = admin;
            this.configureController();
        }

        private configureController() {

            // Configure routes

            this.router.get(`${BASE_URI}/get-all`, this.auth, this.admin, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                try {
                    this.approveEmailService.getAllUsers()
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

            this.router.post(`${BASE_URI}/approve`, this.auth, this.admin, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                    try { 
                        this.approveEmailService.approveUserEmail(req.body.userId, req.body.approved)
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

export = ApproveEmailModule;