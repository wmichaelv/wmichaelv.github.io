var myTree = null;
var oNode = null;
var gNode = [];    // Track node location
var vCount = 0;    // Track number of variables
var pCount = 0;    // Track number of paratheses
var oFlag = false; // Operator
var start = 0;     // Start SubstringLocation

function parse (text) {
	/* For there shall be no error */
	/* Under construction
	for (var i = 0; i < text.length; i++) {
		if (text[i] in Operator) {
			addOperator(text[i]);
		} else if (text[i] == "p") {
			start = i;
			while (!isNaN(text[i++]));
			i--;
			addVariable(text.substr(start, i - start);
		} else if (text[i] == "(") {
			start = i + 1;
			pCount++;
			while (pCount != 0) {
				i++;
				if (text[i] == ")") pCount--;
				if (text[i] == "(") pCount++;
			}
			addGroup(text.substr(start, i - start));
		}
	}
	*/
}

function addOperator(val) {
	if (myTree == null) {
		initTree(val);
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
	oFlag = true;
}
function addOperatorByPrecedence(head, val) {
	if (head == null) {
		if (myTree == null) {
			initTree(val);
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
function addGroup(val) {

}
function addVariable(val) {
	if (oFlag) {
		oNode.rightNode = new TreeNode(val);
	} else {
		initTree(val);
	}
	oFlag = false;
}
function initTree(val) {
	myTree = new Tree(new TreeNode(val));
	oNode = myTree.head;
}
