$(document).ready(function() {
    $("input").on("keyup change input", page.update);
});

// PAGE UPDATE
var page = {
    update: function() {
      var s = 15 * parseFloat($(this).parents(".flex-list").find(".stamina").val()) || 0,
    	h = parseFloat($(this).parents(".flex-list").find(".health").val()) || 0;
        $(this).parents(".flex-row").find(".output").text(Math.round(calc.toughness({
          	mitigation: calc.mitigation($(this).parents(".flex-list").find(".armor").val()),
          	health: h + s
        })));
    }
};