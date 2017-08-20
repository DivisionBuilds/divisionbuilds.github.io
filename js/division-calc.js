var calc = {
	bulletDMG: function(o) {
		// Required: base, firearms, scaling
		// Optional: chc, chd, hsc, hsd, hsmulti, hsmodifier, increase
		var base = o.base || 0,
		    firearms = o.firearms || 0,
		    scaling = o.scaling || 0,
		    chc = o.chc || 0,
		    chd = o.chd || 0,
		    hsc = o.hsc || 0,
		    hsd = o.hsd || 0,
		    hsmulti = o.hsmulti || 1,
		    hsmodifier = o.hsmodifier || 1,
		    increase = o.increase || 0;
		var b = (base + (firearms * scaling)),
			r = (1 + (chd / 100 * chc / 100) + (((hsmulti - 1 + hsd / 100) * hsmodifier) * hsc / 100));
		if (increase instanceof Array) {
			for (var i = 0; i < increase.length; i++)
				r  *= (1 + (increase[i] || 0) / 100);
			return b * r;
		}
		else return  b * (r + increase / 100);
	},
	pve: {
		bulletDMG: function(o) {
		// Required: base, firearms, scaling
		// Optional: ead, dte, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase
			var ead = o.ead || 0,
			    dte = o.dte || 0;
			return calc.bulletDMG(o) * (1 + ead / 100) * (1 + dte / 100);
		},
		burstDMG: function(o) {
		// Required: base, magsize, firearms, scaling
		// Optional: ead, dte, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase
			var magsize = o.magsize || 1;
			return calc.pve.bulletDMG(o) * magsize;
		},
		burstDPS: function(o) {
		// Required: base, rpm, firearms, scaling
		// Optional: ead, dte, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase
			var rpm = o.rpm || 0;
			return calc.pve.bulletDMG(o) * (rpm / 60);
		},
		DPS: function(o) {
		// Required: base, rpm, magsize, reloadtime, firearms, scaling
		// Optional: ead, dte, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase
			var rpm = o.rpm || 0,
				magsize = o.magsize || 1,
				reloadtime = o.reloadtime || 1;
			return (calc.pve.bulletDMG(o) * magsize) / (magsize / (rpm / 60) + reloadtime);
		}
	},
	pvp: {
		bulletDMG: function(o) {
		// Required: base, firearms, scaling
		// Optional: ead, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase, pvpdmg_scaling, pvpead_scaling
			var ead = o.ead || 0,
			    pvpdmg_scaling = o.pvpdmg_scaling || 0.42,
			    pvpead_scaling = o.pvpead_scaling || 0.3,
			    pvphsd_scaling = o.pvphsd_scaling || 0.8;
			o.hsmodifier = o.hsmodifier || 0.8;
			var a = (calc.bulletDMG(o) * pvpdmg_scaling) / 100;
			var min = a * (100 - Math.max(0, (calc.mitigation(8008) / 100 * (100 - (ead * pvpead_scaling)))));
			var max = a * (100 - Math.max(0, (calc.mitigation(6814) / 100 * (100 - (ead * pvpead_scaling)))));
			var ls = a * (100 - Math.max(0, (35 / 100 * (100 - (ead * pvpead_scaling)))));
			return {min: min, max: max, ls: ls};
		},
		burstDMG: function(o) {
		// Required: base, magsize, firearms, scaling
		// Optional: ead, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase, pvpdmg_scaling, pvpead_scaling
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
		// Optional: ead, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase, pvpdmg_scaling, pvpead_scaling
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
		// Optional: ead, chc, chd, hsc, hsd, hsmulti, hsmodifier, increase, pvpdmg_scaling, pvpead_scaling
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
		return Math.round(dmg / (1 + (awd + wtd) / 100)) - gloves - firearms * scaling;
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
		// Optional: talent ("inventive" or "specialized"), firearms, stamina
		var talent = o.talent.toLowerCase() || "",
			firearms = o.firearms || 2674,
			stamina = o.stamina || 2674;
		var s = o.electronics * 30;
		switch (talent) {
			case "inventive":
				return s * 1.15;
				break;
			case "specialized":
				return s + ((firearms + stamina) * 2);
				break;
			default:
				return s;
		}
	}
};