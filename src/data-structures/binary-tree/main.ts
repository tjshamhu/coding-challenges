class TreeNode {
	left?: TreeNode = undefined
	right?: TreeNode = undefined
	constructor(public val: number) {}
}
const one = new TreeNode(1)
const two = new TreeNode(2)
const three = new TreeNode(3)
const four = new TreeNode(4)
const five = new TreeNode(5)
const six = new TreeNode(6)

one.left = two
one.right = three
two.left = four
two.right = five
three.right = six

//       1
//     /   \
//   2      3
//  / \      \
// 4   5      6

const bfs = (node: TreeNode, skip?: number): number[] => {
	if (!node) return []

	const leftbfs = node.left ? bfs(node.left, node.left.val) : [] // [d, e]
	const rightbfs = node.right ? bfs(node.right, node.right.val) : [] // [f]

	const ans = []
	node.val != skip && ans.push(node.val)
	node.left && ans.push(node.left.val)
	node.right && ans.push(node.right.val)

	return [...ans, ...leftbfs, ...rightbfs]
}

const dfs = (node: TreeNode): number[] => {
	if (!node) return []

	const leftDepth = node.left && dfs(node.left) || [] // [b, d, e]
	const rightDepth = node.right && dfs(node.right) || [] // [c, f]

	return [node.val, ...leftDepth, ...rightDepth]
}

const dfsWithStack = (node: TreeNode): number[] => {
	if (!node) return []
	const ans = []
	const stack = [node]
	while (stack.length) {
		const curr = stack.pop()!
		curr.right && stack.push(curr.right)
		curr.left && stack.push(curr.left)
		ans.push(curr.val)
	}
	return ans
}

const bfsWithQueue = (node: TreeNode): number[] => {
	if (!node) return []
	const ans = []
	const queue = [node]
	while (queue.length) {
		const curr = queue.shift()!
		curr.left && queue.push(curr.left)
		curr.right && queue.push(curr.right)
		ans.push(curr.val)
	}
	return ans
}

const treeSum = (node?: TreeNode): number => {
	if (!node) return 0
	return node.val + treeSum(node.left) + treeSum(node.right)
}

const treeMin = (node?: TreeNode): number => {
	if (!node) return Infinity
	return Math.min(node.val, treeMin(node.left), treeMin(node.right))
}

const maxPathSum = (node?: TreeNode): number => {
	if (!node) return 0
	return node.val + Math.max(maxPathSum(node.left), maxPathSum(node.right))
}

console.log(dfs(one), 'dfs')
console.log(dfsWithStack(one), 'dfsWithStack')
console.log(bfs(one), 'bfs')
console.log(bfsWithQueue(one), 'bfsWithQueue')
console.log(treeSum(one), 'treeSum')
console.log(treeMin(one), 'treeMin')
console.log(maxPathSum(one), 'maxPathSum')