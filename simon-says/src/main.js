// @ts-nocheck
import AppModel from './scripts/AppModel'
import AppPresenter from './scripts/AppPresenter'
import AppView from './scripts/AppView'
import { levels } from './scripts/utils/constants'
import VirtualKeyboard from './scripts/view/VirtualKeyboard'
import './style.css'

const page = new AppView()

const model = new AppModel()

model.levels = levels

const keyboard = new VirtualKeyboard()

const app = new AppPresenter({
	model,
	page,
	keyboard,
})

app.init()
app.render()
