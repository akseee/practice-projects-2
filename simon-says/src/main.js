// @ts-nocheck
import AppModel from './scripts/AppModel'
import AppPresenter from './scripts/AppPresenter'
import AppView from './scripts/AppView'
import './style.css'

const appModel = new AppModel()
const appView = new AppView()
const appPresenter = new AppPresenter(appView)

document.body.appendChild(appView.getNode())
