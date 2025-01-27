import Page from './scripts/App'
import Component from './scripts/common/Component'
import Grid from './scripts/Grid'
import './style.css'

const header = new Component({ tag: 'header', className: 'header' })
const main = new Component({ tag: 'main', className: 'main' })
const grid = new Grid(5)
const popup = new Component({ tag: 'div', className: 'popup' })
const aside = new Component({ tag: 'aside', className: 'setup-form-wrapper' })
const form = new Component({ tag: 'div', className: '' }, aside)

const page = new Page(header, main, grid, popup, form)

page.render()
