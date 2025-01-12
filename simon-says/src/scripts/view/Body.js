import Component from '../base/Component'
import Display from './Display'
import Information from './Information'
import Keyboard from './Keyboard'

export default class Body extends Component {
	constructor() {
		super({ tag: 'main', className: 'main' })

		const informationNode = new Information()

		const displayNode = new Display()

		const keyboardNode = new Keyboard()
		this.append(informationNode)
		this.append(displayNode)
		this.append(keyboardNode)
	}
}
