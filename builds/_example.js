{ // The file extension should be .json, this one is simply renamed to .js in order to allow comments
	"title": "Your build title",
	"author": "Your name",
	"link": "https://yourwebsitelink.com", // [OPTIONAL]
	"date": "03/05/2017", // The date you last updated the build (content wise)
	"patch": "1.6", // The patch this build is for [OPTIONAL]
	"tags": ["tag1", "tag2", "tag3"], // Tags: "pvp", "pve", "dps", "healer", "tank" etc.
	"build": {
		"general": [ // You build description/info
			"Your build description and some information.", // May include links
			"Another description paragraph."
		],
		"weapons": {
			"primary": {
				"name": "Lightweight M4", // Primary weapon name
				"talents": ["Competent", "Brutal", "Unforgiving"], // Primary weapon talents
				"mods": { // Primary weapon mods
					"magazine": ["Magazine Size", "Rate of Fire", "Critical Hit Chance"], // Magazine rolls
					"underbarrel": ["Reload Speed", "Critical Hit Damage", "Stability"], // Underbarrel rolls
					"muzzle": ["Headshot Damage", "Critical Hit Chance", "Critical Hit Damage"], // Muzzle rolls
					"scope": ["Headshot Damage", "Critical Hit Chance", "Critical Hit Damage"] // Scope rolls
				},
				"icon": "m4" // Weapon icon
			},
			"secondary": {
				"name": "MP7", // Secondary weapon name
				"talents": ["Competent", "Fierce", "Unforgiving"], // Secondary weapon talents
				"mods": { // Secondary weapon mods
					"magazine": ["Magazine Size", "Rate of Fire", "Critical Hit Chance"], // Magazine rolls
					"underbarrel": ["Reload Speed", "Critical Hit Damage", "Stability"], // Underbarrel rolls
					"muzzle": ["Headshot Damage", "Critical Hit Chance", "Critical Hit Damage"], // Muzzle rolls
					"scope": ["Headshot Damage", "Critical Hit Chance", "Critical Hit Damage"] // Scope rolls
				},
				"icon": "mp7" // Weapon icon
			},
			"sidearm": {
				"name": "93R", // Sidearm weapon name
				"talents": ["Coolheaded", "Expert"], // Sidearm weapon talents
				"mods": { // Sidearm weapon mods
					"muzzle": ["Critical Hit Chance", "Headshot Damage", "Critical Hit Damage"] // Muzzle rolls
				},
				"icon": "93r" // Weapon icon
			}
		},
		"gear": {
			"items": { // Gear pieces
				"chest": {
					"name": "Vigorous Chest", // Chest name/type
					"rolls": ["Health", "Skill Haste", "Burn Resistance"], // Chest rolls
					"icon": "he" // "he", "exotic" or gearset name
				},
				"backpack": {
					"name": "Specialized Backpack", // Backpack name/type
					"rolls": ["Health", "Burn Resistance"], // Backpack rolls
					"icon": "he" // "he", "exotic" or gearset name
				},
				"mask": {
					"name": "Tenacious Mask", // Mask name/type
					"rolls": ["Health", "Burn Resistance"], // Mask rolls
					"icon": "he" // "he", "exotic" or gearset name
				},
				"gloves": {
					"name": "Skulls MC Gloves", // Gloves name/type
					"rolls": ["Assault Rifle Damage", "SMG Damage", "Critical Hit Chance"], // Gloves rolls
					"icon": "exotic" // "he", "exotic" or gearset name
				},
				"holster": {
					"name": "Nimble Holster", // Holster name/type
					"rolls": ["Health"], // Holster rolls
					"icon": "he" // "he", "exotic" or gearset name
				},
				"knee-pads": {
					"name": "Shortbow Championship Knee Pads", // Knee Pads name/type
					"rolls": ["Health", "Burn Resistance", "Shock Resistance", "Disrupt Resistance"], // Knee Pads rolls
					"icon": "exotic" // "he", "exotic" or gearset name
				}
			},
			"stats": {
				"main-rolls": [ // Main stat rolls on your gear pieces (Chest, Backpack, mask, Gloves, Knee pads => Total: 5)
					["4x", "Firearms"], // Amount & type of roll ("Firearms", "Stamina" or "Electronics")
					["1x", "Electronics"] // Amount & type of roll ("Firearms", "Stamina" or "Electronics")
				],
				/* ALTERNATIVE: Approximate amount of each stat
				"main-stats": [
					["8000", "Firearms"], // Amount of Firearms points
					["3000", "Stamina"] // Amount of Stamina points
					["4000", "Electronics"] // Amount of electronics points
				], */
				"mods": [ // Main stat mods on your gear (2x Chest, 1x Backpack, 1x Mask, 1x Knee Pads => Total: 5)
					["5x", "Firearms", "Health"] // Amount & mod rolls
				],
				"performance": [ // Performance mods on your gear (2x Backpack, 1x Holster, 1x Knee Pads => Total: 4)
					["4x", "First Aid Self Heal", "first-aid"] // Amount, type of mod & skill the mod affects (used for icon)
				]
			}
		},
		"skills": {
			"1": {
				"name": "First Aid", // Skill name
				"mod": "Booster Shot" // Skill mod
			},
			"2": {
				"name": "Pulse", // Skill name
				"mod": "Scrambler" // Skill mod
			},
			"link": {
				"mod": "Survivor Link" // Link mod
			}
		}
	}
}