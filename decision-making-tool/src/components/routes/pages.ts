export const enum EnumPages {
  DECISION = "options-list",
  WHEEL = "decision-picker",
  NOT_FOUND = "not-found",
}

export type TRoutes = {
  name: EnumPages
  callback: () => void
}
