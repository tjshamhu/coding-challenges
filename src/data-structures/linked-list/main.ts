export class ListNode {
	public next: ListNode | undefined
	public prev: ListNode | undefined
	constructor(public val: number) {
	}
}

class MyLinkedList {
	private head: ListNode | undefined
	private tail: ListNode | undefined

	get(index: number): number {
		try {
			const curr = this.getNode(index)
			return curr.val
		} catch {
			return -1
		}
	}

	getNode(index: number): ListNode | undefined{
		if(!this.head)
			return

		let curr: ListNode | undefined = this.head
		for (let i = 0; i < index; i++) {
			curr = curr.next
			if(!curr)
				return
		}
		return curr
	}

	addAtHead(val: number): void {
		const newNode = new ListNode(val)
		if (!this.head) {
			this.head = newNode
			this.tail = newNode
			return
		}
		this.head.prev = newNode
		newNode.next = this.head

		this.head = newNode
	}

	addAtTail(val: number): void {
		if (!this.head)
			return this.addAtHead(val)

		const newNode = new ListNode(val)

		this.tail!.next = newNode
		newNode.prev = this.tail

		this.tail = newNode
	}

	addAtIndex(index: number, val: number): void {
		if (index == 0)
			return this.addAtHead(val)

		const curr = this.getNode(index)
		const newNode = new ListNode(val)

		curr.prev!.next = newNode
		newNode.prev = curr.prev

		newNode.next = curr
		curr.prev = newNode

	}

	deleteAtIndex(index: number): void {
		if (index == 0) {
			this.head = this.head?.next
			return
		}

		const curr = this.getNode(index)
		if (!curr)
			return

		curr.prev!.next = curr.next
		curr.next && (curr.next!.prev = curr.prev)
	}


	printList() {
		const arr = []
		let curr = this.head

		while (curr) {
			arr.push(curr.val)
			curr = curr.next
		}

		return 'List is: ' + arr.join( ' -> ' )
	}
}


  const linkedList = new MyLinkedList()

  linkedList.addAtHead(1)
console.log('Add to head', linkedList.printList())

  linkedList.addAtTail(3)
console.log('Add to tail', linkedList.printList())

  linkedList.addAtIndex(1, 2)
console.log('Add to index', linkedList.printList())

console.log('Get at 1', linkedList.get(1))

  linkedList.deleteAtIndex(1)
console.log('Delete at index 1', linkedList.printList())

console.log('Get at 1', linkedList.get(1))


