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

$("#group").click(function () {
	$("#blink").before('<span class="' + getPairNumber() + '">(</span>');
	$("#blink").before('<span class="' + getPairNumber() + '">)</span>');
});
$("#left").click(function () {
	var spans = $("#text-display span");
	for (var i = 0; i < spans.length; i++) {
		if (spans[i].id == "blink" && i != 0) {
			$("#text-display span")[i-1].before(spans[i]);
			return;
		}
	}
});
$("#right").click(function () {
	var spans = $("#text-display span");
	for (var i = 0; i < spans.length; i++) {
		if (spans[i].id == "blink" && i != (spans.length - 1)) {
			$("#text-display span")[i+1].after(spans[i]);
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
