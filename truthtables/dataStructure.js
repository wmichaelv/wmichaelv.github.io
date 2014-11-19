function Stack () {
	this.head = null;
	this.vCount = 0;
	this.length = 0;
	this.peep = function () {
		return this.head;
	};
	this.push = function (node) {
		if (NodeVariable.prototype.isPrototypeOf(node)) {
			vCount++;
		}
		if (this.head == null) {
			this.head = node;
		} else {
			node.nextNode = this.head;
			this.head.prevNode = node;
			this.head = node;
		}
		this.length++;
	};
	this.pushAt = function (node, location) {
		if (location > 0 && location < this.length) {
			var prevHead = null;
			var head = this.head;
			for (var i = 1; i < location; i++) {
				prevHead = head;
				head = head.nextNode;
			}
			prevHead.nextNode = node;
			node.prevNode = prevHead;
			if (head != null) {
				head.prevNode = node;
				node.nextNode = head;
			}
			if (NodeVariable.prototype.isPrototypeOf(node)) {
				vCount++;
			}
		} else if (location == 0) {
			this.push(node);
		}
	};
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
	 */
	this.typeNode = ntype;
	this.valNode = nvalue;
	this.nextNode = null;
	this.prevNode = null;
}
function NodeOperator (ntype) {
	/*
	 * node operator type: - or   -> D
	 *                     - and  -> C
	 *                     - neg  -> N
	 *                     - ift  -> K
	 *                     - ifif -> B
	 */
	this.typeNode = ntype;
	this.front = (ntype == "N");
}
function NodeVariable (index) {
	this.indexNode = index;
}
