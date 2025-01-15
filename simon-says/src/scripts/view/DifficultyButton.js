import Component from '../base/Component'

export default class DifficultyButton extends Component {
	constructor(text) {
		super({
			tag: 'button',
			className: `button ${text}`,
			text: text,
		})

		if (text === 'easy') {
			this.addClass('active')
		}

		this.setAttribute('data-difficulty', text)
	}

	setActive(isActive) {
		if (isActive) {
			this.addClass('active')
		} else {
			this.removeClass('active')
		}
	}

	setDisabled(isDisabled) {
		super.setDisabled(isDisabled)
		if (isDisabled) {
			this.setAttribute('disabled', true)
		} else {
			this.removeAttribute('disabled')
		}
	}
}
