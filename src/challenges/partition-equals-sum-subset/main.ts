function partition(nums: number[]) {
	const totalSum = nums.reduce((a, c) => a + c)
	if (totalSum % 2) return false
	const half = totalSum / 2

	function findTarget(numsArr: number[], target: number): boolean {
		if (numsArr.length == 1) return numsArr[0] == target
		return findTarget(numsArr.slice(1), target-numsArr[0]) || findTarget(numsArr.slice(1), target)
	}

	function findSubArrays(numsArr: number[], target: number): number[] | null {
		if (numsArr.length == 1)
			return numsArr[0] == target ? [numsArr[0]] : null
		const incl = findSubArrays(numsArr.slice(1), target-numsArr[0])
		const excl = findSubArrays(numsArr.slice(1), target)
		return incl ? [numsArr[0], ...incl] : excl
	}

	return findSubArrays(nums, half)
}


console.log(partition([1, 7, 13, 5]))