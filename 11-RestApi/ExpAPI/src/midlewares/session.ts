import expressSession from 'express-session';
import { v4 as uuidV4 } from 'uuid';

function session() {
  return expressSession({
    genid: () => uuidV4(),
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
  });
}

export default session;
