---
---
{% assign a = '|' | split: '|' %}
{% for f in site.static_files %}
	{% if f.path contains '/img/' and f.extname == '.jpg'or f.extname == '.jpeg' or f.extname == '.png' %}
		{% assign a = a | push: f.path %}
	{% endif %}
{% endfor %}

$(document).ready(function() {
	var img = {{a | jsonify}};
	$("head").append("<style>body:after,body::after{background-image:url(" + img[Math.floor(Math.random() * img.length)] + ");}</style>");
	$(".beta").click(function() {
		core.modal("DivisionBuilds.github.io is in BETA", "<p>This website is still work in progress. If you encounter any issues, please submit them!</p><p>If you want to stay informed, follow <a href='https://twitter.com/Division_Builds'>@Division_Builds</a> on Twitter or join the DivisionBuilds Discord: <a href='https://discord.me/divisionbuilds'>discord.me/divisionbuilds</a>");
	});
	if ($(".tooltip").length > 0) {
		tooltips.follow(true);
	}
	if ($(".select").length > 0) {
		core.select();
	}
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
	},
	select: function() {
		$(document).on("click.drop-down", function() {
			$(".select").removeClass("visible");
		});
		$(".select, .select .drop-down").click(function(e){
			e.stopPropagation();
		});
	    $(".select").click(function() {
	    	if ($(this).hasClass("visible")) {
	    		$(this).removeClass("visible");
	    		$(document).off("click.drop-down")
	    	}
	    	else if (!$(this).hasClass("disabled")) {
	    		$(this).addClass("visible");
	    	}
	    });
	    var f = function() {
	    	$(".select").each(function() {
		    	var t = this.getBoundingClientRect().bottom,
		    		d = $(this).children(".drop-down");
		    	if (d.height() > t) {
		    		d.css({height: window.innerHeight - t});
		    	}
		    });
	    };
	    f();
	    $(window).resize(function() {
	    	f();
	    });
	}
};

// TOOLTIP FUNCTIONS
var tooltips = {
	follow: function(a) {
		if (a) {
			$(document).off("mousemove");
			$(document).mousemove(function(e) {
				var y = e.clientY,
					x = e.clientX;
				$(".tooltip").css({top: y, left: x});
				$(".tooltip").each(function() {
					var t = $(this),
						h = t.height(),
						w = t.width();
					if (y + h >= window.innerHeight - 20) {
						t.css({top: window.innerHeight - 20 - h});
					}
					if (x + w >= window.innerWidth - 20) {
						t.css({left: window.innerWidth - 20 - w});
					}
				});
			});
		}
		else {
			$(document).off("mousemove");
		}
	}
};

// BASEID FUNCTIONS
var baseid = {
	alphabet: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
	setalphabet: function(a) {
		baseid.alphabet = a;
	},
	encode: function(a) {
		if (a.constructor === Array) {
			var r = [];
			for (var i = 0; i < a.length; i++) {
				if (a[i] >= baseid.alphabet.length) {
					return null;
				}
				else {
					r.push(baseid.alphabet[a[i]]);
				}
			}
			return r.join("");
		}
		else {
			return baseid.alphabet[a];
		}
	},
	decode: function(a) {
		var r = [],
			s = a.split("");
		for (var i = 0; i < a.length; i++) {
			var o = baseid.alphabet.indexOf(s[i]);
			if (o < 0) {
				return null;
			}
			else {
				r.push();
			}
		}
		return r;
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