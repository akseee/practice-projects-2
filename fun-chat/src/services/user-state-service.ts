import { type TUserResponse } from "../shared/types"

export default class UserState {
  private _currentUser: null | TUserResponse = null

  public currentUser(): null | TUserResponse {
    return this._currentUser
  }

  public setCurrentUser(user: null | TUserResponse): void | null {
    this._currentUser = user
    this.addUserToSessionStorage(user)
  }

  public addUserToSessionStorage(user: TUserResponse | null): void {
    sessionStorage.setItem("user", JSON.stringify(user))
  }

  public removeUserFromSessionStorage(): void {
    sessionStorage.removeItem("user")
    this.setCurrentUser(null)
  }

  public getUserFromSessionStorage(): TUserResponse | null {
    const user = sessionStorage.getItem("user")

    if (user === null) {
      return null
    }

    const parsedUser = JSON.parse(user)
    this.setCurrentUser(parsedUser)
    return parsedUser
  }
}
