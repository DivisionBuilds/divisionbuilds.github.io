$(document).ready(function() {
	$("head").append("<script src='/js/division-calc.js'></script>");
    $("input").on("keyup change", page.update);
});

// PAGE UPDATE
var page = {
    update: function() {
        var s = 15 * parseFloat($(this).parents(".flex-list").find(".stamina").val()) || 0;
    	var h = parseFloat($(this).parents(".flex-list").find(".health").val()) || 0;
        $(this).parents(".flex-row").find(".output").text(Math.round(calc.toughness({
          	mitigation: calc.mitigation($(this).parents(".flex-list").find(".armor").val()),
          	health: h + s
        })));
    }
};