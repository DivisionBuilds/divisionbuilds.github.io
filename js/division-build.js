$(document).ready(function() {
    var s = window.location.search;
    if (s.length === 0) {
        core.alert("Error loading build data", "No build id specified")
    }
    else {
        $.each(s.slice(1).split("&"), function() {
            if (this.split("=")[0] === "id")
            	build.loadFile(this.split("=")[1]);
        });
        $(".tab-bar-item").click(function() {
            build.showpage($(this).text());
        });
        build.showpage(window.location.hash.slice(1).toLowerCase());
    }
});
var build = {
	showpage: function(page) {
	    $(".selected").removeClass("selected");
	    $(".build-content .visible").removeClass("visible");
	    let e = $(".tab-bar-item:contains(" + page.capitalize() + ")");
	    if (e.length === 1) {
	        e.addClass("selected");
	        $(".build-content ." + page.toLowerCase()).addClass("visible");
	        window.location.hash = page.toLowerCase();
	    }
	    else {
	        $(".tab-bar-item:contains(Weapons)").addClass("selected");
	        $(".build-content .weapons").addClass("visible");
	    }
	},
	loadURL: function(url) {
		$.ajax({
	        url: url,
	        success: function(result) {
	            build.loadData(JSON.parse(result));
	        },
	        error: function(jqXHR, exception) {
	            var msg = '';
	            if (jqXHR.status === 0) {
	                msg = 'Not connect.\n Verify Network.';
	            }
	            else if (jqXHR.status == 404) {
	                msg = 'Requested page not found. [404]';
	            }
	            else if (jqXHR.status == 500) {
	                msg = 'Internal Server Error [500].';
	            }
				else if (exception === 'parsererror') {
	                msg = 'Requested JSON parse failed.';
	            }
				else if (exception === 'timeout') {
	                msg = 'Time out error.';
	            }
				else if (exception === 'abort') {
	                msg = 'Ajax request aborted.';
	            }
				else {
					msg = 'Uncaught Error.\n' + jqXHR.responseText;
	            }
				core.alert("Error loading build data", msg);
	        }
	    });
	},
	loadFile: function(file) {
		build.loadURL("https://raw.githubusercontent.com/DivisionBuilds/divisionbuilds.github.io/master/builds/" + file + ".json")
	},
	loadData: function(d) {
	    document.title = d.title + " - " + document.title;
	    $("meta[name=description]").attr("content", d.title + " by " + d.author);
	    $(".build-header .title").text(d.title);
	    $(".build-header .author").text(d.author);
	    if (d.hasOwnProperty("link"))
	        $(".build-header .info a").attr("href", d.link);
	    if (d.hasOwnProperty("patch"))
	        $(".build-header .date").before(" for Patch " + d.patch);
	    if (d.hasOwnProperty("date"))
	        $(".build-header .date").text("Last updated: " + d.date);
	    $.each(d.build, function(key) {
	        var p = key;
	        $.each(this, function(key) {
	            var k = key;
	            if (k === "items") {
	                $.each(this, function(key, value) {
	                    var t = key;
	                    $.each(this, function(key, value) {
	                        if (key === "type")
	                            $(".build-content .gear .items ." + t + " .icon").addClass(value);
	                        else if (key === "icon")
	                            $(".build-content .gear .items ." + t + "> .icon").addClass(value);
	                        else if ($.isArray(value))
	                        	$(".build-content .items ." + t + " ." + key).text(value.join(", "));
	                        else
	                            $(".build-content .gear .items ." + t + " ." + key).text(value);
	                    });
	                });
	            }
	            else if (k === "stats") {
	                $.each(this, function(key, value) {
	                    var t = key;
	                    $.each(this, function(key, value) {
	                    	if ($.isArray(value)) {
	                    		a = '<div class="text">' + value[1] + '</div>';
	                        	value = value[0];
	                        }
	                        else
	                        	a = "";
	                        if (t === "main-stats")
	                        	v = value + " Roll";
	                        else
	                        	v = (value.name || value) + " Mod";
	                        var s = '<div class="' + t + '"><div class="amount">' + key + '</div><div class="icon ' + (value.icon || value.classify()) + '"></div><div class="info"><div class="name">' + v + '</div>' + a + '</div></div>';
	                        $(".build-content .gear .stats").append(s);
	                    });
	                });
	            }
	            else {
	                $.each(this, function(key, value) {
	                    if (key === "talents") {
	                        $(".build-content .weapons ." + k + " .talents").text(value.join(", "));
	                        $(".build-content .weapons ." + k + " .talent-icons .icon").each(function(i) {
	                        	$(this).addClass(value[i].classify());
	                        });
	                    }
	                    else if (key === "mods") {
	                    	$.each(this, function(key, value) {
	                    		for (i = 0; i < value.length; i++) {
	                    			$(".build-content .weapons ." + k + " ." + key + " .rolls").append("<span>" + value[i] + "</span>");
	                    		}
	                    	});
	                    }
	                    else if (key === "icon")
	                        $(".build-content ." + p + " ." + k + "> .icon").addClass(value);
	                    else if (key === "mod") {
	                    	$(".build-content ." + p + " ." + k + " .mod").text(value);
	                    	$(".build-content ." + p + " ." + k + " .icon").addClass(value.classify());
	                    }
	                    else
	                        $(".build-content ." + p + " ." + k + " ." + key).text(value);
	                });
	            }
	        });
	    });
	}
};
