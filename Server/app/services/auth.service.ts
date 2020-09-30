import express from 'express';
import passport from 'passport'
import { User } from '../../database/models/user.model';
import { UserResponseDTO } from '../DTO/UserResponseDTO';

export class AuthService {

    constructor() {}

    public login(req: express.Request,
        res: express.Response,
        next: express.NextFunction) {
        passport.authenticate('local-login', { session: true }, (err: any, user: User, info: any) => {
            if (err)
                return next(err);
            // If no user is returned...
            if (!user) {
                // Set HTTP status code `401 Unauthorized`
                // Return the info message
                return next({message: info.message, statusCode: 401});
            }
            // Use login function exposed by Passport to establish a login
            // session
            req.login(user, (err: any) => {
                if (err) 
                    return next(err);
                // Set HTTP status code `200 OK`                
                res.status(200);
                res.json(new UserResponseDTO(user));
            });
        })(req, res, next);
    }


    public register(req: express.Request,
        res: express.Response,
        next: express.NextFunction) {

        passport.authenticate('local-signup', (err: any, user: User, info: any) => {
            if (err)
                return next(err);
            // If no user is returned...
            if (!user) {
                // Set HTTP status code `409 Conflict`
                return next({message: info.message, statusCode: 409});
            }            
            let responseUser = new UserResponseDTO(user);
            // Set HTTP status code `200 OK`
            res.status(200);
            res.json(responseUser);
        })(req, res, next);
    }
}

