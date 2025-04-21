import { type TUserDetails, type TCurrentUser } from "../shared/types/types"

export default class UserState {
  private _currentUser: null | TCurrentUser = null
  private _userDetails: null | TUserDetails = null

  public currentUser(): null | TCurrentUser {
    return this._currentUser
  }

  public userDetails(): null | TUserDetails {
    return this._userDetails
  }

  public setCurrentUser(user: null | TCurrentUser): void {
    this._currentUser = user
    this.addUserToSessionStorage(user)
  }

  public setUserDetails(user: null | TUserDetails): void {
    this._userDetails = user
  }

  public addUserToSessionStorage(user: TCurrentUser | null): void {
    sessionStorage.setItem("user", JSON.stringify(user))
  }

  public removeUserFromSessionStorage(): void {
    sessionStorage.removeItem("user")

    this.setCurrentUser(null)
    this.setUserDetails(null)
  }

  public getUserFromSessionStorage(): TCurrentUser | null {
    const user = sessionStorage.getItem("user")

    if (user === null) {
      return null
    }

    const parsedUser = JSON.parse(user)
    this.setCurrentUser(parsedUser)
    return parsedUser
  }
}
