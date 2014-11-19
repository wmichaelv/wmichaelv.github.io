function Tree (node) {
	this.head = node;
	this.push = function (node) {
		node.leftNode = this.head;
		this.head = node;
	};
	this.branch = function (head, node) {
		node.leftNode = head.rightNode;
		head.rightNode = node;
	};
	this.find = function (node, identifier) {
		if (node.identifier == identifier) {
			return node;
		} else {
			if (node.leftNode != null) {
				this.find(node.leftNode, identifier);
			}
			if (node.rightNode != null) {
				this.find(node.rightNode, identifier);	
			}
		}
	};
}
function TreeNode (value) {
	this.identifier = value;
	this.val = value;
	this.leftNode = null;
	this.rightNode = null;
}
