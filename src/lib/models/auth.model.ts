export interface UserData {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  password?: string;
}

export interface RegisterReq {
  email: string;
  password: string;
  username: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface ChangePassReq {
  userId: string;
  oldPassword: string;
  newPassword: string;
}
