// this whole logic needs to be rewritten wow :sob:

const effects = require("cheat-codes/effects")
const sounds = require("cheat-codes/sounds")
const vars = require("cheat-codes/vars")
const functions = require("cheat-codes/functions")

let cooldowns = {}

function addCooldown(name, cooldown) {

    cooldowns[name] = cooldown

    Timer.schedule(
        () => {
            cooldowns[name] = 0
        },
        cooldown
    )
}

function newCheat(name, string, cooldown, func, mobileStringOverride) {
    // split using " " due to multiple lettered characters
    string = string.split(" ")
    let mobileString = string.join("")

    if (mobileStringOverride != null) {
        mobileString = mobileStringOverride
    }

    const cheat = {

        currString: [],
        targetString: string,

        checkParity() {

            for (let i = 0; i < this.currString.length; i++) {
                if (KeyCode[this.currString[i]] != KeyCode[this.targetString[i]]) {
                    this.currString = []
                    return
                }
            }
            
            if (this.currString.length == this.targetString.length) {

                this.currString = []

                if(cooldowns[name] == undefined || cooldowns[name] == 0 || vars.debugMode == true) { 

                    Log.infoTag("Cheat Codes Mod", name + " cheat activated!") 

                    func()

                    Sounds.spark.play()
                    Sounds.sap.play()

                    addCooldown(name, cooldown)

                } else {
                    Log.infoTag("Cheat Codes Mod", name + " on cooldown!") 
                    
                }
            }
        },

        checkParityMobile(text) {
            if (text == mobileString) {
                //function this block
                if(cooldowns[name] == undefined || cooldowns[name] == 0 || vars.debugMode == true) { 

                    Log.infoTag("Cheat Codes Mod", name + " cheat activated!") 

                    func()

                    Sounds.spark.play()
                    Sounds.sap.play()

                    addCooldown(name, cooldown)

                } else {
                    Log.infoTag("Cheat Codes Mod", name + " on cooldown!") 
                    
                }
                //
            }
        }
    }
    return cheat
}

