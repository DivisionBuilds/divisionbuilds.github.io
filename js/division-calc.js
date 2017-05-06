var calc = {
	bulletDMG: function(o) {
		// Required: base, firearms, ratio
		// Optional: chc, chd, hsc, hsd
		var base = o.base,
		    firearms = o.firearms,
		    ratio = o.ratio,
		    chc = o.chc || 0,
		    chd = o.chd || 0,
		    hsc = o.hsc || 0,
		    hsd = o.hsd || 0;
		return (base + (firearms * ratio)) * (1 + ((chd / 100 * chc) / 100)) * (1 + ((hsd / 100 * hsc) / 100));
	},
	pve: {
		bulletDMG: function(o) {
		// Required: base, firearms, ratio
		// Optional: ead, dte, chc, chd, hsc, hsd
			var base = o.base,
			    firearms = o.firearms,
			    ratio = o.ratio,
			    ead = o.ead || 0,
			    dte = o.dte || 0,
			    chc = o.chc || 0,
			    chd = o.chd || 0,
			    hsc = o.hsc || 0,
			    hsd = o.hsd || 0;
			return calc.bulletDMG(o) * ((100 + (ead / 2)) / 100) * ((100 + dte) / 100);
		},
		burstDPS: function(o) {
		// Required: base, rpm, firearms, ratio
		// Optional: ead, dte, chc, chd, hsc, hsd
			var base = o.base,
				rpm = o.rpm,
			    firearms = o.firearms,
			    ratio = o.ratio,
			    ead = o.ead || 0,
			    dte = o.dte || 0,
			    chc = o.chc || 0,
			    chd = o.chd || 0,
			    hsc = o.hsc || 0,
			    hsd = o.hsd || 0;
			var d = calc.pve.bulletDMG(o);
			return d * (rpm / 60);
		},
		DPS: function(o) {
		// Required: base, rpm, magsize, reloadtime, firearms, ratio
		// Optional: ead, dte, chc, chd, hsc, hsd
			var base = o.base,
				rpm = o.rpm,
				magsize = o.magsize,
				reloadtime = o.reloadtime,
			    firearms = o.firearms,
			    ratio = o.ratio,
			    ead = o.ead || 0,
			    dte = o.dte || 0,
			    chc = o.chc || 0,
			    chd = o.chd || 0,
			    hsc = o.hsc || 0,
			    hsd = o.hsd || 0;
			var d = calc.pve.bulletDMG(o);
			return (d * magsize) / (magsize / (rpm / 60) + reloadtime);
		}
	},
	pvp: {
		bulletDMG: function(o) {
		// Required: base, firearms, ratio
		// Optional: ead, chc, chd, hsc, hsd, pvpdmg_ratio, pvpead_ratio
			var base = o.base,
			    firearms = o.firearms,
			    ratio = o.ratio,
			    ead = o.ead || 0,
			    chc = o.chc || 0,
			    chd = o.chd || 0,
			    hsc = o.hsc || 0,
			    hsd = o.hsd || 0,
			    pvpdmg_ratio = o.pvpdmg_ratio || 0.42,
			    pvpead_ratio = o.pvpead_ratio || 0.3;
			var a = (calc.bulletDMG(o) * pvpdmg_ratio) / 100;
			var min = a * (100 - (35 / 100 * (100 - (ead * pvpead_ratio))));
			var max = a * (100 - (30 / 100 * (100 - (ead * pvpead_ratio))));
			return [min, max];
		},
		burstDPS: function(o) {
		// Required: base, rpm, firearms, ratio
		// Optional: ead, chc, chd, hsc, hsd, pvpdmg_ratio, pvpead_ratio
			var base = o.base,
				rpm = o.rpm,
			    firearms = o.firearms,
			    ratio = o.ratio,
			    ead = o.ead || 0,
			    chc = o.chc || 0,
			    chd = o.chd || 0,
			    hsc = o.hsc || 0,
			    hsd = o.hsd || 0;
			var d = calc.pvp.bulletDMG(o);
			var min = d[0] * (rpm / 60);
			var max = d[1] * (rpm / 60);
			return [min, max];
		},
		DPS: function(o) {
		// Required: base, rpm, magsize, reloadtime, firearms, ratio
		// Optional: ead, chc, chd, hsc, hsd, pvpdmg_ratio, pvpead_ratio
			var base = o.base,
				rpm = o.rpm,
				magsize = o.magsize,
				reloadtime = o.reloadtime,
			    firearms = o.firearms,
			    ratio = o.ratio,
			    ead = o.ead || 0,
			    chc = o.chc || 0,
			    chd = o.chd || 0,
			    hsc = o.hsc || 0,
			    hsd = o.hsd || 0;
			var d = calc.pvp.bulletDMG(o);
			var min = (d[0] * magsize) / (magsize / (rpm / 60) + reloadtime);
			var max = (d[1] * magsize) / (magsize / (rpm / 60) + reloadtime); 
			return [min, max];
		}
	},
	mitigation: function(arm) {
		return arm / 239;
	},
	toughness: function(o) {
		// Required: health, mitigation
		var health = o.health || 200000,
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
