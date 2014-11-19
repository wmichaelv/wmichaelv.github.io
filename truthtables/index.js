function Stack () {
	this.head = null;
	this.peep = function () {
		return this.head;
	};
	this.push = function (node) {
		if (this.head == null) {
			this.head = node;
		} else {
			node.nextNode = this.head;
			this.head.prevNode = node;
			this.head = node;
		}
	};
	this.pushAt = function (node, location) {
		if (location == 0) {
			this.push(node);
		} else if (location > 0) {
			var head = this.head
		}
	}
	this.pop = function () {
		var returnValue = null;
		if (this.head) {
			returnValue = this.head;
			this.head = this.head.nextNode;
			if (this.head) {
				this.head.prevNode = null;
			}
			returnValue.nextNode = null;
		}
		return returnValue;
	};
	this.popAt = function (location) {
		if (location == 0) {
			return this.pop();
		} else if (location < 0) {
			return null;
		} else {
			var returnValue = this.head;
			for (var i = 0; i < location; i++) {
				returnValue = returnValue.nextNode;
				if (returnValue == null) {
					return returnValue;
				}
			}
			returnValue.prevNode.nextNode = returnValue.nextNode;
			if (returnValue.nextNode) {
				returnValue.nextNode.prevNode = returnValue.prevNode;
			}
			returnValue.nextNode = null;
			returnValue.prevNod = null;
			return returnValue;
		}
	};
}
function Node (ntype, nvalue) {
	/*
	 * node type: - operator
	 *            - variable
	 *            - group
	 */
	this.typeNode = ntype;
	this.valNode = nvalue;
	this.nextNode = null;
	this.prevNode = null;
}
function NodeOperator(ntype) {
	/*
	 * node operator type: - or   -> D
	 *                     - and  -> C
	 *                     - neg  -> N
	 *                     - ift  -> K
	 *                     - ifif -> B
	 */
	this.typeNode = ntype;
}
function NodeVariable(index) {
	this.indexNode = index;
}
