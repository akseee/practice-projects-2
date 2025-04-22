import {
  type WSRequest,
  type WSResponse,
  type WSMessage,
  type WSHandlers,
  type UserLoginResponse,
  type UserLogoutResponse,
  type ErrorMessage,
  type AllAuthenticatedUsersResponse,
  type AllUnauthorizedUsersResponse,
  type UserLoginRequest,
  type UserLogoutRequest,
  type AllAuthenticatedUsersRequest,
  type AllUnauthorizedUsersRequest,
} from "../shared/types/types"

export default class WebSocketService {
  private socket: WebSocket
  private handlers: WSHandlers = {}
  private pendingRequests: Map<string, (response: WSMessage) => void> = new Map()
  private url = "ws://localhost:4000"

  constructor() {
    this.socket = new WebSocket(this.url)
    this.init()
  }

  private init(): void {
    this.socket.addEventListener("open", () => {
      console.log("[WebSocket] Connection established")
    })

    this.socket.addEventListener("message", (event: MessageEvent) => {
      try {
        const data: WSMessage = JSON.parse(event.data)

        if (data.id && this.pendingRequests.has(data.id)) {
          const callback = this.pendingRequests.get(data.id)
          this.pendingRequests.delete(data.id)
          callback?.(data)
        } else if (data.type in this.handlers) {
          const handler = this.handlers[data.type]
          if (handler) {
            handler(data as never)
          }
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  private sendRequest<T extends WSRequest, R extends WSResponse>(
    type: T["type"],
    payload: T["payload"],
  ): Promise<R | ErrorMessage> {
    const id = crypto.randomUUID()
    const message: T = { id, type, payload } as T

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pendingRequests.delete(id)
        reject(new Error(`Request ${type} timed out`))
      }, 5000)

      this.pendingRequests.set(id, (response: WSMessage) => {
        if (response.id === id && response.type === type) {
          resolve(response as R)
        } else if (response.type === "ERROR") {
          resolve(response as ErrorMessage)
        } else {
          reject(new Error(`Unexpected response type: ${response.type}`))
        }
        clearTimeout(timer)
      })

      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message))
      } else {
        this.pendingRequests.delete(id)
        clearTimeout(timer)
        reject(new Error("WebSocket is not connected"))
      }
    })
  }

  private sendStrictRequest<T extends WSRequest, R extends WSResponse>(
    type: T["type"],
    payload: T["payload"],
  ): Promise<R> {
    const id = crypto.randomUUID()
    const message: T = { id, type, payload } as T

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pendingRequests.delete(id)
        reject(new Error(`Request ${type} timed out`))
      }, 5000)

      this.pendingRequests.set(id, (response: WSMessage) => {
        if (response.id === id && response.type === type) {
          resolve(response as R)
          clearTimeout(timer)
        } else {
          reject(new Error(`Unexpected response type: ${response.type}`))
          clearTimeout(timer)
        }
      })

      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message))
      } else {
        this.pendingRequests.delete(id)
        clearTimeout(timer)
        reject(new Error("WebSocket is not connected"))
      }
    })
  }

  public login(login: string, password: string): Promise<UserLoginResponse | ErrorMessage> {
    return this.sendRequest<UserLoginRequest, UserLoginResponse>("USER_LOGIN", {
      user: { login, password },
    })
  }

  public logout(login: string, password: string): Promise<UserLogoutResponse | ErrorMessage> {
    return this.sendRequest<UserLogoutRequest, UserLogoutResponse>("USER_LOGOUT", {
      user: { login, password },
    })
  }

  public getAllAuthenticatedUsers(): Promise<AllAuthenticatedUsersResponse> {
    return this.sendStrictRequest<AllAuthenticatedUsersRequest, AllAuthenticatedUsersResponse>(
      "USER_ACTIVE",
      null,
    )
  }

  public getAllUnauthorizedUsers(): Promise<AllUnauthorizedUsersResponse> {
    return this.sendStrictRequest<AllUnauthorizedUsersRequest, AllUnauthorizedUsersResponse>(
      "USER_INACTIVE",
      null,
    )
  }

  public close(): void {
    this.socket.close()
  }
}
