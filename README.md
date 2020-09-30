# Geospoc 


## Version
    Client
        # Angular 10
        # @angular/cli    10.0.8
        # typescript      3.9.7
        # webpack         4.43.0
    
    Serve side
        # Node v12.18.0
        # MongoDB 4.4.1 Community


## Configure Recaptcha
    Go to google recaptcha site `https://www.google.com/recaptcha/intro/v3.html` to create a SITE KEY (for front end Angular) and a SECRET KEY (for backend verification with node). 
    # Step 1: Enter label e.g. 'my angular site'
    # Step 2: Select reCAPTCHA type
                >> reCAPTCHA v2
                    >> "I'm not a robot" Checkbox
    # Step 3: Add domain name e.g. 'localhost'
    # Step 4: Accept the reCAPTCHA Terms of service
    # Step 5: Submit 

    # Copy the client site key and paste here `<re-captcha (resolved)="resolved($event)" formControlName="recaptcha" 
            siteKey="RECAPTCHA_TOKEN_SITE" required>` in this file `./Client/src/app/job-seeker/job-seeker.component.html`
    
    # Copy the server secret key and paste here `"RECAPTCHA_TOKEN_SERVER": "MY SERVER TOKEN"` in this file `./Server/config.json`


## Run Client
    # Inside Client directory run following commands
    # `npm install`
    # `npm start`

    Client runs on http://localhost:4200


## Run Server
    # Inside Server directory run following commands
    # `npm install`
    # `./node_modules/.bin/migrate -d mongodb://localhost:27017/geospoc_dev up create_admin_user` 
    # `npm start`

     Server run on http://localhost:6000


## Result
    # Go to `http://localhost:4200` to see the result


## Admin User Creadential
    # email: `root@admin.co`
    # password: `root`


## Create new migration
    # ./node_modules/.bin/migrate -d mongodb://localhost:27017/geospoc_dev create <file_name>
    # e.g. ./node_modules/.bin/migrate -d mongodb://localhost:27017/geospoc_dev create create_admin_user


## Run Migration Up
    # ./node_modules/.bin/migrate -d mongodb://localhost:27017/geospoc_dev up <file_name>
    # e.g. ./node_modules/.bin/migrate -d mongodb://localhost:27017/geospoc_dev up create_admin_user


## Run Migration Down
    # ./node_modules/.bin/migrate -d mongodb://localhost:27017/geospoc_dev down <file_name>
    # e.g. ./node_modules/.bin/migrate -d mongodb://localhost:27017/geospoc_dev down create_admin_user