function partition(nums: number[]) {

	nums.sort((a, b) => a - b)

	const set1 = [nums[nums.length - 1]]
	const set2 = []
	let set1Sum = nums[nums.length - 1]
	let set2Sum = 0

	for (let i = nums.length - 2; i >= 0; i--) {
		const num = nums[i]
		if (set1Sum > set2Sum) {
			set2.push(num)
			set2Sum += num
		} else {
			set1.push(num)
			set1Sum += num
		}
	}

	return [set1, set2]
}

function partitionWithDp(nums: number[]) {
	const halfSum = nums.reduce((a, c) => a + c) / 2
	const cache: Record<string, number[] | undefined> = {}

	function getClosest(numbers: number[], target: number): number[] | undefined {
		if (target < 0) return undefined
		if (!numbers.length)
			return target >= 0 ? [] : undefined

		const cacheKey = numbers.toString()+target
		if (cache[cacheKey]) return cache[cacheKey]

		const incl = getClosest(numbers.slice(1), target - numbers[0])
		const excl = getClosest(numbers.slice(1), target)

		if (!incl && !excl) return undefined
		if (!incl) return excl
		if (!excl) return [numbers[0], ...incl]

		const inclSum = incl.reduce((a: number, c: number) => a + c, numbers[0])
		const exclSum = excl.reduce((a: number, c: number) => a + c, 0)

		cache[cacheKey] = (target - inclSum) < (target - exclSum) ? [numbers[0], ...incl] : excl
		return cache[cacheKey]
	}

	const firstSet = getClosest(nums, halfSum)
	const secondSet = nums.filter(it => !firstSet?.includes(it))
	return [firstSet, secondSet]

}

function partitionWithTabulation(nums: number[]) {
	const halfSum = nums.reduce((a, c) => a + c) / 2
	const lastElement = nums[nums.length - 1]
	let lastPossibilities = new Set<number[]>()
	lastPossibilities.add([])
	lastPossibilities.add([lastElement])
	let bestPossibility: number[] = []
	let bestPossibilitySum = 0

	for (let i = nums.length - 2; i >= 0; i--) {
		const num = nums[i]
		lastPossibilities = new Set([...lastPossibilities].flatMap(p => ([p, [num, ...p]])))

	}

	lastPossibilities.forEach(p => {
		const sum = p.reduce((a, c) => a + c, 0)
		if (sum < halfSum && sum > bestPossibilitySum) {
			bestPossibility = p
		}
	})

	const firstSet = bestPossibility
	const secondSet = nums.filter(it => !firstSet?.includes(it))
	return [firstSet, secondSet]
}

console.log(partition([5, 10, 15, 20, 25]))
console.log(partition([1, 2, 3, 5, 13, 14]))

console.time()
console.log(partition([5, 10, 15, 20, 25]))
console.log(partition([1, 2, 3, 5, 13, 14]))
console.timeEnd()

console.time()
console.log(partitionWithTabulation([5, 10, 15, 20, 25]))
console.log(partitionWithTabulation([1, 2, 3, 5, 13, 14]))
console.timeEnd()

console.time()
console.log(partitionWithDp([5, 10, 15, 20, 25]))
console.log(partitionWithDp([1, 2, 3, 5, 13, 14]))
console.timeEnd()



