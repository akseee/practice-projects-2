import Connector from './scripts/Connector'
import './style.css'

// const grid = new Grid(5)
// const main = new Main(grid)

// const form = new Form()
// const asideForm = new Aside(form)

// const rules = new Rules()
// const asideRules = new Aside(rules)

// const leaderboard = new Leaderboard()
// const asideLeaderboard = new Aside(leaderboard)

const connector = new Connector()

connector.render()
connector.init()

// page.render()
// document.body.append(asideLeaderboard)
// document.body.append(asideForm)
// document.body.append(asideRules)
