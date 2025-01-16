import { levels } from './utils/constants'

export default class AppModel {
	constructor() {
		this._difficulty = 'easy'
		this.levels = levels

		this.generatedSequence = []
		this.clicks = 0
		this.currentRound = 1
		this.attempt = true

		this.button = {
			next: 'continue',
			start: 'new game',
			repeat: 'repeat',
			over: 'better luck next time!',
		}

		this.info = {
			idle: '',
			correct: 'Well done! Next to continue',
			life: 'one attempt left',
			incorrect:
				'Oopsie, wrong one. You have one more attempt. Click the button above',
			lost: 'You lost:( Hint: open console to see the sequence. Another try?',
			win: 'Congrats! You nailed it! One more try?',
		}
	}

	get sequence() {
		return this.generatedSequence
	}

	set sequence(sequence) {
		// @ts-ignore
		this.generatedSequence = sequence
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
		console.log('the sequence is [' + generated + ']')
		return generated
	}

	setDifficulty(difficulty) {
		this.difficulty = difficulty
	}

	resetSequence() {
		this.sequence = []
	}

	getCurrentKeys() {
		return this.levels[this.difficulty]
	}

	getSequenceLength() {
		return 2 + (this.currentRound - 1) * 2
	}

	resetClicks() {
		this.clicks = 0
	}

	useAttempt() {
		this.attempt = false
	}

	resetAttempt() {
		this.attempt = true
	}

	resetRounds() {
		this.currentRound = 1
	}
}
