const input = [1, 2, 3, 4, 5, 6, 7, 8, 9]

class TreeNode {
	left?: TreeNode = undefined
	right?: TreeNode = undefined
	constructor(public val: number) {}
}

const arrayToTree = (input: number[]) => {
	if (!input.length) return undefined

	const middleIndex = Math.floor(input.length / 2)
	const middleValue = input[middleIndex]
	const node = new TreeNode(middleValue)
	node.left = arrayToTree(input.slice(0, middleIndex))
	node.right = arrayToTree(input.slice(middleIndex + 1))
	return node
}

console.log(arrayToTree(input))