import { type TUser } from "../shared/types"

export default class UserState {
  private _currentUser: null | TUser = null
  private _isAuth = false

  public isAuth(): boolean {
    return this._isAuth
  }

  public setAuth(isLogged: boolean): void {
    this._isAuth = isLogged
  }

  public currentUser(): null | TUser {
    return this._currentUser
  }

  public setCurrentUser(user: null | TUser): void {
    this._currentUser = user
  }

  public addUserToSessionStorage(user: TUser): void {
    this.setCurrentUser(user)
    sessionStorage.setItem("user", JSON.stringify(user))
  }

  public removeUserFromSessionStorage(): void {
    sessionStorage.removeItem("user")
    this.setCurrentUser(null)
  }

  public getUserFromSessionStorage(): { login: string; password: string } | undefined {
    const user = sessionStorage.getItem("user")

    if (user === null) {
      return undefined
    }

    const parsedUser = JSON.parse(user)
    this.setCurrentUser(parsedUser)
    return parsedUser
  }
}
