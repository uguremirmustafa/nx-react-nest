export interface User {
  name: string;
  email: string;
  avatar?: string;
  loggedIn: boolean;
}

export interface RegisterResponse {
  name: string;
  email: string;
  id: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface MenuItem {
  path: string;
  key: string;
  label: string;
  icon: any;
}
