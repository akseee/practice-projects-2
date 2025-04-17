import { type WSHandlers, type WSMessage } from "../shared/types"

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
      console.log("[WebSocket] Соединение установлено")
    })

    this.socket.addEventListener("message", (event: MessageEvent) => {
      const data: WSMessage = JSON.parse(event.data)
      console.log("[WebSocket] Получено сообщение:", data)

      if (data.id && this.pendingRequests.has(data.id)) {
        const callback = this.pendingRequests.get(data.id)!
        this.pendingRequests.delete(data.id)
        callback(data)
      } else if (data.type in this.handlers) {
        this.handlers[data.type](data)
      }
    })

    this.socket.addEventListener("close", () => {
      console.warn("[WebSocket] Соединение закрыто")
    })

    this.socket.addEventListener("error", (err) => {
      console.error("[WebSocket] Ошибка:", err)
    })
  }

  public on(type: string, handler: (data: WSMessage) => void): void {
    this.handlers[type] = handler
  }

  public sendRequest(type: string, payload: any): Promise<WSMessage> {
    const id = crypto.randomUUID()
    const message = JSON.stringify({ id, type, payload })

    return new Promise((resolve) => {
      this.pendingRequests.set(id, resolve)
      this.socket.send(message)
    })
  }

  public send(type: string, payload: any): void {
    const message = JSON.stringify({ id: null, type, payload })
    this.socket.send(message)
  }

  public login(login: string, password: string): Promise<WSMessage> {
    return this.sendRequest("USER_LOGIN", { user: { login, password } })
  }

  public logout(login: string, password: string): Promise<WSMessage> {
    return this.sendRequest("USER_LOGOUT", { user: { login, password } })
  }

  public getActiveUsers(): Promise<WSMessage> {
    return this.sendRequest("USER_ACTIVE", null)
  }

  public close(): void {
    this.socket.close()
  }
}
