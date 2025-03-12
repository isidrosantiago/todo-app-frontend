export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  data: {
    id: string;
    username: string;
    token: string;
  };
}

export interface User {
  id: string;
  username: string;
  token: string;
}
