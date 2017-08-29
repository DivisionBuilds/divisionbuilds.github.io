// For future use
var data = {};
$.ajax({
	url: "https://spreadsheets.google.com/feeds/list/1JTLivI7FDB0HeHIX0GePMLJd4bD-xarH3ZpNxPCX218/9/public/basic?alt=json",
	success: function(result) {
		data.gear = result;
	}
});
$.ajax({
	url: "https://spreadsheets.google.com/feeds/list/1JTLivI7FDB0HeHIX0GePMLJd4bD-xarH3ZpNxPCX218/10/public/basic?alt=json",
	success: function(result) {
		data.gearmods = result;
	}
});
$.ajax({
	url: "https://spreadsheets.google.com/feeds/list/1JTLivI7FDB0HeHIX0GePMLJd4bD-xarH3ZpNxPCX218/16/public/basic?alt=json",
	success: function(result) {
		data.weapons = result;
	}
});
$.ajax({
	url: "https://spreadsheets.google.com/feeds/list/1JTLivI7FDB0HeHIX0GePMLJd4bD-xarH3ZpNxPCX218/18/public/basic?alt=json",
	success: function(result) {
		data.weaponmods = result;
	}
});