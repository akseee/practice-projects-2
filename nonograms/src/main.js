import Page from './scripts/App'
import Component from './scripts/common/Component'
import Form from './scripts/components/form/Form'
import Header from './scripts/components/header/Header'
import Main from './scripts/components/main/Main'
import Grid from './scripts/Grid'
import './style.css'

const grid = new Grid(5)
const main = new Main(grid)
const popup = new Component({ tag: 'div', className: 'popup' })
const form = new Form()
const header = new Header()

const page = new Page(header, main, popup, form)

page.render()
