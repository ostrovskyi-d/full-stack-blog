import dotenv from 'dotenv';
// import __dirname from 'path'
import path from 'path';

const __dirname = path.resolve();
const root = path.resolve.bind(this, __dirname);

dotenv.config({path: root('.env')});

export const PORT = process.env.PORT || 4000;
export const MONGO_URL = process.env.MONGO_URL;
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const PER_PAGE = process.env.PER_PAGE || 5;