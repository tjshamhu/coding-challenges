class ListNode {
	public next: ListNode | undefined
	public prev: ListNode | undefined
	constructor(public val: number) {
	}
}

const one = new ListNode(1)
const two = new ListNode(2)
const three = new ListNode(3)
const four = new ListNode(4)
const five = new ListNode(5)
const six = new ListNode(6)

one.next = two
two.next = three
three.next = four
four.next = five
five.next = six

// 1 -> 2 -> 3 -> 4 -> 5 -> 6

const reverseList = (node: ListNode): ListNode => {
	if (!node || !node.next) return node
	const tail = reverseList(node.next)
	node.next.next = node
	node.next = undefined
	return tail
}

console.log(reverseList(one))


one.next = three
three.next = five
five.next = undefined

two.next = four
four.next = six
six.next = undefined

// 1 -> 3 -> 5
// 2 -> 4 -> 6

const mergeTwoSortedLists = (node1?: ListNode, node2?: ListNode): ListNode | undefined => {
	if (!node1 && !node2) return undefined
	if (!node1 && node2) return node2
	if (!node2 && node1) return node1

	if (node1!.val > node2!.val) {
		node2!.next = mergeTwoSortedLists(node1, node2!.next)
		return node2
	}

	if (node1!.val < node2!.val) {
		node1!.next = mergeTwoSortedLists(node1!.next, node2)
		return node1
	}
}

console.log(mergeTwoSortedLists(one, two))
