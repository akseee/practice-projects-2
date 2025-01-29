import Component from '../../common/Component'

export default class Button extends Component {
	constructor(cn, text, listener) {
		super({ tag: 'div', className: `button ${cn}` })

		this.setTextContent(text)

		this.addListener('click', listener)
	}
}
