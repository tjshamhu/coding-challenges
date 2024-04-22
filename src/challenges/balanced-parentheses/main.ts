function isBalanced(str: string): boolean {
	const stack: string[] = []
	for (const char of str) {
		if (char == '(' || char == '*') {
			stack.push(char)
			continue
		}
		if (char == ')') {
			const lastChar = stack[stack.length - 1]
			if (lastChar == '(' || lastChar == '*') continue
			else return false
		}
	}
	return true
}


console.log(isBalanced('(()*'))
console.log(isBalanced('(*)'))
console.log(isBalanced(')*('))
console.log(isBalanced('(**()'))