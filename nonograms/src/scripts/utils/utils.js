export function calculateRowHints(array) {
	let result = []
	for (let i = 0; i < array.length; i++) {
		let sum = 0
		let res = []
		for (let j = 0; j < array[i].length; j++) {
			if (array[i][j] === 1) {
				sum += 1
			} else if (sum > 0) {
				res.push(sum)
				sum = 0
			}
		}
		if (sum > 0) {
			res.push(sum)
		}
		result.push(res)
	}

	return result
}

export function calculateColumnHints(array) {
	let result = []
	for (let i = 0; i < array.length; i++) {
		let sum = 0
		let res = []
		for (let j = 0; j < array[i].length; j++) {
			if (array[j][i] === 1) {
				sum += 1
			} else if (sum > 0) {
				res.push(sum)
				sum = 0
			}
		}
		if (sum > 0) {
			res.push(sum)
		}
		result.push(res)
	}

	return result
}
