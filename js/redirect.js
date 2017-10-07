$(document).ready(function() {
    var s = window.location.search;
    if (s.length === 0) {
        core.alert("Redirection Error", "Build file not found.");
    }
    else {
    	var id = "";
        $.each(s.slice(1).split("&"), function() {
            if (this.split("=")[0] == "id")
            	id = this.split("=")[1];
        });
        var a = id.split("-")[0],
        	b = id.split("-").slice(1).join("-"),
			href = window.location.href.split("/"),
			base = href.slice(0, href.length - 1).join("/"),
			link = base + "/build/" + a + "/" + b;
		console.log(link);
		core.alert("Redirecting...", "<a href='" + link + "'>Click here if it does not work.</a>");
		window.location.replace(link + window.location.hash);
    }
});