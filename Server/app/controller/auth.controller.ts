'use strict';

import express from 'express';
import { AuthService } from '../services/auth.service';
import { ErrorDTO } from '../DTO/ErrorDTO';
const BASE_URI = '/auth';
module Authentication {
    export class AuthController {
        router: express.Router;
        authService: AuthService;
        auth: any;
        constructor (
            router: express.Router,
            auth: any
        ) {
            this.router = router;
            this.auth = auth;
            this.authService = new AuthService();
            //register the controllers/routes
            this.configureRoutes();
        }

        private configureRoutes() {
            // Configure routes
            this.router.get(`${BASE_URI}/authenticate`, ( req: express.Request,
                res: express.Response, next: express.NextFunction) => {
                    res.send(req.isAuthenticated() ? req.user : '0');
            });
            
            this.router.post(`${BASE_URI}/login`, (req: express.Request,
                res: express.Response, next: express.NextFunction) => {
                    try {
                        return this.authService.login(req, res, next);
                    } catch (e) {
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);
                    }
            });

            this.router.post(`${BASE_URI}/logout`, (req: any, res: express.Response, 
                next: express.NextFunction) => {
                    // res.send('0');
                    // res.clearCookie('remember_me');
                    req.session.destroy((err: any) => {
                        // Even though the logout was successful, send the status code
                        // `401` to be intercepted and reroute the user to the appropriate
                        // page
                        res.status(401);
                        res.redirect('/job-seeker');
                    });
            });
    
            this.router.post(`${BASE_URI}/register`, (req: express.Request,
                res: express.Response, next: express.NextFunction) => {
                    this.authService.register(req, res, next);
            });

            this.router.get(`${BASE_URI}/session`, this.auth, (req: express.Request,
                res: express.Response) => {
                    try {
                        res.status(200).json(req.user)
                    } catch(e) {
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);  
                    }
            });

        }
    }
}
export = Authentication;