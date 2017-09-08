$(document).ready(function() {
	var img = [
		"https://images4.alphacoders.com/773/773361.jpg",
		"https://images7.alphacoders.com/602/602603.jpg",
		"https://images5.alphacoders.com/676/676538.jpg",
		"https://images8.alphacoders.com/605/605515.jpg",
		"https://images4.alphacoders.com/601/601859.jpg",
		"https://images8.alphacoders.com/714/714365.jpg",
		"https://images6.alphacoders.com/600/600931.jpg",
		"https://images8.alphacoders.com/527/527385.jpg",
		"https://images2.alphacoders.com/527/527383.png",
		"https://images.alphacoders.com/618/618045.jpg",
		"https://images4.alphacoders.com/601/601859.jpg"
	];
	$("head").append("<style>body::after{background-image:url(" + img[Math.floor(Math.random() * img.length)] + ");}</style>");
	$(".beta").click(function() {
		core.modal("DivisionBuilds.github.io is in BETA", "<p>This website is still work in progress. If you encounter any issues, please submit them!</p><p>If you want to know more about the development process, join the <a href='https://discord.me/divisionbuilds'>DivisionBuilds Discord</a> check out <a href='https://twitter.com/Division_Builds'>@Division_Builds</a> on Twitter.");
	});
	if ($(".tooltip").length > 0)
		tooltips.follow(true);
});

// CORE FUNCTIONS
var core = {
	alert: function(title, msg) {
		$(".back-button").hide();
		if ($(".main .error").length === 0) {
			$(".main").children().hide();
    		$(".main").append("<div class='error'><div class='error-title'>" + title + "</div><div class='error-content'>" + msg + "</div></div>");
    	}
    	else {
    		$(".main > :not(.error)").hide();
    		$(".error .error-title").html(title);
    		$(".error .error-content").html(msg);
    	}
	},
	modal: function(title, text, opacity = .1) {
		$("body > :not(.footer)").css({opacity: opacity, "pointer-events": "none"});
		$("body").append('<div class="modal-wrapper"><div class="backdrop"></div><div class="modal"><div class="close"><svg fill="#FFFFFF" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></div><h1>' + title + '</h1><p>' + text + '</p></div></div>');
		$(".modal .close, .modal-wrapper .backdrop").click(function() {
			$(".modal-wrapper").remove();
			$("body > :not(.footer)").css({opacity: "", "pointer-events": ""});;
		});
	}
};

// TOOLTIP FUNCTIONS
var tooltips = {
	follow: function(a) {
		if (a) {
			$(document).off("mousemove");
			$(document).mousemove(function(e) {
				$(".tooltip").css({top: e.clientY, left: e.clientX});    		
			});
		}
		else $(document).off("mousemove");
	}
};

// JS UTILS
// Source: github.com/Zerthox/JS-Utils
Object.defineProperty(String.prototype, "capitalize", {
	value: function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	},
	configurable: true,
	enumberable: false
});

Object.defineProperty(String.prototype, "classify", {
	value: function() {
	    return this.toLowerCase().replace(/ /g, "-");
	},
	configurable: true,
	enumberable: false
});

Object.defineProperty(Array.prototype, "last", {
	value: function(i = 0) {
	    return this[this.length - i - 1];
	},
	configurable: true,
	enumberable: false
});

Object.defineProperty(String.prototype, "replaceAll", {
	value: function(s = "", r = "") {
		return this.split(s).join(r);
	},
	configurable: true,
	enumberable: false
});