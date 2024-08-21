/* deprecated
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
*/

function randomWithinRadius(minRad, maxRad) {
    let randomRadius = Math.random() * (maxRad - minRad) + minRad;
    let randomAngle = Math.random() * Math.PI * 2

    return {
        x: Math.cos(randomAngle) * randomRadius, 
        y: Math.sin(randomAngle) * randomRadius,
        radius: randomRadius
    }
}

function splash(positionX, positionY, radius, strength, puddles, periodBetweenSplatter, liquid) {

    for (let i = 0; i < puddles; i++) {

        let randomPosition = randomWithinRadius(0, radius)
    
        let tile = Vars.world.tile(randomPosition.x + positionX, randomPosition.y + positionY)

        Timer.schedule(() => {
            Puddles.deposit(tile, liquid, strength / randomPosition.radius)
        }, periodBetweenSplatter * i)
    }
}

function interpolateAngle(start, end, maxValue, amount) {
    let distance = Math.abs(end - start)

    if (distance > maxValue / 2) {
        if (start > end) {
            end += maxValue
        } else {
            start += maxValue
        };
    }

    let interpValue = (start + (end - start) * amount)

    return interpValue % maxValue
}

module.exports = {
    splash: splash,
    interpolateAngle: interpolateAngle,
    randomWithinRadius: randomWithinRadius,
}