{ // The file extension should be .json, this one is simply renamed to .js in order to allow comments
	"title": "Your build title",
	"author": "Your name",
	"link": "https://yourwebsitelink.com", // [OPTIONAL]
	"date": "29/04/2017", // The date you last updated the build (content wise)
	"patch": "1.6", // The patch this build is for [OPTIONAL]
	"tags": ["tag1", "tag2", "tag3"], // Tags: "pvp", "pve", "dps", "healer", "tank" etc.
	"build": {
		"weapons": {
			"primary": {
				"name": "Lightweight M4", // Primary weapon name
				"talents": ["Competent", "Brutal", "Unforgiving"], // Weapon talents
				"icon": "m4" // Weapon icon
			},
			"secondary": {
				"name": "MP7", // Secondary weapon name
				"talents": ["Competent", "Fierce", "Unforgiving"], // Weapon talents
				"icon": "mp7" // Weapon icon
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
				"main-stats": { // Main stat rolls on your gear pieces (Chest, Backpack, mask, Gloves, Knee pads => Total: 5)
					"4x": { // Amount of this type of roll
						"name": "Firearms Roll", // Firearms, Stamina or Electronics roll?
						"icon": "firearms" // icon of the main stat
					},
					"1x": { // Amount of this type of roll
						"name": "Electronics Roll", // Firearms, Stamina or Electronics roll?
						"icon": "electronics" // icon of the main stat
					}
				},
				"mods": { // Main stat mods on your gear (2x Chest, 1x Backpack, 1x Mask, 1x Knee Pads => Total: 5)
					"5x": { // Amount of this type of Mod
						"name": "Firearms Mod", // Mod name
						"text": "Health", // Mod roll
						"icon": "firearms" // Icon of the mods main stat
					}
				},
				"performance": { // Performance mods on your gear (2x Backpack, 1x Holster, 1x Knee Pads => Total: 4)
					"4x": { // Amount of this type of Performance Mod
						"name": "First Aid Self Heal Mod", // Performance mod name
						"icon": "first-aid" // Icon of the skill you modify
					}
				}
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
