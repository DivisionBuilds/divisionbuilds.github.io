$(document).ready(function() {
	$("head").append("<script src='/js/division-calc.js'></script>");
    $("input").on("keyup change", function() {
    	var o = {};
    	$("input").each(function() {
    		o[$(this).attr("class")] = parseFloat($(this).val());
    	});
    	$(".bulletDMG .value").text(Math.round(calc.bulletDMG({base: o.base, firearms: o.firearms, ratio: o.ratio})));
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
        $(".ls-bulletDMG .value span:eq(0)").text(Math.round(calc.pvp.bulletDMG(o).ls));
        $(".ls-burstDMG .value span:eq(0)").text(Math.round(calc.pvp.burstDMG(o).ls));
        $(".ls-burstDPS .value span:eq(0)").text(Math.round(calc.pvp.burstDPS(o).ls));
        $(".ls-DPS .value span:eq(0)").text(Math.round(calc.pvp.DPS(o).ls));
    });
});