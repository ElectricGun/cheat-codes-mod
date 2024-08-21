//    I hate javascript so much why am i doing this

const effects = require("cheat-codes/effects")
const ui = require("cheat-codes/ui")

/* deprecated
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
*/

Events.on(ResetEvent, () => {
    Time.setDeltaProvider(() => Core.graphics.getDeltaTime() * 60)
    Timer.schedule(() => {try{Vars.player.unit().unapply(effects.timestop)} catch(e) {Log.infoTag("Cheat Codes Mod", e.stack) }}, .1)
})

Events.on(ClientLoadEvent, () => {
    ui.setupUI()
})