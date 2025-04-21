import {
  type WSRequest,
  type WSResponse,
  type WSMessage,
  type WSHandlers,
  type UserLoginResponse,
  type UserLogoutResponse,
} from "../shared/types"

export default class WebSocketService {
  private socket: WebSocket
  private handlers: WSHandlers = {}
  private pendingRequests: Map<string, (response: WSResponse) => void> = new Map()
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
          const callback = this.pendingRequests.get(data.id)!
          this.pendingRequests.delete(data.id)
          callback(data as WSResponse)
        } else if (data.type in this.handlers) {
          const handler = this.handlers[data.type]
          handler?.(data)
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  public on<T extends WSMessage["type"]>(
    type: T,
    handler: (data: Extract<WSMessage, { type: T }>) => void,
  ): void {
    this.handlers[type] = handler as WSHandlers[T]
  }

  private sendRequest<R extends WSResponse>(
    type: R["type"],
    payload: Extract<WSRequest, { type: R["type"] }>["payload"],
  ): Promise<R> {
    const id = crypto.randomUUID()
    const message = JSON.stringify({ id, type, payload })

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pendingRequests.delete(id)
        reject(new Error(`Request ${type} timed out`))
      }, 5000)

      this.pendingRequests.set(id, (response: WSResponse) => {
        clearTimeout(timer)
        if (response.type === "ERROR") {
          reject(response)
        } else {
          resolve(response as R)
        }
      })

      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message)
      } else {
        this.pendingRequests.delete(id)
        reject(new Error("WebSocket is not connected"))
      }
    })
  }

  public login(login: string, password: string): Promise<UserLoginResponse> {
    return this.sendRequest<UserLoginResponse>("USER_LOGIN", {
      user: { login, password },
    })
  }

  public logout(login: string, password: string): Promise<UserLogoutResponse> {
    return this.sendRequest<UserLogoutResponse>("USER_LOGOUT", {
      user: { login, password },
    })
  }
}
