const keys = "num1, num2, num3, num4, num5, num6, num7, num8, num9, num0, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, up, down, left, right, space, enter".split(", ")

function getKeyTap(){
    let key
    for (let i = 0; i < keys.length; i++) {
        if (Core.input.keyTap(KeyCode[keys[i]])) {
            key = keys[i]
            break
        }
    }
    if (key != undefined) {
        return key
    } else {
        return false
    }
}

function splash(positionX, positionY, radius, strength, puddles, periodBetweenSplatter, liquid) {
    for (let i = 0; i < puddles; i++) {
        let randomRadius = Math.random() * radius
        let randomAngle = Math.random() * Math.PI * 2
    
        let tile = Vars.world.tile(Math.cos(randomAngle) * randomRadius + positionX, Math.sin(randomAngle) * randomRadius + positionY)

        Timer.schedule(() => {
            Puddles.deposit(tile, liquid, strength / randomRadius)
        }, periodBetweenSplatter * i)
    }
}

module.exports = {
    getKeyTap: getKeyTap,
    splash: splash,
}