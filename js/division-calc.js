var calc = {
	bulletDMG: function(base, firearms, ratio, chc, chd, hsc, hsd) {
		return (base + (firearms * ratio)) * (1 + ((chd / 100 * chc) / 100)) * (1 + ((hsd / 100 * hsc) / 100));
	},
	pve: {
		bulletDMG: function(base, firearms, ratio, ead, dte, chc, chd, hsc, hsd) {
			return calc.bulletDMG(base, firearms, ratio, chd, chd, hsc, hsd) * ((100 + (ead / 2)) / 100) * ((100 + dte) / 100);
		},
		burstDPS: function(base, rpm, firearms, ratio, ead, dte, chc, chd, hsc, hsd) {
			var d = calc.pve.bulletDMG(base, firearms, ratio, ead, dte, chc, chd, hsc, hsd);
			return d * (rpm / 60);
		},
		DPS: function(base, rpm, magsize, reloadtime, firearms, ratio, ead, dte, chc, chd, hsc, hsd) {
			var d = calc.pve.bulletDMG(base, firearms, ratio, ead, dte, chc, chd, hsc, hsd);
			return (d * magsize) / (magsize / (rpm / 60) + reloadtime);
		}
	},
	pvp: {
		bulletDMG: function(base, firearms, ratio, ead, chc, chd, hsc, hsd) {
			var pvpdmg_ratio = 0.42;
			var pvpead_ratio = 0.3;
			var a = (calc.bulletDMG(base, firearms, ratio, chd, chd, hsc, hsd) * pvpdmg_ratio) / 100;
			var min = a * (100 - (35 / 100 * (100 - (ead * pvpead_ratio))));
			var max = a * (100 - (30 / 100 * (100 - (ead * pvpead_ratio))));
			return [min, max];
		},
		burstDPS: function(base, rpm, firearms, ratio, ead, chc, chd, hsc, hsd) {
			var d = calc.pvp.bulletDMG(base, firearms, ratio, ead, chc, chd, hsc, hsd);
			var min = d[0] * (rpm / 60);
			var max = d[1] * (rpm / 60);
			return [min, max];
		},
		DPS: function(base, rpm, magsize, reloadtime, firearms, ratio, ead, chc, chd, hsc, hsd) {
			var d = calc.pvp.bulletDMG(base, firearms, ratio, ead, chc, chd, hsc, hsd);
			var min = (d[0] * magsize) / (magsize / (rpm / 60) + reloadtime);
			var max = (d[1] * magsize) / (magsize / (rpm / 60) + reloadtime); 
			return [min, max];
		}
	}
};
