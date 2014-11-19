var Operator = {
	"D": {
		eval: function(a, b) {
			return a || b;
		},
		precedence: 3
	},
	"C": {
		eval: function(a, b) {
			return a && b;
		},
		precedence: 2
	},
	"N": {
		eval: function(a, b) {
			return !b;
		},
		precedence: 1
	},
	"K": {
		eval: function(a, b) {
			return !a || b;
		},
		precedence: 4
	},
	"B": {
		eval: function(a, b) {
			return a === b;
		},
		precedence: 5
	}
}
