var myTree = null;
var oNode = null;
var gNode = [];
var vCount = 0;
var oFlag = false;
function parse (text) {
	/* For there shall be no error */
	for (var i = 0; i < text.length; i++) {
		if (text[i] in Operator) {
			addOperator(text[i]);
		} else if (text[i] == "p") {
			addVariable(text[i]);
			while (!isNaN(text[i++]));
			i--;
		} else if (text[i] == "(") {
			gNode.push(oNode);
		} else if (text[i] == ")") {
			gNode.pop();
		}
	}
}
function addOperator(val) {
	if (gNode.length > 0) {
		addOperatorByPrecedence(gNode[-1], val);
	} else if (oFlag) {
		addOperatorByPrecedence(oNode, val);
	} else {
		if (myTree == null) {
			myTree = new Tree(new TreeNode(val));
			oNode = myTree.head;
		} else {
			if (myTree.head.val in Operator) {
				if (Operator[val].precedence >= Operator[myTree.head.val].precedence) {
					myTree.push(new TreeNode(val));
					oNode = myTree.head;
				} else {
					oNode = new TreeNode(val);
					myTree.branch(head, oNode);
				}
			} else {
				myTree.push(new TreeNode(val));
				oNode = myTree.head;
			}
		}
	}
	oFlag = true;
}
function addOperatorByPrecedence(head, val) {
	if (Operator[val].precedence >= Operator[oNode.val].precedence) {
		myTree.branch(oNode, new TreeNode(val));
		oNode = oNode.rightNode;
	} else {
		oNode = new TreeNode(val);
		myTree.branch(head, oNode);
	}
}
function addVariable(val) {
	if (oFlag) {
		oNode.rightNode = new TreeNode("p" + (vCount).toString());
	} else {
		oNode = new TreeNode("p" + (vCount).toString());
		myTree = new Tree(oNode);
	}
	vCount++;
	oFlag = false;
}
