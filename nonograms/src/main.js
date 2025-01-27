import './style.css'

console.log('created base logic for grid  ')

function createGrid(size) {
	// creating base layout
	const gridWrapper = document.createElement('div')
	gridWrapper.classList.add('grid-wrapper')

	const grid = document.createElement('div')
	grid.classList.add('grid')

	const empty = document.createElement('div')
	empty.classList.add('empty')

	const columnsInfo = document.createElement('div')
	columnsInfo.classList.add('top-columns')

	const rowInfo = document.createElement('div')
	rowInfo.classList.add('left-rows')

	const field = document.createElement('div')
	field.classList.add('field')

	const fieldType =
		size === 5 ? 'field-5' : size === 10 ? 'field-10' : 'field-15'

	field.classList.add(fieldType)

	// filling grid with cells
	for (let i = 0; i < size * size; i++) {
		const cell = document.createElement('button')
		cell.type = 'button'
		cell.classList.add('cell')

		// setting data attributes for (x, y)
		const row = Math.floor(i / size)
		const column = i % size

		if ((row + 1) % 5 == 0) {
			!(row + 1 === size) && cell.classList.add('bottom')
		}
		if ((column + 1) % 5 == 0) {
			!(column + 1 === size) && cell.classList.add('right')
		}

		cell.setAttribute('data-row', row.toString())
		cell.setAttribute('data-column', column.toString())

		const cross = document.createElement('div')
		cross.classList.add('cross')

		// adding event lsitener for choosing the cell

		cell.addEventListener('click', (e) => {
			e.preventDefault()
			if (cell.classList.contains('marked')) {
				cell.classList.remove('marked')
				cell.removeChild(cross)
			}
			cell.classList.toggle('choosen')
		})

		// adding event lsitener for marking the cell
		cell.addEventListener('contextmenu', (e) => {
			e.preventDefault()
			if (cell.classList.contains('choosen')) {
				return
			}
			if (cell.childElementCount) {
				cell.removeChild(cross)
			} else {
				cell.appendChild(cross)
			}

			cell.classList.toggle('marked')
		})

		field.appendChild(cell)
	}

	//
	// filling column hint info with cells
	for (let i = 0; i < size; i++) {
		const hintCell = document.createElement('div')
		hintCell.classList.add('cell-info')
		hintCell.setAttribute('data-type', 'column')

		//
		// adding hints in the cells
		const hint = document.createElement('span')
		hint.classList.add('hint')

		hint.textContent = '15'

		// adding even listener for numbers
		hint.addEventListener('click', () => {
			hint.classList.toggle('marked')
		})

		// appending hint
		hintCell.append(hint)

		columnsInfo.append(hintCell)
	}

	//
	// filling row hint info with cells
	for (let i = 0; i < size; i++) {
		const hintCell = document.createElement('div')
		hintCell.classList.add('cell-info')
		hintCell.setAttribute('data-type', 'row')

		// adding hints in the cells
		const hint = document.createElement('span')
		hint.classList.add('hint')

		hint.textContent = i.toString()

		// adding even listener for numbers
		hint.addEventListener('click', () => {
			hint.classList.toggle('marked')
		})
		hintCell.append(hint)
		rowInfo.append(hintCell)
	}

	grid.append(empty, columnsInfo, rowInfo, field)
	gridWrapper.appendChild(grid)

	return gridWrapper
}

document.body.appendChild(createGrid(5))
