$(document).ready(function() {
	var weapons = [
		"ACR",
	    "AK-47",
	    "AUG",
	    "Bullfrog",
	    "Double-Barrel Shotgun",
	    "FAL",
	    "G36",
	    "Historian",
	    "L86",
	    "M1A",
	    "M249",
	    "M4",
	    "M44",
	    "M60",
	    "M700",
	    "M870",
	    "MG5",
	    "MP5",
	    "MP7",
	    "P416",
	    "PP-19",
	    "RPK",
	    "SA-58",
	    "SASG-12",
	    "SCAR-H",
	    "SCAR-L",
	    "Showstopper",
	    "SRS",
	    "Super-90",
	    "SVD",
	    "T821",
	    "Tec-9",
	    "Tenebrae",
	    "Thompson",
	    "Tommy Gun",
	    "UMP",
	    "Urban MDR",
	    "Vector"
	];
	var weapon_talents = [
	    "Ferocious",
	    "Destructive",
	    "Harmful",
	    "Responsive",
	    "Deadly",
	    "Fierce",
	    "Self-Preserved",
	    "Trained",
	    "Competent",
	    "Unforgiving",
	    "Prepared",
	    "Swift",
	    "Intense",
	    "Vicious",
	    "Toxic",
	    "Brutal",
	    "Skilled",
	    "Coolheaded",
	    "Talented",
	    "Meticulous",
	    "Determined",
	    "Predatory",
	    "Sustained",
	    "Provident",
	    "Proficient",
	    "Balanced",
	    "Adept",
	    "Capable",
	    "Competent",
	    "Stable",
	    "Accurate",
	    "Commanding",
	    "Dominant",
	    "Expert",
	    "Disciplined",
	    "Showstopper",
	    "Hurried",
	    "Distracted",
	    "Focused",
	    "Carefree",
	    "Ambusher",
	    "Elevated",
	    "Uncomplicated",
	    "Caduceus",
	    "Glutton",
	    "Valkyrie",
	    "Lights Out",
	    "Center Mass",
	    "Boomstick",
	    "Quickdraw",
	    "Pakhan",
	    "Midas",
	    "Free Republic",
	    "History Repeats"
	];
	var stats = [
		"Firearms",
		"Electronics",
		"Stamina"
	];
	var gearsets = [
		"Striker",
		"Hunters",
		"Nomad",
		"Sentry",
		"Tactician",
		"Predator",
		"Final Measures",
		"Lone Star",
		"Frontline",
		"Banshee",
		"Reclaimer",
		"Firecrest",
		"AlphaBridge",
		"Deadeye"
	];
	var chest = [
		"Vigorous",
		"Rapid",
		"Reckless",
		"Robust",
		"Barrets"
	];
	var backpack = [
		"Specialized",
		"Inventive",
		"Resourceful",
		"Technical",
		"Ninja Bike"
	];
	var mask = [
		"Tenacious",
		"Refreshed",
		"Enduring",
		"Rejuvenated",
		"Rehabilitated",
		"Ferros"
	];
	var gloves = [
		"Cunning",
		"Savage",
		"Decisive",
		"Astute",
		"Skulls"
	];
	var holster = [
		"Nimble",
		"Recovered",
		"Sturdy",
		"Steadfast"
	];
	var knee_pads = [
		"Accomplished",
		"Prosperous",
		"Shortbow"
	];
	var skills = [
		"Defibrillator",
		"Booster Shot",
		"Overdose",
		"Tactical Scanner",
		"Scrambler",
		"Recon Pack",
		"Life Support",
		"Immunizer",
		"Ammo Cache",
		"BFB",
		"Flashbang",
		"Disruptor",
		"Active Sensor",
		"Dragonbreath",
		"Zapper",
		"Airburst",
		"Gas Charge",
		"Cluster",
		"Reactive Targeting",
		"Assault Shield",
		"Kinetic Breaker",
		"Trapper",
		"Recharger",
		"Concealment",
		"Extension",
		"Blast Shield",
		"Countermeasures"
	];
	var links = [
		"Recovery Link",
		"Tactical Link",
		"Survivor Link"
	];
	$(".weapon .type input").autocomplete({source: weapons});
	$(".weapon .talents input").autocomplete({source: weapon_talents});
	$(".chest .type input").autocomplete({source: gearsets.concat(chest)});
	$(".backpack .type input").autocomplete({source: gearsets.concat(backpack)});
	$(".mask .type input").autocomplete({source: gearsets.concat(mask)});
	$(".gloves .type input").autocomplete({source: gearsets.concat(gloves)});
	$(".holster .type input").autocomplete({source: gearsets.concat(holster)});
	$(".knee-pads .type input").autocomplete({source: gearsets.concat(knee_pads)});
	$(".rolls input, .mods .major input").autocomplete({source: stats});
	$(".skills .1 input, .skills .2 input").autocomplete({source: skills});
	$(".skills .link input").autocomplete({source: links});
	$(".submit").submit(function(e) {
		e.preventDefault();
		var s = true;
		$(".submit input").each(function() {
			var v = $(this).val();
			if (v.length === 0 && !$(this).hasClass("optional")) {
				s = false;
				$(this).attr("placeholder", "Required");
				$(this).addClass("highlight");
			}
			else
				$(this).removeClass("highlight");
		});
		if (s === true) {
			$.ajax({
				url: "//formspree.io/divisionbuilds@gmail.com",
				method: "POST",
				data: $(this).serialize(),
				dataType: "json",
				beforeSend: function() {
					$(".text-container > *").hide();
					$(".text-container").append('<div class="alert loading">Establishing connection...</div>');
				},
				success: function(data) {
					$(".text-container").find(".alert").remove();
					$(".text-container").append('<div class="alert success">Data transfer successful!</div>');
				},
				error: function(err) {
					$(".text-container").find(".alert").remove();
					$(".text-container").append('<div class="alert error">Error! Something went wrong...</div>');
				}
			});
		}
	});
});
