export interface ErrorRes {
  error_id: string;
  message: string;
}

export interface TokenRes {
  access_token: string;
  refresh_token: string;
}