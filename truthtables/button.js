/* Adjust Font Size [Begin] */
function resizeButtonFontSize() {
	var w = parseInt($("#truth-table #row-buttonA input, #truth-table #row-buttonB input").css('width'));
	var h = parseInt($("#truth-table #row-buttonA input, #truth-table #row-buttonB input").css('height'));

	$("#truth-table #row-buttonA input, #truth-table #row-buttonB input").css("font-size", (Math.min(w, h) * 0.7).toString() + "px");
}
function resizeSpanFontSize() {
	var h = parseInt($("#truth-table #row-display #text-display").css('height'));
	$("#truth-table #row-display #text-display").css('font-size', (h* 0.25).toString() + "px");
}
$(window).bind('resize', function() {
	resizeButtonFontSize();
	resizeSpanFontSize();
});
resizeButtonFontSize();
resizeSpanFontSize();
/* Adjust Font Size [End] */

/* Blink Blink [Begin] */
function blinkAnimation() {
    $("#blink").animate({
        opacity: 0
    }, 'fast', 'swing').animate({
        opacity: 1
    }, 'fast', 'swing');
}

$('<span id = "blink" class="blank">|</span>').appendTo("#text-display");
setInterval ('blinkAnimation()', 600);
/* Blink Blink [End] */

/* Row-ButtonA [Begin] */
$("#p").click(function () {
	$("#blink").before('<span class="pVar">p' + getVariableCode() + '</span>');

	/* Refresh the number */
	var pVar = $(".pVar");
	for (var i = 0; i < pVar.length; i++) {
		pVar[i].innerHTML = "p" + i.toString();
	}
});
$("#left").click(function () {
	if ($("#text-display span")[0].id == "blink") {
		return;
	}
	for (var spans = $("#text-display span"); spans.length != 0; spans = spans.nextAll()) {
		if (spans.length < 2) {
			return;
		}
		if (spans[1].id == "blink") {
			spans.first().before(spans.next().first().remove());
			return;
		}
	}
});
$("#right").click(function () {
	for (var spans = $("#text-display span"); spans.length != 0; spans = spans.nextAll()) {
		if (spans.length < 2) {
			return;
		}
		if (spans[0].id == "blink") {
			spans.next().first().after(spans.first().remove());
			return;
		}
	}
});
/* Row-ButtonA [End] */

/* Row-ButtonB [Begin] */
$("#and").click(function () {
	$("#blink").before('<span class="' + getBarCode() + '">C</span>');
});
$("#or").click(function () {
	$("#blink").before('<span class="' + getBarCode() + '">D</span>');
});
$("#neg").click(function () {
	$("#blink").before('<span class="' + getBarCode() + '">N</span>');
});
$("#ift").click(function () {
	$("#blink").before('<span class="' + getBarCode() + '">K</span>');
});
$("#ifif").click(function () {
	$("#blink").before('<span class="' + getBarCode() + '">B</span>');
});
$("#group-left").click(function () {
	$("#blink").before('<span class="' + getBarCode() + '">(</span>');
});
$("#group-right").click(function () {
	$("#blink").before('<span class="' + getBarCode() + '">)</span>');
});
/* Row-ButtonB [End] */

function getBarCode() {
	if (getBarCode.number == null) {
		getBarCode.number = 10231241231;
	} else {
		getBarCode.number += 1;
	}
	return getBarCode.number.toString();
}
function getVariableCode() {
	if (getVariableCode.number == null) {
		getVariableCode.number = 0;
	} else {
		getVariableCode.number += 1;
	}
	return getVariableCode.number.toString();
}
function reduceVariableCode(n) {
	/* Refresh the number */
	var pVar = $(".pVar");
	for (var i = n + 1; i < pVar.length; i++) {
		pVar[i].innerHTML = "p" + i.toString();
	}
	getVariableCode.number -= 1;
}
