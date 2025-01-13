// @ts-nocheck
import AppModel from './scripts/AppModel'
import AppPresenter from './scripts/AppPresenter'
import AppView from './scripts/AppView'
import { levels } from './scripts/utils/constants'
import './style.css'

const page = new AppView()
const model = new AppModel()
model.levels = levels

const app = new AppPresenter({
	model,
	page,
})

app.renderView()
