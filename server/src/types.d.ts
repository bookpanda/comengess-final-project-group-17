import { Session } from 'express-session';

declare module 'express-session' {
  interface Session {
    token?: {
      access_token?: string;
    };
  }
}
