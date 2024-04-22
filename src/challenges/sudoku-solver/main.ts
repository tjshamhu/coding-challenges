type CellValue = number | null

type Row = [CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue]
type Column = [CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue]
type Square = [
		[CellValue, CellValue, CellValue],
		[CellValue, CellValue, CellValue],
		[CellValue, CellValue, CellValue]
	]

type IBoard = [Row, Row, Row, Row, Row, Row, Row, Row, Row]

class Board {
	constructor(public state: IBoard) {
		for (const row of state) {
			for (const cell of row) {
				if(cell && !this.validNumbers.includes(cell)) {
					throw 'Invalid board'
				}
			}
		}
	}

	private validNumbers = new Array(9).fill(null).map((_, idx) => idx + 1)

	getRow(index: number): Row {
		return this.state[index]
	}

	getColumn(index: number): Column {
		return this.state.map(row => row[index]) as Column
	}

	getSquare(index: number): Square {
		const rowOffset = Math.floor(index / 3) * 3;
		const colOffset = (index % 3) * 3;

		const square: Square = [
			[this.state[rowOffset][colOffset], this.state[rowOffset][colOffset + 1], this.state[rowOffset][colOffset + 2]],
			[this.state[rowOffset + 1][colOffset], this.state[rowOffset + 1][colOffset + 1], this.state[rowOffset + 1][colOffset + 2]],
			[this.state[rowOffset + 2][colOffset], this.state[rowOffset + 2][colOffset + 1], this.state[rowOffset + 2][colOffset + 2]],
		];

		return square;
	}

	getMissingNumberInSquare(index: number): number[] {
		const allNumbersInSquare = this.getSquareNumbers(index)
		return this.validNumbers.filter(vN => !allNumbersInSquare.includes(vN))
	}

	getMissingNumberInRow(index: number): number[] {
		const allNumbersInRow = this.getRowNumbers(index)
		return this.validNumbers.filter(vN => !allNumbersInRow.includes(vN))
	}

	getMissingNumberInColumn(index: number): number[] {
		const allNumbersInCol = this.getColumnNumbers(index)
		return this.validNumbers.filter(vN => !allNumbersInCol.includes(vN))
	}

	getRowNumbers(index: number) {
		return this.getRow(index).map(cell => cell)
	}

	getColumnNumbers(index: number) {
		return this.getColumn(index).map(cell => cell)
	}

	getSquareNumbers(index: number) {
		return this.getSquare(index).flatMap(cell => cell)
	}

	getColumnsWithNumber(num: number): number[] {
		return new Array(9).fill(null)
			.map((_, idx) => this.getColumnNumbers(idx).includes(num) ? idx : undefined)
			.filter(it => it != undefined) as number[]
	}

	getRowsWithNumber(num: number): number[] {
		return new Array(9).fill(null)
			.map((_, idx) => this.getRowNumbers(idx).includes(num) ? idx : undefined)
			.filter(it => it != undefined) as number[]
	}

	getSquaresWithNumber(num: number): number[] {
		return new Array(9).fill(null)
			.map((_, idx) => this.getSquareNumbers(idx).includes(num) ? idx : undefined)
			.filter(it => it != undefined) as number[]
	}

	get isSolved(): boolean {
		return this.state.every(row => row.every(col => !!col))
	}

	printBoard() {
		for (const row of this.state) {
			console.log(
				row
					.map(it => !!it ? it : '.')
					.join('   ')
			)
		}
	}

	solve(): IBoard {

		let boardUpdated = true

		while (boardUpdated && !this.isSolved) {
			boardUpdated = false

			for (let rowIdx = 0; rowIdx <= 8; rowIdx++) {
				const row = this.getRow(rowIdx)
				const missingNumbers = this.getMissingNumberInRow(rowIdx)

				for (const missingNumber of missingNumbers) {
					let possibleColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8]
					const columnsWithNumber = this.getColumnsWithNumber(missingNumber)

					let squaresWithNumber: number[] = this.getSquaresWithNumber(missingNumber)
						.filter(it => {
							if (rowIdx <= 2)
								return [0, 1, 2].includes(it)
							if (rowIdx >= 3 && rowIdx <= 5)
								return [3, 4, 5].includes(it)
							if (rowIdx >= 6)
								return [6, 7, 8].includes(it)
						})

					const columnsNullifiedBySquaresWithMissingNumber = squaresWithNumber.flatMap(it => {
						const offset = (it % 3) * 3
						return [offset, offset + 1, offset + 2]
					})

					possibleColumns = possibleColumns.filter(it =>
						row[it] == null &&
						!columnsWithNumber.includes(it) &&
						!columnsNullifiedBySquaresWithMissingNumber.includes(it)
					)

					if (possibleColumns.length == 1) {
						this.state[rowIdx][possibleColumns[0]] = missingNumber
						boardUpdated = true
					}
				}
			}

			for (let colIdx = 0; colIdx <= 8; colIdx++) {
				const column = this.getColumn(colIdx)
				const missingNumbers = this.getMissingNumberInColumn(colIdx)

				for (const missingNumber of missingNumbers) {
					let possibleRows = [0, 1, 2, 3, 4, 5, 6, 7, 8]
					const rowsWithNumber = this.getRowsWithNumber(missingNumber)

					const squaresWithNumber: number[] = this.getSquaresWithNumber(missingNumber)
						.filter(it => {
							if (colIdx <= 2)
								return [0, 3, 6].includes(it)
							if (colIdx >= 3 && colIdx <= 5)
								return [1, 4, 7].includes(it)
							if (colIdx >= 6)
								return [2, 5, 8].includes(it)
						})

					const rowsNullifiedBySquaresWithMissingNumber = squaresWithNumber.flatMap(it => {
						const offset = Math.floor(it / 3) * 3
						return [offset, offset + 1, offset + 2]
					})

					possibleRows = possibleRows.filter(it =>
						column[it] == null &&
						!rowsWithNumber.includes(it) &&
						!rowsNullifiedBySquaresWithMissingNumber.includes(it)
					)

					if (possibleRows.length == 1) {
						this.state[possibleRows[0]][colIdx] = missingNumber
						boardUpdated = true
					}
				}
			}

			for (let squareIdx = 0; squareIdx <= 8; squareIdx++) {

				const missingNumbers = this.getMissingNumberInSquare(squareIdx)

				for (const missingNumber of missingNumbers) {
					const squareStartingRow = Math.floor(squareIdx / 3) * 3
					const squareStartingCol = (squareIdx % 3) * 3

					let possibleRows = [squareStartingRow, squareStartingRow + 1, squareStartingRow + 2]
					let possibleColumns = [squareStartingCol, squareStartingCol + 1, squareStartingCol + 2]

					possibleRows = possibleRows.filter(it => !this.getRowNumbers(it).includes(missingNumber))
					possibleColumns = possibleColumns.filter(it => !this.getColumnNumbers(it).includes(missingNumber))

					if (possibleRows.length == 1 && possibleColumns.length == 1) {
						this.state[possibleRows[0]][possibleColumns[0]] = missingNumber
						boardUpdated = true
					}
				}
			}

		}

