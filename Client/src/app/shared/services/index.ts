export * from './auth-guard.service';
export * from './auth.service';
export * from './http.service';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

export const SHARED_APP_SERVICES = [
  AuthGuard,
  AuthService,
  HttpService
];