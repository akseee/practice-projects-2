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
			correct: 'Well done! ',
			life: 'one attempt left',
			incorrect: 'Oopsie, wrong one',
			lost: 'You lost:( Hint: open console to see the sequence. ',
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
		const sequenceLength = 2 + (this.currentRound - 1) * 2

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
