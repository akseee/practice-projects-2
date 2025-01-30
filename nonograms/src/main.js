import Page from './scripts/App'
import Component from './scripts/common/Component'
import Aside from './scripts/components/aside/Aside'
import Form from './scripts/components/form/Form'
import Header from './scripts/components/header/Header'
import Main from './scripts/components/main/Main'
import Grid from './scripts/Grid'
import './style.css'

const grid = new Grid(15)
const main = new Main(grid)
const form = new Form()
const asideForm = new Aside('open form', form)
const header = new Header()

const page = new Page(header, main)
document.body.append(asideForm)
page.render()
