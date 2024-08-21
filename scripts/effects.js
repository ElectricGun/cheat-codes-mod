const vars = require("cheat-codes/vars")
const functions = require("cheat-codes/functions")


const quickfox = extend(StatusEffect, "quickfox", {
    speedMultiplier: 4,
    isHidden(){
        return true
    },
  })

const timestop = extend(StatusEffect, "timestop", {
update(unit, time) {
  let timeMultiplier = vars.timeStopMultiplier
  let multiplier = 1 / timeMultiplier
    unit.speedMultiplier = 1 / (timeMultiplier * .05)
    unit.reloadMultiplier = multiplier * 2
    unit.dragMultiplier = multiplier
    unit.damageMultiplier = 1
}
})

const instrumentality = extend(StatusEffect, "instrumentality", {
  onRemoved(unit) {

  },
  update(unit, time) {
    if (time <= 6000) {
      let unitPosition = {
        x: unit.getX() / 8,
        y: unit.getY() / 8
      }

      let randomRadius = Math.random() * 5
      let randomAngle = Math.random() * Math.PI * 2

      let splashPosition  = {
          x: Math.cos(randomAngle) * randomRadius + unitPosition.x,
          y: Math.sin(randomAngle) * randomRadius + unitPosition.y
      }

      //splatter

      unit.health = 0
      functions.splash(splashPosition.x, splashPosition.y, unit.hitSize, unit.hitSize * 5, unit.hitSize * 25, 0.0025, Liquids.slag)
    }
  }
})

module.exports = {
  quickfox: quickfox,
  timestop: timestop,
  instrumentality: instrumentality,
}
