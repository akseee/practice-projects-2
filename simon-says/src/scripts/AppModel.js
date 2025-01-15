import { levels } from './utils/constants'

export default class AppModel {
	constructor() {
		this._difficulty = 'hard'
		this.levels = levels

		this.generatedSequence = []

		this.maxRounds = 5
		this.currentRound = 1

		this.attempt = true
		// this.isPlaying = false

		this.button = {
			next: 'continue',
			start: 'new game',
			repeat: 'repeat',
			over: 'better luck next time!',
		}

		this.info = {
			start: 'Focus and repeat the sequence. You have one life extra',
			life: 'It is okay, but dont make the mistake again',
			lost: 'Open console to see the sequence:) Another try?',
			win: 'Big brain... what can i say',
			wrong: 'Oooooopsie',
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
