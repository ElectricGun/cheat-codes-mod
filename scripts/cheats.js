const effects = require("effects")
const sounds = require("sounds")

function newCheat(name, string, func) {
    string = string.split(" ")
    const cheat = {
        currString: [],
        targetString: string,
        checkParity() {
            for (let i = 0; i < this.currString.length; i++) {
                if (KeyCode[this.currString[i]] != KeyCode[this.targetString[i]]) {
                    //print(KeyCode[this.currString[i]], KeyCode[this.targetString[i]])
                    this.currString = []
                    return
                }
            }
            if (this.currString.length == this.targetString.length) {
                this.currString = []
                Log.infoTag("Cheat Codes Mod", name + " cheat activated!")
                
                func()

                Sounds.spark.play()
                Sounds.sap.play()

            }
        }
    }
    return cheat
}

let cheatList = [
    //    This is kinda annoying to type manually


    //   Amongus
    newCheat("amongus", "a m o n g u s", () => {
        sounds.amongus.play()
    }),

    //   TODO
    newCheat("qwerty", "q w e r t y u i o p", () => {

    }),

    //    Temporarily Increase speed
    newCheat("quick brown fox", "t h e q u i c k b r o w n f o x j u m p e d o v e r t h e l a z y d o g", () => {
        let playerUnit = Vars.player.unit()
        playerUnit.apply(effects.quickfox, 60 * 60 * 2)

        Vars.ui.showInfoPopup("Speed increased by 2 minutes!", 5, 1, 1, 1, 1, 1)
    }),
    
    //    Self explanatory
    newCheat("wind3", "w i n d num3", () => {
        Sounds.wind3.play()
    }),

    //    Multiplies health by 30
    newCheat("konami", "w w s s a d a d b a enter", () => {
        let playerUnit = Vars.player.unit()
        playerUnit.health = playerUnit.type.health * 30

        Vars.ui.showInfoPopup("Unit health multiplied by 30!", 3, 1, 1, 1, 1, 1)
    }),

    //    Temporary god mode
    newCheat("god mode", "l o r e m i p s u m d o l o r s i t a m e t", () => {
        let playerUnit = Vars.player.unit()
        playerUnit.apply(StatusEffects.invincible, 60 * 60)

        Vars.ui.showInfoPopup("God mode activated for 60 seconds!", 3, 1, 1, 1, 1, 1)
    }),

    //    Radially launch toxopids
    newCheat("rumbling", "t h e r u m b l i n g i s h e r e", () => {
        let playerUnit = Vars.player.unit()

        let count = 6
        for (let i = 0; i < count; i++) {
            let position = new Vec2(playerUnit.x, playerUnit.y)
            let positionOffset = new Vec2(Mathf.random(-50, 50), Mathf.random(-50, 50))
            let toxopid = UnitTypes.toxopid.spawn(position.add(positionOffset), playerUnit.team)
            let velocityVec = new Vec2(positionOffset.x, positionOffset.y).nor().scl(10)
            toxopid.apply(StatusEffects.burning, 100000 * 60)
            toxopid.vel.add(velocityVec)
        }
        
        Vars.ui.showInfoPopup("Mini Rumbling!", 3, 1, 1, 1, 1, 1)
    }),

    //    Deletes every odd unit except the player
    newCheat("thanos snap", "i a m i n e v i t a b l e", () => {
        let playerUnit = Vars.player.unit()
        let unitGroup = Groups.unit
        let odd = 0

        unitGroup.each(unit => {
            if (unit != playerUnit) {
                odd += 1
                odd %= 2
            }
            if (odd == 1) {
                unit.kill()
            }
        })

        Vars.ui.showInfoPopup("Perfectly balanced.", 1, 1, 1, 1, 1, 1)
    }),

    //    Slows down time while accelerating the player for 9 seconds
    newCheat("za warudo", "z a w a r u d o", () => {
        let timeControl = Vars.mods.getMod("time-control");
        if (timeControl != null && timeControl.isSupported() && timeControl.enabled()) {
            Log.infoTag("Cheat Codes Mod", "Cannot time stop; Time Control is installed!")
            return
        }

        sounds.zawarudo.play()

        let prevLighting = Vars.state.rules.lighting
        let prevAmbientLight = Vars.state.rules.ambientLight

        Vars.state.rules.lighting = true
        Vars.state.rules.ambientLight = new Color(.2, 0.1, .4, .2)

        let duration = 9
        let playerUnit = Vars.player.unit()
        playerUnit.apply(effects.timestop, 1000)

        Time.setDeltaProvider(() => Core.graphics.getDeltaTime() * 60 * .05)
        Timer.schedule(() => {
            Time.setDeltaProvider(() => Core.graphics.getDeltaTime() * 60)
            playerUnit.vel.set(0, 0)
            playerUnit.unapply(effects.timestop)

            Vars.state.rules.lighting = prevLighting
            Vars.state.rules.ambientLight = prevAmbientLight
        }, duration)
    }),

    //    Toggles editor mode
    newCheat("editor mode", "t h i s i s m y w o r l d", () => {
        let isEditor = Vars.state.rules.editor
        if (!isEditor) {
            Vars.state.rules.editor = !isEditor
            Vars.ui.showInfoPopup("Editor Mode enabled.", 2, 1, 1, 1, 1, 1)
        } else {
            Vars.state.rules.editor = !isEditor
            Vars.ui.showInfoPopup("Editor Mode disabled.", 2, 1, 1, 1, 1, 1)
        }
    }),
]

module.exports = {
    newCheat: newCheat,
    cheatList: cheatList,
}