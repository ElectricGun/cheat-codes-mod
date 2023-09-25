const vars = require("/vars")

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
    unit.speedMultiplier = 1 / timeMultiplier
    unit.reloadMultiplier = multiplier
    unit.dragMultiplier = multiplier
    unit.damageMultiplier = multiplier
}
})

  module.exports = {
    quickfox: quickfox,
    timestop: timestop,
  }
