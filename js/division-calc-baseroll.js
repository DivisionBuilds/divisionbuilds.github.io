$(document).ready(function() {
	$("head").append("<script src='/js/division-calc.js'></script>");
    $("input").on("keyup change", page.update);
});

// PAGE UPDATE
var page = {
    update: function() {
        var o = {};
        $("input").each(function() {
            o[$(this).attr("class")] = parseFloat($(this).val());
        });
        $(".baseDMG .value").text(calc.baseDMG(o));
    }
};