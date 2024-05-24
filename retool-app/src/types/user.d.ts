export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}