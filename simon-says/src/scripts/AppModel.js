import { levels } from './utils/constants'

export default class AppModel {
	constructor() {
		this._difficulty = 'easy'
		this.levels = levels

		this.generatedSequence = []

		this.maxRounds = 5
		this.currentRound = 1

		this.anotherLife = true
		this.isPlaying = false

		this.info = {
			next: 'continue',
			start: 'start new game',
			repeat: '...repeat sequence just one more time',
			over: 'better luck next time!',
		}
	}

	get sequence() {
		return this.generatedSequence
	}

	get keys() {
		return this.levels[this._difficulty]
	}

	set difficulty(difficulty) {
		this._difficulty = difficulty
	}

	generateSequence() {
		const sequenceLength = this.getSequenceLength()

		const generated = Array.from({ length: sequenceLength }, () => {
			const randomIndex = Math.floor(Math.random() * this.keys.length)

			return this.keys[randomIndex]
		})

		this.generatedSequence = generated
		console.log(generated)
		return generated
	}

	setIsPlaying(playing) {
		this.isPlaying = playing
	}

	getCurrentKeys() {
		return this.levels[this.difficulty]
	}

	getSequenceLength() {
		return 2 + (this.currentRound - 1) * 2
	}
}
