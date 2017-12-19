$(document).ready(function() {
    $(".tab-bar-item").click(function() {
        build.showpage($(this).text());
	});
	build.showpage(window.location.hash.slice(1).toLowerCase());
});

var build = {
	showpage: function(page) {
	    var e = $(".tab-bar-item:contains(" + page.capitalize() + ")");
	    if (e.length === 1) {
	    	$(".selected").removeClass("selected");
	    	$(".build-content .visible").removeClass("visible");
	        e.addClass("selected");
	        $(".build-content ." + page.toLowerCase()).addClass("visible");
	    }
	}
};