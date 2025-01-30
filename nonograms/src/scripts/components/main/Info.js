import Component from '../../common/Component'

export default class Info extends Component {
	constructor() {
		super({ tag: 'div', className: 'info' })

		this.text = new Component({ tag: 'p', className: 'info-text' })
		this.timer = new Component({ tag: 'div', className: 'info-timer' })

		this.text.setTextContent('hihi')
		this.timer.setTextContent('00:21')

		this.appendChildren([this.text, this.timer])
	}

	startTimer() {}
}
