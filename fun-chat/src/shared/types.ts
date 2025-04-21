export type WSTypes =
  | "USER_LOGIN"
  | "USER_LOGOUT"
  | "USER_ACTIVE"
  | "USER_INACTIVE"
  | "USER_EXTERNAL_LOGIN"
  | "USER_EXTERNAL_LOGOUT"
  | "ERROR"

export type TUser = {
  login: string
  password: string
}

export type TUserResponse = {
  login: string
  isLogined: boolean
}

export interface WSMessageBase<T extends WSTypes = WSTypes, P = unknown> {
  id: string | null
  type: T
  payload: P
}

export type WSMessage =
  | WSMessageBase<"USER_LOGIN", IUserLoginResponsePayload>
  | WSMessageBase<"USER_LOGOUT", IUserLogoutPayload>
  | WSMessageBase<"USER_ACTIVE", null>
  | WSMessageBase<"USER_INACTIVE", null>
  | WSMessageBase<"USER_EXTERNAL_LOGIN", object>
  | WSMessageBase<"USER_EXTERNAL_LOGOUT", object>
  | WSMessageBase<"ERROR", { message: string }>

export type WSHandlers = {
  [K in WSMessage["type"]]?: (data: Extract<WSMessage, { type: K }>) => void
}

export interface IUserLoginResponsePayload {
  user: TUser
}

export interface IUserLogoutPayload {
  user: TUser
}
