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

export type TMessage = {
  id: string
  from: string
  to: string
  text: string
  datetime: number
  status: {
    isDelivered: boolean
    isReaded: boolean
    isEdited: boolean
  }
}

export type TMessageStatus = {
  isDelivered: boolean
  isReaded: boolean
  isEdited: boolean
}

export type WSTypes =
  | "USER_LOGIN"
  | "USER_LOGOUT"
  | "ERROR"
  | "USER_ACTIVE"
  | "USER_INACTIVE"
  | "MSG_FROM_USER"
  | "MSG_SEND"
  | "USER_EXTERNAL_LOGIN"
  | "USER_EXTERNAL_LOGOUT"

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

export type TSendMessageRequest = {
  message: {
    to: string
    text: string
  }
}
export type TSendMessageResponse = {
  message: TMessage
}

export type TFetchMessageHistoryRequest = {
  user: {
    login: string
  }
}
export type TFetchMessageHistoryResponse = {
  messages: TMessage[]
}

export type TErrorResponse = {
  error: string
}

export type TUserExternalAuthResponse = {
  user: {
    login: string
    isLogined: boolean
  }
}

export type TRecieveMessageResponse = {
  message: TMessage
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

export type SendMessageRequest = WSResponseBase<"MSG_SEND", TSendMessageRequest>
export type SendMessageResponse = WSResponseBase<"MSG_SEND", TSendMessageResponse>

export type FetchMessageHistoryRequest = WSRequestBase<"MSG_FROM_USER", TFetchMessageHistoryRequest>
export type FetchMessageHistoryResponse = WSRequestBase<
  "MSG_FROM_USER",
  TFetchMessageHistoryResponse
>

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

export type UserExternalLoginResponse = WSResponseBase<
  "USER_EXTERNAL_LOGIN",
  TUserExternalAuthResponse
>

export type UserExternalLogoutResponse = WSResponseBase<
  "USER_EXTERNAL_LOGOUT",
  TUserExternalAuthResponse
>

export type RecieveMessageResponse = WSResponseBase<"MSG_SEND", TRecieveMessageResponse>

export type ErrorMessage = WSResponseBase<"ERROR", TErrorResponse>

export type WSRequest =
  | UserLoginRequest
  | UserLogoutRequest
  | AllAuthenticatedUsersRequest
  | AllUnauthorizedUsersRequest
  | SendMessageRequest
  | FetchMessageHistoryRequest

export type WSResponse =
  | UserLoginResponse
  | UserLogoutResponse
  | ErrorMessage
  | AllAuthenticatedUsersResponse
  | AllUnauthorizedUsersResponse
  | SendMessageResponse
  | FetchMessageHistoryResponse
  | UserExternalLoginResponse
  | UserExternalLogoutResponse
  | RecieveMessageResponse

export type WSMessage = WSRequest | WSResponse

export type WSHandlers = {
  [K in WSMessage["type"]]?: (data: Extract<WSMessage, { type: K }>) => void
}
