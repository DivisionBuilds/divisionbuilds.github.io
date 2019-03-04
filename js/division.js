---
---
{% assign a = '|' | split: '|' %}
{% assign path = '/img/' %}
{% assign pathlength = path | size %}
{% for f in site.static_files %}
	{% assign p = f.path | slice: 0, pathlength %}
	{% if p == path and f.extname == '.jpg'or f.extname == '.jpeg' or f.extname == '.png' %}
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
	$(".banner .close").click(function() {
		$(this).parents('.banner').remove();
   });
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

Object.defineProperty(Array.prototype, "get", {
	value: function(i = 0) {
		if (i < 0) return this[this.length + i];
		else return this[i];
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

Object.defineProperty(Math, "factorial", {
	value: function(n = 0) {
		for (var i = n; i > 1; i--) {
			n *= i - 1;
		}
		return n;
	},
	configurable: true,
	enumberable: false
});

Object.defineProperty(Math, "binomial", {
	value: function(n = 0, k = 0) {
		function f(n) {
			for (var i = n; i > 1; i--) {
				n *= i - 1;
			}
			return n;
		}
		return f(n) / (f(k) * f(n - k));
	},
	configurable: true,
	enumberable: false
});