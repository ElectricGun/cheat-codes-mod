const quickfox = extend(StatusEffect, "quickfox", {
    speedMultiplier: 4,
    isHidden(){
        return true
    },
  })

const timestop = extend(StatusEffect, "timestop", {
update(unit, time) {
  let multiplier = 1 / .05
    unit.speedMultiplier = 1 / Math.pow(.05, 2)
    unit.reloadMultiplier = multiplier * 4
    unit.dragMultiplier = multiplier
    unit.damageMultiplier = multiplier
}
})

  module.exports = {
    quickfox: quickfox,
    timestop: timestop,
  }
