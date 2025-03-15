export default class GameModel {
  protected timer: number
  constructor() {
    this.timer = 0
  }

  public setTimer(time: number): void {
    this.timer = time
  }
}
