import Page from './scripts/App'
import Component from './scripts/common/Component'
import Aside from './scripts/components/aside/Aside'
import Form from './scripts/components/form/Form'
import Header from './scripts/components/header/Header'
import Leaderboard from './scripts/components/leaderboard/Leaderboard'
import Main from './scripts/components/main/Main'
import Rules from './scripts/components/rules/Rules'
import Grid from './scripts/Grid'
import './style.css'

const grid = new Grid(15)
const main = new Main(grid)

const form = new Form()
const asideForm = new Aside(form)

// const rules = new Rules()
// const asideRules = new Aside(rules)

// const leaderboard = new Leaderboard()
// const asideLeaderboard = new Aside(leaderboard)

const header = new Header()

const page = new Page(header, main)

page.render()
// document.body.append(asideLeaderboard)
document.body.append(asideForm)
// document.body.append(asideRules)
