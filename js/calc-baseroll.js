$(document).ready(function() {
    $("input").on("keyup change input", page.update);
});

// PAGE UPDATE
var page = {
    update: function() {
        var o = {};
        $("input").each(function() {
            o[$(this).attr("class")] = parseFloat($(this).val());
        });
        $(".output").text(Math.round(calc.baseDMG(o)));
    }
};