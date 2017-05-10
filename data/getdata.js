// For future use
var data = {};
$.ajax({
	url: "https://spreadsheets.google.com/feeds/list/1JTLivI7FDB0HeHIX0GePMLJd4bD-xarH3ZpNxPCX218/9/public/basic?alt=json",
	success: function(result) {
		data = JSON.parse(result);
	}
});