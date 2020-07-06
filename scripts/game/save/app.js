const inquirer = require("inquirer");
const saveLogic = require("./index");

module.exports = {

  init: async function (charObj) {
    try {
      const saveObj = charObj;
      let mode = true;

      while (mode) {

        const { userChoice } = await this.memoryInterface();
        console.log(userChoice)

        if (userChoice == 0) {
          const { confirm } = await this.confirmInterface();
          if (confirm) {
            mode = false;
            break;
          } else {
            continue;
          }
        }

        const { userChoice2 } = await this.memoryOptionsInterface(userChoice);
        console.log(userChoice2)

        if (userChoice2 == "title") {
          continue;
        }

        let saveSlots = false;
        while (!saveSlots) {

          const saveSnippets = await saveLogic.viewAll();
          const { userChoice3 } = await this.slotInterface(saveSnippets, userChoice2);
          console.log("Slot: ", userChoice3)
          const { confirm } = await this.confirmInterface();
          if (confirm) {
            switch (userChoice2) {
              case "save":
                saveLogic.saveGame(userChoice3, saveObj);
                console.log("saving........")
                break;
              case "load":
                saveLogic.loadGame(userChoice3).then(data => console.log(data))
                console.log("loading.......")
                break;
              case "new":
                saveLogic.newGame(userChoice3).then(data => console.log(data))
                console.log("creating new save......")
                break;
              default:
                break;
            }
            saveSlots = true;
          } else {
            continue;
          }
        }
        break;
      }
    } catch (error) {
      return error
    }
    return "completed"
  },

  previewSaves: function (saveSnippets) {
    console.log(saveSnippets)
    return saveSnippets.map(snippet =>
      snippet.data ?
        {
          name: `Slot ${snippet.slot}: ${snippet.name}`,
          value: snippet.slot
        } :
        {
          name: `-- Empty --`,
          value: snippet.slot
        }
    )
  },

  slotInterface: function (saveSnippets, type) {

    let phrase = "";
    switch (type) {
      case "new":
        phrase = "save a new game to?"
        break;
      case "load":
        phrase = "load from?"
        break;
      case "save":
        phrase = "save to?"
        break;
      default:
        break;
    }
    const previewSnippets = this.previewSaves(saveSnippets);
    console.table(previewSnippets)

    const main = [
      {
        type: "list",
        name: "userChoice3",
        message: `Which slot would you like to ${phrase}`,
        choices: previewSnippets
      }
    ];

    return inquirer.prompt(main);

  },
  memoryOptionsInterface: function (options) {

    let choices;

    switch (options) {
      case "title":
        choices = [{ name: "New Game", value: "new" }, { name: "Load Game", value: "load" }]
        break;
      case "loadsave":
        choices = [{ name: "Save Game", value: "save" }, { name: "Load Game", value: "load" }]
        break;
      case "endgame":
        choices = [{ name: "Load Game", value: "load" }, { name: "Title Screen", value: "title" }]
        break;
      default:
        console.log("invalid option, memoryOptions()");
        break;
    }

    const mainMenu = [
      {
        type: "list",
        name: "userChoice2",
        message: "What would you like to do?",
        choices
      }
    ];

    return inquirer.prompt(mainMenu);

  },
  memoryInterface: function () {

    const main = [{
      type: "list",
      name: "userChoice",
      message: "MEMORY INTERFACE: choose an environment instance:",
      choices: [
        { name: "Title Screen", value: "title" },
        { name: "Load/Save", value: "loadsave" },
        { name: "Game Over", value: "endgame" },
        { name: "Exit", value: 0 }
      ]
    }];

    return inquirer.prompt(main);

  },

  confirmInterface: function () {

    const main = [{
      type: "list",
      name: "confirm",
      message: "YES/NO INTERFACE: confirm choice:",
      choices: [{ name: "Yes", value: true }, { name: "No", value: false }]
    }];

    return inquirer.prompt(main);

  }

}