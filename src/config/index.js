const { production } = require("../misc/consts");

module.exports = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  apiUrl: process.env.NODE_ENV === production ? process.env.API_PRODUCTION : process.env.API_DEVELOPMENT,
  redirectionClient: process.env.REDIRECTION_CLIENT,

  mongodbString: process.env.MONGODB_STRING,

  awsKey: process.env.AWS_KEY,
  awsSecret: process.env.AWS_SECRET,
  awsBucket: process.env.AWS_BUCKET,
  awsRegion: process.env.AWS_BUCKET_REGION,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECRET_KEY,

  privateSecret: process.env.PRIVATE_SECRET,
  
  adminEmailList: process.env.ADMIN_EMAIL_LIST,
}