import { levels } from './utils/constants'

export default class AppModel {
	constructor() {
		this._difficulty = 'easy'
		this.levels = levels

		this.generatedSequence = []

		this.maxRounds = 5
		this.currentRound = 1

		this.attempt = true
		this.isPlaying = false

		this.button = {
			next: 'continue',
			start: 'new game',
			repeat: 'repeat',
			over: 'better luck next time!',
		}

		this.info = {
			idle: '...waiting for the game to start',
			start: 'Focus and repeat the sequence. You have one life extra',
			life: 'Dont cheat (open console :))',
			lost: 'Hint: open console to see the sequence:) Another try?',
			win: 'Congrats! You nailed it! One more try?',
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
		console.log('the sequence is [' + generated + ']')
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
