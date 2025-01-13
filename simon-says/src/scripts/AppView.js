import Component from './base/Component'
import { keys } from './utils/constants'

import BoardKey from './view/BoardKey'
import Link from './view/Link'
import OutputKey from './view/OutputKey'

export default class AppView extends Component {
	constructor() {
		super({ tag: 'div', className: 'page' })
		this._keysList = keys
		this._outputList = ['a', 'b', 'c']

		this.header = new Component({
			tag: 'header',
			className: 'header',
		})

		this.body = new Component({ tag: 'main', className: 'main' })

		this.footer = new Component({
			tag: 'footer',
			className: 'footer',
		})

		this.renderHeader()
		this.renderBody()
		this.renderFooter()
		this.appendChildren([this.header, this.body, this.footer])
	}

	renderHeader() {
		this.title = new Component({
			tag: 'h1',
			className: 'title',
			text: 'Проверяющие, работа не готова:( Извините',
		})

		this.easyButton = new Component({
			tag: 'button',
			className: 'button easy ',
			text: 'easy',
		})
		this.mediumButton = new Component({
			tag: 'button',
			className: 'button medium',
			text: 'medium',
		})
		this.hardButton = new Component({
			tag: 'button',
			className: 'button hard',
			text: 'hard',
		})

		this.easyButton.addListener('click', () => this.onDifficultyChange('easy'))
		this.mediumButton.addListener('click', () =>
			this.onDifficultyChange('medium')
		)
		this.hardButton.addListener('click', () => this.onDifficultyChange('hard'))

		this.difficulty = new Component(
			{ tag: 'div', className: 'difficulty' },
			this.easyButton,
			this.mediumButton,
			this.hardButton
		)

		this.header.appendChildren([this.title, this.difficulty])
	}

	renderBody() {
		this.information = new Component({ tag: 'div', className: 'information' })
		const startBtn = new Component({
			tag: 'button',
			className: 'button start ',
			text: 'start new game',
		})

		const optionalBtn = new Component({
			tag: 'button',
			className: 'button option ',
			text: '...repeat sequence',
		})

		const controls = new Component({ tag: 'div', className: 'controls' })
		controls.appendChildren([startBtn, optionalBtn])

		const infoText = new Component({
			tag: 'p',
			className: 'info',
			text: 'Слишком намудрила себе. Буду благодарна если будет возможность перепроверить потом',
		})

		const roundsText = new Component({
			tag: 'h2',
			className: 'rounds',
			text: `Round 1/6`,
		})

		const status = new Component({ tag: 'div', className: 'status' })
		status.appendChildren([infoText, roundsText])

		this.information.appendChildren([controls, status])

		this.output = new Component({ tag: 'div', className: 'output' })
		this.output.appendChildren(
			this._outputList.map((output) => {
				return new OutputKey({ text: output })
			})
		)
		this.display = new Component(
			{ tag: 'div', className: 'display' },
			new Component(
				{
					tag: 'div',
					className: 'display-wrapper',
				},
				this.output
			)
		)
		this.keyboard = new Component({ tag: 'div', className: 'keyboard' })
		this.keyboard.appendChildren(
			this._keysList.map((text) => {
				return new BoardKey({ text: text })
			})
		)
		this.body.appendChildren([this.information, this.display, this.keyboard])
	}

	renderFooter() {
		this.footer.append(
			new Link({
				className: '',
				text: 'gh@akseee',
				href: 'https://github.com/akseee',
				onClick: () => {},
			})
		)
	}

	onDifficultyChange(difficulty) {
		console.log(difficulty)
	}
}
