function search(nums: number[], x: number) {
	if (nums.length == 1) return nums[0] == x
	if (!nums.length) return false

	const midPoint = Math.floor(nums.length / 2)
	const midElement = nums[midPoint]
	if (midElement == x) return true
	else if (midElement < x) return search(nums.slice(midPoint + 1), x)
	else return search(nums.slice(0, midPoint), x)
}


console.log(
	search([2, 4, 5, 7, 8, 9, 15, 34, 36, 45], 1),
	search([2, 4, 5, 7, 8, 9, 15, 34, 36, 45], 5),
	search([2, 4, 5, 7, 8, 9, 15, 34, 36, 45], 36)
)