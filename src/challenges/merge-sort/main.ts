const input = [7, 1, 8, 6, 3, 10, 5, 9, 2, 4]

const mergeSort = (input: number[]) => {
	if (!input.length) return [] as number[]
	if (input.length == 1) return input
	if (input.length == 2) {
		return input[0] > input[1] ? [input[1], input[0]] : [input[0], input[1]]
	}
	const middlePoint = Math.floor(input.length / 2)
	const leftResult = mergeSort(input.slice(0, middlePoint))
	const rightResult = mergeSort(input.slice(middlePoint))

	const result: number[] = []

	let pointer1 = 0
	let pointer2 = 0

	while (leftResult[pointer1] || rightResult[pointer2]) {
		const left = leftResult[pointer1]
		const right = rightResult[pointer2]

		if (!left) {
			result.push(right)
			pointer2++
			continue
		}
		if (!right) {
			result.push(left)
			pointer1++
			continue
		}

		if (left > right) {
			result.push(right)
			pointer2++
			continue
		}

		if (left < right) {
			result.push(left)
			pointer1++
			continue
		}

	}

	return result
}

console.log(mergeSort(input))