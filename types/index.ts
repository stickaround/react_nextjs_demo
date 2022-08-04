export interface LoginPayload {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  role: string;
  status: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  user: User;
}

export interface PostPayload {
  title: string;
  content: string;
}
