var calc = {
	bulletDMG: function(o) {
		// Required: base, firearms, scaling
		// Optional: gloves, awd, wtd, ooc, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase
		var base = o.base || 0,
		    firearms = o.firearms || 0,
		    scaling = o.scaling || 0,
		    gloves = o.gloves || 0,
		    awd = o.awd || 0,
		    wtd = o.wtd || 0,
		    ooc = o.ooc || 0,
		    chc = o.chc || 0,
		    chd = o.chd || 0,
		    hsc = o.hsc || 0,
		    hsd = o.hsd || 0,
		    hsmulti = o.hsmulti || 1,
		    hsmodifier = o.hsmodifier || 1,
		    increase = o.increase || 0;
		var d = (base + (firearms * scaling)) * (1 + (Math.max(1, ((Math.max(1, hsmulti) + hsd / 100) * hsmodifier)) - 1) * hsc / 100 + (chd / 100 * chc / 100)) * (1 + (awd + wtd + gloves) / 100) * (1 + ooc / 100);
		if (increase instanceof Array) {
			for (var i = 0; i < increase.length; i++)
				d  *= (1 + (increase[i] || 0) / 100);
		}
		else {
			d *= (1 + (increase || 0) / 100);
		}
		return  d;
	},
	pve: {
		bulletDMG: function(o) {
		// Required: base, firearms, scaling
		// Optional: gloves, awd, wtd, ead, dte, ooc, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase
			var ead = o.ead || 0,
			    dte = o.dte || 0;
			return calc.bulletDMG(o) * (1 + ead / 100) * (1 + dte / 100);
		},
		burstDMG: function(o) {
		// Required: base, magsize, firearms, scaling
		// Optional: gloves, awd, wtd, ead, dte, ooc, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase
			var magsize = o.magsize || 1;
			return calc.pve.bulletDMG(o) * magsize;
		},
		burstDPS: function(o) {
		// Required: base, rpm, firearms, scaling
		// Optional: gloves, awd, wtd, ead, dte, ooc, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase
			var rpm = o.rpm || 0;
			return calc.pve.bulletDMG(o) * (rpm / 60);
		},
		DPS: function(o) {
		// Required: base, rpm, magsize, reloadtime, firearms, scaling
		// Optional: gloves, awd, wtd, ead, dte, ooc, ooc, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase
			var rpm = o.rpm || 0,
				magsize = o.magsize || 1,
				reloadtime = o.reloadtime || 0;
			return (calc.pve.bulletDMG(o) * magsize) / (magsize / (rpm / 60) + Math.max(0, reloadtime));
		}
	},
	pvp: {
		bulletDMG: function(o) {
		// Required: base, firearms, scaling
		// Optional: gloves, awd, wtd, ead, ooc, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase, pvpdmg_scaling, pvpead_scaling
			var ead = o.ead || 0,
			    pvpdmg_scaling = o.pvpdmg_scaling || 0.49,
			    pvpead_scaling = o.pvpead_scaling || 0.3;
			o.hsmodifier = o.pvphsd_scaling || 0.8;
			var a = (calc.bulletDMG(o) * pvpdmg_scaling) / 100;
			var min = a * (100 - Math.max(0, (calc.mitigation(8008) / 100 * (100 - (ead * pvpead_scaling)))));
			var max = a * (100 - Math.max(0, (calc.mitigation(6814) / 100 * (100 - (ead * pvpead_scaling)))));
			var ls = a * (100 - Math.max(0, (35 / 100 * (100 - (ead * pvpead_scaling)))));
			return {min: min, max: max, ls: ls};
		},
		burstDMG: function(o) {
		// Required: base, magsize, firearms, scaling
		// Optional: gloves, awd, wtd, ead, ooc, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase, pvpdmg_scaling, pvpead_scaling
			var magsize = o.magsize || 1,
				d = calc.pvp.bulletDMG(o),
				a = {};
			$.each(d, function(key, value) {
				a[key] = value * magsize;
			});
			return a;
		},
		burstDPS: function(o) {
		// Required: base, rpm, firearms, scaling
		// Optional: gloves, awd, wtd, ead, ooc, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase, pvpdmg_scaling, pvpead_scaling
			var rpm = o.rpm || 0,
				d = calc.pvp.bulletDMG(o),
				a = {};
			$.each(d, function(key, value) {
				a[key] = value * (rpm / 60);
			});
			return a;
		},
		DPS: function(o) {
		// Required: base, rpm, magsize, reloadtime, firearms, scaling
		// Optional: gloves, awd, wtd, ead, ooc, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase, pvpdmg_scaling, pvpead_scaling
			var rpm = o.rpm || 0,
				magsize = o.magsize || 1,
				reloadtime = o.reloadtime || 1,
				d = calc.pvp.bulletDMG(o),
				a = {};
			$.each(d, function(key, value) {
				a[key] = (value * magsize) / (magsize / (rpm / 60) + reloadtime);
			});
			return a;
		}
	},
	baseDMG: function(o) {
	// Required: dmg, firearms, scaling
	// Optional: gloves, awd, wtd
		var dmg = o.dmg || 0,
			firearms = o.firearms || 0,
			scaling = o.scaling || 0,
			gloves = o.gloves || 0,
			awd = o.awd || 0,
			wtd = o.wtd || 0;
		return Math.round(dmg / (1 + (awd + wtd + gloves) / 100)) - firearms * scaling;
	},
	mitigation: function(arm, wt = 5) {
		switch (wt) {
			case 1:
				return arm / 820;
				break;
			case 2:
				return arm / 127.64;
				break;
			case 3:
				return arm / 155.43;
				break;
			case 4:
				return arm / 192.76;
				break;
			case 5:
			default:
				return arm / 239.06;
				break;
		}
	},
	toughness: function(o) {
		// Required: health, mitigation
		var health = o.health || 0,
			mitigation = o.mitigation || 0;
		return health / ((100 - mitigation) / 100);
	},
	skillpower: function(o) {
		// Required: electronics
		// Optional: rolls, increase
		var electronics = o.electronics || 0,
			rolls = o.rolls || 0;
		var s = electronics * 30 + rolls;
		if (increase instanceof Array) {
			for (var i = 0; i < increase.length; i++)
				s  *= (1 + (increase[i] || 0) / 100);
		}
		else {
			s *= (1 + (increase || 0) / 100);
		}
		return  s;
	}
};