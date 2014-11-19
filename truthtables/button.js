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
