'use strict';

import local from 'passport-local';
import { User, UserDocument, Users } from '../../database/models/user.model';



export default function passportConf(passport: any) {
 
    // # Passport Session Setup
    // ## Serialize User
    passport.serializeUser((user: UserDocument, done: any) => {
        let sessionUser = {
            email: user.email,
            name: user.name,
            role: user.role
        };
        done(null, sessionUser);
    });

    // ## Deserialize User
    passport.deserializeUser((sessionUser: any, done: any) => {
        done(null, sessionUser);
    });

    // # Local Signup
    passport.use('local-signup', new local.Strategy({
        // By default, local strategy uses username and password
        usernameField: 'email',
        passwordField: 'password',
        // Allow the entire request to be passed back to the callback
        passReqToCallback: true
    }, (req, email, password, done) => {
        process.nextTick(() => {
            // Find a user whose email or username is the same as the passed in data.
            // We are checking to see if the user trying to login already exists...
            Users.findOne({'email': email }, (err, user) => {

                if (err)
                    return done(err);
                // If a user exists...
                if (user) {
                    return done(null, false, { message: 'The email is already taken.'});
                } else {

                    let newUser = new User(req.body);
                    Users.create(newUser, (err, data) => {
                        if (err)
                            throw err;
                        return done(null, data);
                    });
                }
            });
        });
    }));

    passport.use('local-login', new local.Strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {
        // Find a user whose email or username is the same as the passed in data
        Users.findOne({ 'email': username.toLowerCase() }, (err, user) => {
            if (err)
                return done(err);
            // If no user is found, return a message
            if (!user) {
                return done(null, false, { message: 'That user was not found. Please enter valid user credentials.'});
            }
            // If the user is found but the password is incorrect
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Invalid password entered.' });
            }
            // If the user is found and password is correct but email is not approved.
            if (!user.isEmailApproved) {
                return done(null, false, { message: 'Your email is not approved yet.' });
            }
            // Otherwise all is well; return successful user
            return done(null, user);
        });
    }));

}   
