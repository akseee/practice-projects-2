import Component from '../base/Component'

export default class Output extends Component {
	constructor() {
		super({
			tag: 'input',
			className: 'output',
		})
		this.setAttribute('readonly', true)
		this.setAttribute('value', '')
	}

	getValue() {
		return this.getAttribute('value')
	}

	updateValue(newValue) {
		this.setAttribute('value', newValue)
	}

	clear() {
		this.setAttribute('value', '')
	}
}
