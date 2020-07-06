const SaveMechanic = require("./game/save/app.js")

let testObj = {
    "data": true,
    "name": "Tester Slot",
    "rank": "test",
    "stats": {
        "base": {
            "hp": 0,
            "mp": 0,
            "ap": 0,
            "STR": 0,
            "DEX": 0,
            "VIT": 0,
            "SPR": 0,
            "INT": 0,
            "MND": 0,
            "CHR": 0,
            "AGI": 0,
            "attack": 0,
            "ranged-att": 0,
            "defense": 0,
            "enmity": 0
        },
        "combat": {
            "accuracy": 0,
            "ranged-acc": 0,
            "crit-dmg": 0,
            "crit-rate": 0,
            "evasion": 0,
            "dmg-taken": 0,
            "speed": 0
        },
        "magic": {
            "mag-acc": 0,
            "mag-att": 0,
            "mag-crit": 0,
            "mag-crit-hit": 0,
            "mag-eva": 0,
            "interruption-rate": 0,
            "potency": 0
        }
    },
    "lastSave": "07/01/2020,04:49",
}

SaveMechanic.init(testObj).then(data => console.log(data));