class TwoDIterator {
	private xIdx = 0
	private yIdx = 0

	constructor(private input: number[][]) {}

	next(): number {
		let currentArr = this.input[this.xIdx]
		if(this.yIdx >= currentArr.length) {
			this.yIdx = 0
			this.xIdx++
			currentArr = this.input[this.xIdx]
		}
		if (!currentArr) {
			throw 'Fin, The end'
		}
		const value = currentArr[this.yIdx]
		this.yIdx++
		if (!value) {
			return this.next()
		}
		return value
	}

	hasNext(): boolean {
		const isLastArr = this.xIdx == this.input.length - 1
		const lastArr = [...this.input].pop()
		if (!lastArr)
			return false
		const isLastItem = this.yIdx == lastArr.length - 1
		return !isLastArr || !isLastItem
	}

}

const obj = new TwoDIterator([[1, 2], [3], [], [4, 5, 6]])
console.log(obj.hasNext(), obj.next())
console.log(obj.hasNext(), obj.next())
console.log(obj.hasNext(), obj.next())
console.log(obj.hasNext(), obj.next())
console.log(obj.hasNext(), obj.next())
console.log(obj.hasNext(), obj.next())
// console.log(obj.hasNext(), obj.next())
