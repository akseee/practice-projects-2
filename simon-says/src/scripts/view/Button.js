import Component from '../base/Component'

export default class Button extends Component {
	constructor({ text = '', className = '', onClick = null }) {
		super({ tag: 'button', className: `button ${className}`, text })

		if (onClick) {
			this.setOnClickListener(onClick)
		}
	}

	setOnClickListener(listener) {
		// this.removeListener('click', listener)
		this.addListener('click', listener)
	}

	setText(text) {
		this.setTextContent(text)
	}
}
