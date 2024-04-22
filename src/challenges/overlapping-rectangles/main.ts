const rectangles = [
	{
		'top_left': [1, 4],
		'dimensions': [3, 3]
	},
	{
		'top_left': [-1, 3],
		'dimensions': [2, 1]
	},
	{
		'top_left': [0, 5],
		'dimensions': [4, 3]
	}
]

type Rectangle = typeof rectangles[number]

function getEdges(rectangle: Rectangle) {
	return {
		top: rectangle.top_left[1],
		right: rectangle.top_left[0] + rectangle.dimensions[1],
		bottom: rectangle.top_left[0] - rectangle.dimensions[0],
		left: rectangle.top_left[0],
	}
}

function getCorners(rectangle: Rectangle) {
	const {top, left, right, bottom} = getEdges(rectangle)
	return {
		topLeft: [left, top],
		topRight: [right, top],
		bottomRight: [right, bottom],
		bottomLeft: [left, bottom],
	}
}

function coordinateFallsWithinRectangle(coordinate: number[], rectangle: Rectangle) {
	const edges = getEdges(rectangle)
	return coordinate[0] > edges.left && coordinate[0] < edges.right && coordinate[1] > edges.bottom && coordinate[1] < edges.top
}

function encompasses(rectangle1: Rectangle, rectangle2: Rectangle) {
	const rectangle1Edges = getEdges(rectangle1)
	const rectangle2Edges = getEdges(rectangle2)

	const largerRectangle = rectangle1Edges.top >= rectangle2Edges.top ? rectangle1Edges : rectangle2Edges
	const smallerRectangle = rectangle1Edges.top >= rectangle2Edges.top ? rectangle2Edges : rectangle1Edges

	console.log({largerRectangle, smallerRectangle})

	return largerRectangle.top >= smallerRectangle.top &&
		largerRectangle.bottom <= smallerRectangle.bottom &&
		largerRectangle.left <= smallerRectangle.left &&
		largerRectangle.right >= smallerRectangle.right;
}

function overlaps(rectangle1: Rectangle, rectangle2: Rectangle) {
	if (encompasses(rectangle1, rectangle2))
		return true

	const rectangle1Corners = getCorners(rectangle1)
	for (const corner of Object.values(rectangle1Corners)) {
		if (coordinateFallsWithinRectangle(corner, rectangle2))
			return true
	}

	const rectangle2Corners = getCorners(rectangle2)
	for (const corner of Object.values(rectangle2Corners)) {
		if (coordinateFallsWithinRectangle(corner, rectangle1))
			return true
	}
	return false
}

function listContainsAnyOverlap(rectangles: Array<Rectangle>) {
	for (let x = 0; x < rectangles.length; x++) {
		for (let y = x + 1; y < rectangles.length; y++) {
			if (overlaps(rectangles[x], rectangles[y])) {
				return true
			}
		}
	}
	return false
}

console.log(listContainsAnyOverlap(rectangles))