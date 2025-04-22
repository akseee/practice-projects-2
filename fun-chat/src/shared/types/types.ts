export type TUserDetails = {
  login: string
  password: string
}

export type TCurrentUser = {
  login: string
  isLogined: boolean
}

export type TUser = {
  login: string
  isLogined: boolean
}

export type WSTypes = "USER_LOGIN" | "USER_LOGOUT" | "ERROR" | "USER_ACTIVE" | "USER_INACTIVE"

export type TUserAuthRequest = {
  user: {
    login: string
    password: string
  }
}
export type TUserAuthResponse = {
  user: {
    login: string
    isLogined: boolean
  }
}

export type TAllAuthenticatedUsersRequest = null
export type TAllAuthenticatedUsersResponse = {
  users: TUser[]
}

export type TAllUnauthorizedUsersRequest = null
export type TAllUnauthorizedUsersResponse = {
  users: TUser[]
}

export type TErrorResponse = {
  error: string
}

export interface WSRequestBase<T extends WSTypes, P> {
  id: string
  type: T
  payload: P
}

export interface WSResponseBase<T extends WSTypes, P> {
  id: string
  type: T
  payload: P
}

export type UserLoginRequest = WSRequestBase<"USER_LOGIN", TUserAuthRequest>
export type UserLoginResponse = WSResponseBase<"USER_LOGIN", TUserAuthResponse>

export type UserLogoutRequest = WSRequestBase<"USER_LOGOUT", TUserAuthRequest>
export type UserLogoutResponse = WSResponseBase<"USER_LOGOUT", TUserAuthResponse>

export type AllAuthenticatedUsersRequest = WSRequestBase<
  "USER_ACTIVE",
  TAllAuthenticatedUsersRequest
>
export type AllAuthenticatedUsersResponse = WSResponseBase<
  "USER_ACTIVE",
  TAllAuthenticatedUsersResponse
>

export type AllUnauthorizedUsersRequest = WSRequestBase<
  "USER_INACTIVE",
  TAllUnauthorizedUsersRequest
>
export type AllUnauthorizedUsersResponse = WSResponseBase<
  "USER_INACTIVE",
  TAllUnauthorizedUsersResponse
>
export type ErrorMessage = WSResponseBase<"ERROR", TErrorResponse>

export type WSRequest =
  | UserLoginRequest
  | UserLogoutRequest
  | AllAuthenticatedUsersRequest
  | AllUnauthorizedUsersRequest

export type WSResponse =
  | UserLoginResponse
  | UserLogoutResponse
  | ErrorMessage
  | AllAuthenticatedUsersResponse
  | AllUnauthorizedUsersResponse

export type WSMessage = WSRequest | WSResponse

export type WSHandlers = {
  [K in WSMessage["type"]]?: (data: Extract<WSMessage, { type: K }>) => void
}
