import Component from '../../common/Component'

export default class Notification extends Component {
	constructor() {
		super({ tag: 'div', className: 'aside-content' })

		this.title = new Component({ tag: 'h2', className: 'aside-title' })
		this.title.setTextContent('')

		this.text = new Component({ tag: 'p', className: 'notification-text' })

		this.appendChildren([this.title, this.text])
	}

	setMessage(message) {
		this.text.setTextContent(message)
	}
}
