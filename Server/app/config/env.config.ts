
let config = require('../../config');

// Check each necessary node `environment variable` to see if a
// value has been set and if not, use the `config` object to
// supply appropriate values
export function validateAppEnvVariables() {

  // If no value has been assigned to our environment variables,
  // set them up...

  if(!process.env.NODE_ENV)
    process.env.NODE_ENV = config.ENV;

  // Check to see if `process.env.NODE_ENV` is valid
  validateNodeEnvironment();

  // For Express/Passport
  if (!process.env.SESSION_SECRET)
    process.env.SESSION_SECRET = config.SESSION_SECRET;

  if (!process.env.PORT)
    process.env.PORT = config.PORT;
    
  if (!process.env.RECAPTCHA_TOKEN_SERVER)
    process.env.RECAPTCHA_TOKEN_SERVER = config.RECAPTCHA_TOKEN_SERVER;

  return;
}

function validateNodeEnvironment() {

  // Check to see that the `process.env.NODE_ENV has been
  // set to an appropriate value of `development`, `production`
  // or `test`. If not, alert the user and default to `development`

  switch(process.env.NODE_ENV) {
    case 'development':
      console.log(`Node environment set for ${process.env.NODE_ENV}`);
      break;
    case 'production':
      console.log(`Node environment set for ${process.env.NODE_ENV}`);
      break;
    case 'test':
      console.log(`Node environment set for ${process.env.NODE_ENV}`);
      break;
    default:
      console.log('Error: process.env.NODE_ENV should be set to a valid '
        + ' value such as \'production\', \'development\', or \'test\'.');
      console.log(`Value received: ${process.env.NODE_ENV}`);
      console.log('Defaulting value for: development');
      process.env.NODE_ENV = 'development';
      break;
  }

  return;
}

