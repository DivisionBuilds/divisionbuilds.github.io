var calc = {
	bulletDMG: function(o) {
		// Required: base, firearms, ratio
		// Optional: chc, chd, hsc, hsd, hsmulti, increase
		var base = o.base || 0,
		    firearms = o.firearms || 0,
		    ratio = o.ratio || 0,
		    chc = o.chc || 0,
		    chd = o.chd || 0,
		    hsc = o.hsc || 0,
		    hsd = o.hsd || 0,
		    hsmulti = o.hsdmulti || 1,
		    increase = o.increase || 0;
		return (base + (firearms * ratio)) * (1 + ((chd / 100 * chc) / 100)) * (hsmulti + ((hsd / 100 * hsc) / 100)) * (1 + (increase / 100));
	},
	pve: {
		bulletDMG: function(o) {
		// Required: base, firearms, ratio
		// Optional: ead, dte, chc, chd, hsc, hsd, hsmulti, increase
			var ead = o.ead || 0,
			    dte = o.dte || 0;
			return calc.bulletDMG(o) * ((100 + (ead / 2)) / 100) * ((100 + dte) / 100);
		},
		burstDMG: function(o) {
		// Required: base, magsize, firearms, ratio
		// Optional: ead, dte, chc, chd, hsc, hsd, hsmulti, increase
			var magsize = o.magsize || 1,
				d = calc.pve.bulletDMG(o);
			return d * magsize;
		},
		burstDPS: function(o) {
		// Required: base, rpm, firearms, ratio
		// Optional: ead, dte, chc, chd, hsc, hsd, hsmulti, increase
			var rpm = o.rpm || 0,
				d = calc.pve.bulletDMG(o);
			return d * (rpm / 60);
		},
		DPS: function(o) {
		// Required: base, rpm, magsize, reloadtime, firearms, ratio
		// Optional: ead, dte, chc, chd, hsc, hsd, hsmulti, increase
			var rpm = o.rpm || 0,
				magsize = o.magsize || 1,
				reloadtime = o.reloadtime || 1,
				d = calc.pve.bulletDMG(o);
			return (d * magsize) / (magsize / (rpm / 60) + reloadtime);
		}
	},
	pvp: {
		bulletDMG: function(o) {
		// Required: base, firearms, ratio
		// Optional: ead, chc, chd, hsc, hsd, hsmulti, increase, pvpdmg_ratio, pvpead_ratio
			var ead = o.ead || 0,
			    pvpdmg_ratio = o.pvpdmg_ratio || 0.42,
			    pvpead_ratio = o.pvpead_ratio || 0.3,
				a = (calc.bulletDMG(o) * pvpdmg_ratio) / 100;
			var min = a * (100 - (calc.mitigation(8008) / 100 * (100 - (ead * pvpead_ratio))));
			var max = a * (100 - (calc.mitigation(6814) / 100 * (100 - (ead * pvpead_ratio))));
			var ls = a * (100 - (35 / 100 * (100 - (ead * pvpead_ratio))));
			return {min: min, max: max, ls: ls};
		},
		burstDMG: function(o) {
		// Required: base, magsize, firearms, ratio
		// Optional: ead, chc, chd, hsc, hsd, hsmulti, increase, pvpdmg_ratio, pvpead_ratio
			var magsize = o.magsize || 1,
				d = calc.pvp.bulletDMG(o),
				a = {};
			$.each(d, function(key, value) {
				a[key] = value * magsize;
			});
			return a;
		},
		burstDPS: function(o) {
		// Required: base, rpm, firearms, ratio
		// Optional: ead, chc, chd, hsc, hsd, hsmulti, increase, pvpdmg_ratio, pvpead_ratio
			var rpm = o.rpm || 0,
				d = calc.pvp.bulletDMG(o),
				a = {};
			$.each(d, function(key, value) {
				a[key] = value * (rpm / 60);
			});
			return a;
		},
		DPS: function(o) {
		// Required: base, rpm, magsize, reloadtime, firearms, ratio
		// Optional: ead, chc, chd, hsc, hsd, hsmulti, increase, pvpdmg_ratio, pvpead_ratio
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
	mitigation: function(arm) {
		return arm / 239;
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
			case "inventive": {
				return s * 1.15;
				break;
			}
			case "specialized": {
				return s + ((firearms + stamina) * 2);
				break;
			}
			default: {
				return s;
			}
		}
	}
};