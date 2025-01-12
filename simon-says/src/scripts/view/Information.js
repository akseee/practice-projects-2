import Component from '../base/Component'

export default class Information extends Component {
	constructor() {
		super({ tag: 'div', className: 'information' })

		const startBtn = new Component({
			tag: 'button',
			className: 'button start ',
			text: 'Start new game!',
		})

		const optionalBtn = new Component({
			tag: 'button',
			className: 'button option ',
			text: '...repeat sequence',
		})

		const controls = new Component(
			{ tag: 'div', className: 'controls' },
			startBtn,
			optionalBtn
		)

		const infoText = new Component({
			tag: 'p',
			className: 'info',
			text: 'Waiting for the game to start',
		})

		this.currentRound = '1'
		this.maxRounds = '6'

		const roundsText = new Component({
			tag: 'h2',
			className: 'rounds',
			text: `Round ${this.currentRound}/${this.maxRounds}`,
		})

		const status = new Component(
			{ tag: 'div', className: 'status' },
			infoText,
			roundsText
		)

		this.append(controls)
		this.append(status)
	}
}
