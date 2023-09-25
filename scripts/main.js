    //    TODO add more cheats

const functions = require("/functions")
const cheats = require("/cheats")
const effects = require("/effects")

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
