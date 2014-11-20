/* Adjust Font Size [Begin] */
function resizeButtonFontSize() {
	var w = parseInt($("#truth-table #row-buttonA input, #truth-table #row-buttonB input").css('width'));
	var h = parseInt($("#truth-table #row-buttonA input, #truth-table #row-buttonB input").css('height'));

	$("#truth-table #row-buttonA input, #truth-table #row-buttonB input").css("font-size", (Math.min(w, h) * 0.7).toString() + "px");
}
function resizeSpanFontSize() {
	var h = parseInt($("#truth-table #row-display #text-display").css('height'));
	$("#truth-table #row-display #text-display").css('font-size', (h* 0.5).toString() + "px");
}
$(window).bind('resize', function() {
	resizeButtonFontSize();
	resizeSpanFontSize();
});
resizeButtonFontSize();
resizeSpanFontSize();
/* Adjust Font Size [End] */

/* Blink Blink [Begin] */
function startBlink() {
	$("#blink").css('color','white');
	$("#blink").css('background','black');
	setTimeout(stopBlink,500)
}
function stopBlink() {
	$("#blink").css('color','black');
	$("#blink").css('background','white');
	setTimeout(startBlink,500)
}

$('<span id = "blink" class="blank">_</span>').appendTo("#text-display");
startBlink();
/* Blink Blink [End] */

$("#group").click(function () {
	$("#blink").before('<span class="' + getPairNumber() + '">(</span>');
	$("#blink").before('<span class="' + getPairNumber() + '">)</span>');
});
$("#left").click(function () {
	var spans = $("#text-display span");
	for (var i = 0; i < spans.length; i++) {
		if (spans[i].id == "blink" && i != 0) {
			spans[i-1].id = "blink";
			spans[i].id = "";
			spans[i].style["color"] = "black";
			spans[i].style["background"] = "white";
			return;
		}
	}
});
$("#right").click(function () {
	var spans = $("#text-display span");
	for (var i = 0; i < spans.length; i++) {
		if (spans[i].id == "blink" && i != (spans.length - 1)) {
			spans[i+1].id = "blink";
			spans[i].id = "";
			spans[i].style["color"] = "black";
			spans[i].style["background"] = "white";
			return;
		}
	}
});

function getPairNumber() {
	if (this.number == null) {
		this.number = 0;
	} else {
		this.number += 0.5;
	}
	return Math.floor(this.number).toString();
}