let cheatList = [
    //    This is kinda annoying to type manually


    //   Amongus
    newCheat("amongus", "a m o n g u s", 1, () => {
        sounds.amongus.play()
    }),

    //   TODO
    newCheat("qwerty", "q w e r t y u i o p", 1, () => {

    }),

    //    Temporarily Increase speed
    newCheat("quick brown fox", "t h e q u i c k b r o w n f o x j u m p e d o v e r t h e l a z y d o g", 1, () => {
        let playerUnit = Vars.player.unit()
        playerUnit.apply(effects.quickfox, 60 * 60 * 2)

        Vars.ui.showInfoPopup("Speed increased by 2 minutes!", 5, 1, 1, 1, 1, 1)
    }),
    
    //    Self explanatory
    newCheat("wind3", "w i n d num3", 1, () => {
        Sounds.wind3.play()
    }, 
    "wind3"),

    //    Multiplies health by 30
    newCheat("konami", "w w s s a d a d b a enter", 1, () => {
        let playerUnit = Vars.player.unit()
        playerUnit.health = playerUnit.type.health * 30

        Vars.ui.showInfoPopup("Unit health multiplied by 30!", 3, 1, 1, 1, 1, 1)
    }, 
    "wwssadadba"),

    //    Temporary god mode
    newCheat("god mode", "l o r e m i p s u m d o l o r s i t a m e t", 1, () => {
        let playerUnit = Vars.player.unit()
        playerUnit.apply(StatusEffects.invincible, 60 * 60)

        Vars.ui.showInfoPopup("God mode activated for 60 seconds!", 3, 1, 1, 1, 1, 1)
    }),

    //    Radially launch toxopids
    newCheat("rumbling", "t h e r u m b l i n g i s h e r e", 1, () => {
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


    //    Deletes every odd unit except the player TODO add a way to reverse this using the blip
    newCheat("thanos snap", "i a m i n e v i t a b l e", 1, () => {
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
    newCheat("za warudo", "z a w a r u d o", 1, () => {
        let playerUnit = Vars.player.unit()
        let unitType = playerUnit.type
        let timeControl = Vars.mods.getMod("time-control");
        if (timeControl != null && timeControl.isSupported() && timeControl.enabled()) {
            Log.infoTag("Cheat Codes Mod", "Cannot time stop; Time Control is installed!")
            return
        }

        if (Vars.mobile) {
            Log.infoTag("You don't have enough power to stop time (PC Only)")
            return 
        }

        if (playerUnit.hasEffect(effects.timestop)) {
            return
        }

        let multiplier = vars.timeStopMultiplier

        //    Play effect
        let prezaWave = new WaveEffect()
        Object.assign(prezaWave, {
            colorFrom: new Color(.4,0,.8,1),
            colorTo: new Color(.6,.6,.3,0),
            sizeFrom: 1000,
            sizeTo: 0,
            strokeFrom: 0,
            strokeTo: 100,
            lifetime: 60,
            lightScl: 0
        })

        let zaWave = new WaveEffect()
        Object.assign(zaWave, {
            colorFrom: new Color(.4,0,.8,1),
            colorTo: new Color(.6,.6,.3,0),
            sizeFrom: 0,
            sizeTo: 1000,
            strokeFrom: 0,
            strokeTo: 100,
            lifetime: 60 * multiplier,
            lightScl: 0
        })
        
        let playerPosition = new Vec2(playerUnit.x, playerUnit.y)

        prezaWave.at(playerPosition)

        Time.runTask(80, () => {

            sounds.zawarudo.play()

            //    Change ambient light
            let prevLighting = Vars.state.rules.lighting
            let prevAmbientLight = Vars.state.rules.ambientLight
    
            Vars.state.rules.lighting = true
            Vars.state.rules.ambientLight = new Color(.2, 0.1, .4, .2)
            
            zaWave.at(playerPosition)
            Time.runTask(10, () => {
                zaWave.lifetime = 120 * multiplier
                zaWave.at(playerPosition)
            })
            Time.runTask(20, () => {
                zaWave.lifetime = 180 * multiplier
                zaWave.at(playerPosition)
            })
            Time.runTask(30, () => {
                zaWave.lifetime = 240 * multiplier
                zaWave.at(playerPosition)
            })

            //    Time stop
            let duration = 9
            playerUnit.apply(effects.timestop, 1000)
            let oldAccel = unitType.accel
            let oldDrag = unitType.drag
            unitType.accel = oldAccel / multiplier
            unitType.drag = oldDrag / multiplier

            Time.setDeltaProvider(() => Core.graphics.getDeltaTime() * 60 * multiplier)
            Timer.schedule(() => {
                Time.setDeltaProvider(() => Core.graphics.getDeltaTime() * 60)
                playerUnit.vel.set(0, 0)
                playerUnit.unapply(effects.timestop)
                unitType.accel = oldAccel
                unitType.drag = oldDrag

                Vars.state.rules.lighting = prevLighting
                Vars.state.rules.ambientLight = prevAmbientLight
            }, duration)
        })
    }),

    //    Toggles editor mode
    newCheat("editor mode", "t h i s i s m y w o r l d", 1, () => {
        let isEditor = Vars.state.rules.editor
        if (!isEditor) {
            Vars.state.rules.editor = !isEditor
            Vars.ui.showInfoPopup("Editor Mode enabled.", 2, 1, 1, 1, 1, 1)
        } else {
            Vars.state.rules.editor = !isEditor
            Vars.ui.showInfoPopup("Editor Mode disabled.", 2, 1, 1, 1, 1, 1)
        }
    }),

    newCheat("forhonor", "t h i s i s f o r h o n o r", 1, () => { // dryehm's idea
        Vars.player.unit().kill()
    }),

    newCheat("DOGRESIDUE", "d o g r e s i d u e", 1, () => { // Mindustryenjoyer's idea 
        let core = Vars.player.core()
        Vars.content.items().each(item => {core.items.set(item, core.storageCapacity)})
    }),

    newCheat("third impact", "t u m b l i n g d o w n", 1, () => {
        let playerUnit = Vars.player.unit()
        let unitGroup = Groups.unit

        let playerPosition = {
            x: playerUnit.getX(),
            y: playerUnit.getY()
        }

        let counter = 0

        // wave effect thingy
        let iterations = Math.max(unitGroup.size() / 2, 15)

        for (let i = 0; i < iterations; i++) {
            Timer.schedule(() => {

                let red = new Vec3(1, 0, 0)
                let white = new Vec3(1, 1, 1)
                let black = new Vec3(0, 0, 0)

                let random = Math.random() * 2

                let waveColour
                if (random < 1) {
                    waveColour = red.lerp(black, random)
                } else if (random < 2 && random >= 1) {
                    waveColour = white.lerp(red, random -1)
                } else {
                    waveColour = red.lerp(white, random - 2)
                }

                let wave = new WaveEffect()
                Object.assign(wave, {
                    sizeFrom: 5,
                    sizeTo: 1000,
                    strokeFrom: 0,
                    strokeTo: 100,
                    lifetime: 600,
                });

                wave.colorFrom = new Color(waveColour.x, waveColour.y, waveColour.z, 1)
                wave.colorTo = new Color(waveColour.x, waveColour.y, waveColour.z, 0)
                wave.at(playerPosition.x, playerPosition.y)
            }, i * (.5 * Math.random()))
        }


        // apply the CURSE
        unitGroup.each(unit => {
            counter ++
            if (unit != playerUnit) {
                unit.apply(effects.orangeFantaCurse, (Math.random() * counter * (0.15) + 4) * 60 + 6000)
            }
        })
    }, 2)  

]

module.exports = {
    newCheat: newCheat,
    cheatList: cheatList,
}
