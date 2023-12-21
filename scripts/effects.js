const vars = require("cheat-codes/vars")

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

  module.exports = {
    quickfox: quickfox,
    timestop: timestop,
  }