		if (!this.isSolved) {
			console.warn('Could not solve following board')
			this.printBoard()
			return this.state
		}

		this.printBoard()
		return this.state
	}
}


const sudokuRows: IBoard = [
	[5, 3, null, null, 7, null, null, null, null],
	[6, null, null, 1, 9, 5, null, null, null],
	[null, 9, 8, null, null, null, null, 6, null],
	[8, null, null, null, 6, null, null, null, 3],
	[4, null, null, 8, null, 3, null, null, 1],
	[7, null, null, null, 2, null, null, null, 6],
	[null, 6, null, null, null, null, 2, 8, null],
	[null, null, null, 4, 1, 9, null, null, 5],
	[null, null, null, null, 8, null, null, 7, 9]
]

const sudokuEasy: IBoard = [
	[null, null, null, 5, null, 3, 9, 8, null],
	[5, null, null, 7, 9, null, null, 6, null],
	[null, 6, 9, null, null, null, 4, null, null],
	[null, 4, null, 2, 8, 7, 1, 3, null],
	[null, null, 3, 6, 5, null, 8, 7, null],
	[null, null, null, 4, 3, 1, null, 9, null],
	[6, null, 5, 8, null, 2, null, null, null],
	[7, 9, 1, null, null, 6, null, null, 8],
	[null, null, 2, 9, null, 5, null, 1, 6]
]

const sudokuMedium: IBoard = [
	[3, 9, null, 5, null, null, 7, null, 1],
	[null, 6, null, null, 3, 7, 8, null, 5],
	[null, null, 7, null, null, 8, 4, 3, null],
	[1, null, null, 3, null, null, null, 8, 7],
	[null, 7, null, 6, null, 2, null, null, null],
	[null, 4, null, 7, 8, 1, 2, null, 3],
	[9, null, null, 2, 7, null, null, null, null],
	[null, 3, null, null, null, 5, null, 6, null],
	[null, null, null, null, 9, null, 3, null, null]
];

const sudokuHard: IBoard = [
	[null, null, null, 3, null, 9, null, null, 5],
	[null, 4, 7, null, null, null, null, null, null],
	[null, 9, 5, 6, null, null, null, null, 8],
	[9, null, null, null, null, 7, null, null, null],
	[null, null, 4, 8, 2, 6, null, null, 9],
	[null, 3, 8, 5, null, null, null, null, null],
	[8, null, 6, null, null, null, 9, null, null],
	[4, 1, null, null, 6, null, null, null, 7],
	[5, 2, 9, null, null, null, null, null, null]
];

const sudokuEvil: IBoard = [
	[null, 2, null, null, null, 7, null, null, null],
	[4, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, 8],
	[null, null, 2, 6, null, 5, null, null, null],
	[null, null, null, 4, null, null, null, null, null],
	[null, null, 8, null, null, 9, 2, null, 1],
	[null, null, 3, 9, 6, 8, null, null, null],
	[null, null, 6, 5, 4, null, 3, null, null],
	[null, null, null, null, null, 3, 8, null, 9]
];

console.log('Solving Board 1')
const board = new Board(sudokuRows)
board.solve()

console.log('Solving Easy')
const easyBoard = new Board(sudokuEasy)
easyBoard.solve()

console.log('Solving Medium')
const mediumBoard = new Board(sudokuMedium)
mediumBoard.solve()

console.log('Solving Hard')
const hardBoard = new Board(sudokuHard)
hardBoard.solve()

console.log('Solving Evil')
const evilBoard = new Board(sudokuEvil)
evilBoard.solve()