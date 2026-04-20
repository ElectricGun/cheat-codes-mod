//    I hate javascript so much why am i doing this

const effects = require("cheat-codes/effects")
const ui = require("cheat-codes/ui")
const vars = require("cheat-codes/vars")
let maxEfficiencyUpdateCounter = 0

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
    maxEfficiencyUpdateCounter = 0
    Timer.schedule(() => {try{Vars.player.unit().unapply(effects.timestop)} catch(e) {Log.infoTag("Cheat Codes Mod", e.stack) }}, .1)
})

Events.on(ClientLoadEvent, () => {
    ui.setupUI()
})

Events.run(Trigger.update, () => {
    if (!vars.maxEfficiencyEnabled || !Vars.state.isGame()) {
        return
    }

    maxEfficiencyUpdateCounter += 1
    if (maxEfficiencyUpdateCounter < 20) {
        return
    }
    maxEfficiencyUpdateCounter = 0

    Groups.build.each(build => {
        try {
            if (build.block != null && build.block.category == Category.distribution) {
                return
            }

            if (build.liquids != null && build.block != null && build.block.liquidCapacity > 0) {
                Vars.content.liquids().each(liquid => {
                    const missingLiquid = build.block.liquidCapacity - build.liquids.get(liquid)
                    if (missingLiquid > 0.001) {
                        build.liquids.add(liquid, missingLiquid)
                    }
                })
            }

            if (build.power != null && build.power.status < 1) {
                build.power.status = 1
            }

            if (build.applyBoost != null && build.block != null && build.block.canOverdrive) {
                build.applyBoost(40, 2)
            }
        } catch (e) {
            Log.infoTag("Cheat Codes Mod", e)
        }
    })
})
