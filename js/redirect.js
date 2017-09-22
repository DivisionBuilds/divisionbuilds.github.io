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
			link = a + "/" + b;
		var page = {
			redirect: function(l, d) {
				var href = window.location.href.split("/"),
					base = href.slice(0, href.length - 1).join("/"),
					e = true;
				for (var i = 0; i < d.length; i++) {
					link = base + "/build/" + d[i] + "/" + l;
					console.log(link);
					if (page.test(link)) {
						core.alert("Redirecting...", "<a href='" + link + "'>Click here if it does not work.</a>");
						e = false;
						window.location.replace(link + window.location.hash);
						break;
					}
				}
				if (e)
					core.alert("Redirection Error", "Build file not found.");
			},
			test: function(url) {
				var r = false;
				$.ajax({
			        type: "GET",
			        url: url,
			        async: false,
			        success: function() {
			        	r = true;
			        }
			    });
			    return r;
			}
		};
		page.redirect(link, ["1.7", "1.6"]);
    }
});