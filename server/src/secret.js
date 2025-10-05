require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3001;

const mongodbURL = process.env.MONGODB_ATLAS_URL || 'mongodb://localhost:27017/ecommerceMerenDB';

const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || 'public/images/users/icon.png';

module.exports = { serverPort, mongodbURL, defaultImagePath };

