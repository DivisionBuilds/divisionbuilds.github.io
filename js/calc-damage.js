$(document).ready(function() {
    $("input").on("keyup change input", page.update);
    $(".button:contains('Add')").click(function() {
        $(".append").append('<div class="flex-child added"><input type="number" value="0" min="0" class="increase"></div>');
        $("input").on("keyup change", page.update);
    });
    $(".button:contains('Remove')").click(function() {
        $(".append .added:last-child").remove();
        page.update();
    });
});

// PAGE UPDATE
var page = {
    update: function() {
        var o = {};
        $("input").each(function() {
            o[$(this).attr("class")] = parseFloat($(this).val());
        });
        o.increase = [];
        $(".increase").each(function() {
            o.increase[o.increase.length] = parseFloat($(this).val());
        });
        $(".bulletDMG .value").text(Math.round(calc.bulletDMG({base: o.base, gloves: o.gloves, firearms: o.firearms, scaling: o.scaling, awd: o.awd, wtd: o.wtd, increase: o.increase})));
        $(".avgbulletDMG .value").text(Math.round(calc.bulletDMG(o)));
        $(".pve-bulletDMG .value").text(Math.round(calc.pve.bulletDMG(o)));
        $(".pve-burstDMG .value").text(Math.round(calc.pve.burstDMG(o)));
        $(".pve-burstDPS .value").text(Math.round(calc.pve.burstDPS(o)));
        $(".pve-DPS .value").text(Math.round(calc.pve.DPS(o)));
        $(".pvp-bulletDMG .value span:eq(0)").text(Math.round(calc.pvp.bulletDMG(o).min));
        $(".pvp-bulletDMG .value span:eq(1)").text(Math.round(calc.pvp.bulletDMG(o).max));
        $(".pvp-burstDMG .value span:eq(0)").text(Math.round(calc.pvp.burstDMG(o).min));
        $(".pvp-burstDMG .value span:eq(1)").text(Math.round(calc.pvp.burstDMG(o).max));
        $(".pvp-burstDPS .value span:eq(0)").text(Math.round(calc.pvp.burstDPS(o).min));
        $(".pvp-burstDPS .value span:eq(1)").text(Math.round(calc.pvp.burstDPS(o).max));
        $(".pvp-DPS .value span:eq(0)").text(Math.round(calc.pvp.DPS(o).min));
        $(".pvp-DPS .value span:eq(1)").text(Math.round(calc.pvp.DPS(o).max));
        $(".ls-bulletDMG .value").text(Math.round(calc.pvp.bulletDMG(o).ls));
        $(".ls-burstDMG .value").text(Math.round(calc.pvp.burstDMG(o).ls));
        $(".ls-burstDPS .value").text(Math.round(calc.pvp.burstDPS(o).ls));
        $(".ls-DPS .value").text(Math.round(calc.pvp.DPS(o).ls));
    }
};