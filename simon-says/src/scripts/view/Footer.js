import Component from '../base/Component'

export default class Footer extends Component {
	constructor() {
		super({ tag: 'footer', className: 'footer' })

		const link = new Component({ tag: 'a', text: 'gh@akseee' })
		link.setLink('https://github.com/akseee')

		this.append(link)
	}
}
