var myTree = null;
var oNode = null;
var gNode = [];    // Track node location
var vCount = 0;    // Track number of variables
var pCount = 0;    // Track number of paratheses
var oFlag = false; // Operator
function parse (text) {
	/* For there shall be no error */
	/* Under Construction
	for (var i = 0; i < text.length; i++) {
		if (text[i] in Operator) {
			addOperator(text[i]);
		} else if (text[i] == "p") {
			addVariable(text[i]);
			while (!isNaN(text[i++]));
			i--;
		} else if (text[i] == "(") {
			pCount++;
			for (var j = i + 1; j < text.length; j++) {
				if (text[j] == "(") {
					pCount++;      // Increment counter
				} else if (text[j] == ")") {
					pCount--;      // Decrement counter
				}
				if (pCount == 0) { // Found the closing paratheis
					if (j == text.length - 1) {
						break;
					}
					if (myTree == null) {
						addOperator(text[j+1]);
						break;
					}
				}
			}
			gNode.push(oNode);
		} else if (text[i] == ")") {
			gNode.pop();
		}
	}
	*/
}
function addOperator(val) {
	if (gNode.length > 0) {
		if (oFlag) {
			addOperatorByPrecedence(oNode, val);
		} else {
			addOperatorByPrecedence(gNode[-1], val);
		}
	} else {
		if (myTree == null) {
			myTree = new Tree(new TreeNode(val));
			oNode = myTree.head;
		} else {
			if (oNode) {
				if (oFlag) {
					addOperatorByPrecedence(oNode, val);	
				} else if (Operator[val].precedence >= Operator[myTree.head.val].precedence) {
					myTree.push(new TreeNode(val));
					oNode = myTree.head;
				} else {
					myTree.branch(oNode, new TreeNode(val));
					oNode = oNode.rightNode;
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
	if (head == null) {
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
	} else {
		if (Operator[val].precedence >= Operator[oNode.val].precedence) {
			myTree.branch(oNode, new TreeNode(val));
			oNode = oNode.rightNode;
		} else {
			oNode = new TreeNode(val);
			myTree.branch(head, oNode);
		}
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
