const fs = require("fs");
const util = require("util");
const moment = require("moment");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Creates a new game charObj and saves slot with latest data
const newGame = async whichSlot => {
    try {
        const saveTemplate = JSON.parse(await readFileAsync("./game/save/template/new-save.json", "utf8"));
        saveTemplate.slot = whichSlot;

        await saveGame(whichSlot, saveTemplate);

        const saveFile = await loadGame(whichSlot);
        return saveFile;

    } catch (err) {
        return err;
    }
}

// Returns a charObj
const loadGame = async whichSlot => {
    try {
        const saveFile = JSON.parse(await readFileAsync(`./game/save/slots/slot-${whichSlot}.json`, "utf8"));
        return saveFile;
    } catch (err) {
        return err;
    }
}

// Returns a partial representation of the save files to be viewed as choices
const viewAll = async () => {
    try {
        const saveSlots = [];
        const files = ["./game/save/slots/slot-1.json", "./game/save/slots/slot-2.json", "./game/save/slots/slot-3.json"];

        for (let file of files) {
            const saveFile = JSON.parse(await readFileAsync(file, "utf8"));
            if (saveFile.data) {
                saveSlots.push({
                    data: true,
                    slot: saveFile.slot,
                    name: saveFile.name,
                    last_save: saveFile.lastSave,
                    rank: saveFile.rank
                });
            } else {
                saveSlots.push(saveFile);
            }
        }

        return saveSlots;
    } catch (err) {
        return err;
    }
}

// Params: which slot to save on, and what the character object is that will overwrite the file
const saveGame = async (whichSlot, charObj) => {
    try {
        charObj.slot = whichSlot;
        charObj.lastSave = moment().format('MM/DD/YYYY,hh:mm');
        await writeFileAsync(
            `./game/save/slots/slot-${whichSlot}.json`,
            JSON.stringify(charObj),
            "utf8"
        );
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    newGame,
    loadGame,
    saveGame,
    viewAll
};
