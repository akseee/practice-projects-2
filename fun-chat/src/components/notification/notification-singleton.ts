import Notifications from "./notification"

let notificationsInstance: Notifications | null = null

export function getNotifications(): Notifications {
  if (!notificationsInstance) {
    notificationsInstance = new Notifications()
  }
  return notificationsInstance
}
