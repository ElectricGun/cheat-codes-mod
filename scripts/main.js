    //    TODO add more cheats

const functions = require("cheat-codes/functions")
const cheats = require("cheat-codes/cheats")
const effects = require("cheat-codes/effects")
const ui = require("cheat-codes/ui")

let cheatList = cheats.cheatList

Events.run(Trigger.update, () =>{
    if (Vars.state.playing || Vars.state.paused) {
        let keyTapped = functions.getKeyTap()
        if (keyTapped != false) {
            cheatList.forEach(cheat => {
                cheat.currString.push(keyTapped)
                cheat.checkParity()
            })
        }
    }
})

Events.on(ResetEvent, () => {
    Time.setDeltaProvider(() => Core.graphics.getDeltaTime() * 60)
    Timer.schedule(() => Vars.player.unit().unapply(effects.timestop), .1)
})

Events.on(ClientLoadEvent, () => {
    ui.setupMobile()
})