
import * as express from 'express';

import { JobSeekerController } from '../controller/jobSeeker.controller';
import { AuthController } from '../controller/auth.controller';
import { ApproveEmailController } from '../controller/approve-email.controller';


const DIR = './dist/public'
let multer = require('multer');
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: any) => {
      callback(null, DIR);
    },
    filename: (req: express.Request, file: Express.Multer.File, callback: any) => {
      let userEmail = req.body.email ? req.body.email + '-' : ''; 
      const fileName = userEmail + file.originalname.toLowerCase().split(' ').join('-');
      callback(null, fileName)
    }
});
let upload = multer({
      storage: storage,
      limits: {
      fileSize: 1024 * 1024 * 5
      },
      fileFilter: (req: Request, file: Express.Multer.File, callback: any) => {
      if (file.mimetype == "application/pdf") {
          callback(null, true);
      } else {
          callback(new Error('Only .pdf format allowed!'));
      }
    }
});

export default function routerConfig(app: express.Application) {

  let router: express.Router;
  router = express.Router();
  
  let auth = (req: express.Request, res: express.Response,
    next: express.NextFunction) => {
      if (!req.isAuthenticated())
        res.send(401);
      else
        next();
  };

  let admin = (req: express.Request, res: express.Response,
    next: express.NextFunction) => {
      let user: any = req.user;
      if (!req.isAuthenticated() || user.role != 'ADMIN')
        res.send(401);
      else
        next();
  };

  //Define routes
  let authController: AuthController = new AuthController(router, auth);
  let jobSeekerController: JobSeekerController = new JobSeekerController(router, auth, upload);
  let approveEmailController: ApproveEmailController = new ApproveEmailController(router, auth, admin);

  // All of our routes will be prefixed with /api
  app.use('/api', router);

  // Serve static front-end assets
  app.use(express.static('/dist/public'));

  // Route to handle all Angular requests
  app.get('*', (req, res) => {
    // Load our src/app.html file
    //** Note that the root is set to the parent of this folder, ie the app root **
    res.sendFile('Client/dist/client/index.html', { root: __dirname + "/../../../"});
  });

  // Use `router` middleware
  app.use(router);
};
