var tableValue = [];
function generateTableValue(numV) {
	tableValue = []; /* reset value */
	var range = Math.pow(2, numV);
	for (var i = 0; i < range; i++) {
		tableValue.push([]);
	}

	for (var i = 0; i < numV; i++) {
		var times = Math.pow(2, i);
		var k = 0;
		while (times) {
			for (var j = 0; j < range / Math.pow(2, i + 1); j++) {
				tableValue[k++].push(true);
			}
			for (var j = 0; j < range/ Math.pow(2, i + 1); j++) {
				tableValue[k++].push(false);
			}
			times -= 1;
		}
	}
	return tableValue;
}
