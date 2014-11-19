var Operator = {
	"D": {
		eval: function(a, b) {
			return a || b;
		},
		precendence: 3
	},
	"C": {
		eval: function(a, b) {
			return a && b;
		},
		precendence: 2
	},
	"N": {
		eval: function(a, b) {
			return !a;
		},
		precendence: 1
	},
	"K": {
		eval: function(a, b) {
			return !a || b;
		},
		precendence: 4
	},
	"B": {
		eval: function(a, b) {
			return a === b;
		},
		precendence: 5
	}
}
