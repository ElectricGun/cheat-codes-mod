//    I hate javascript so much why am i doing this
//    ask yo self brother(aavarvd)
const effects = require("cheat-codes/effects")
const ui = require("cheat-codes/ui")
const vars = require("cheat-codes/vars")
// ensure cheats module is loaded so its update loop runs in cheats.js
const cheats = require("cheat-codes/cheats")

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
    // max efficiency state and counters are handled in cheats.js
    Timer.schedule(() => {try{Vars.player.unit().unapply(effects.timestop)} catch(e) {Log.infoTag("Cheat Codes Mod", e.stack) }}, .1)
})

Events.on(ClientLoadEvent, () => {
    ui.setupUI()
})

// max efficiency update loop moved to cheats.js to reduce iteration overhead
