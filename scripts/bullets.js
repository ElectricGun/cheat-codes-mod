const functions = require("cheat-codes/functions")

function purpleNuke() {

    const waveEffect = extend(WaveEffect, {
        lifetime: 600,
        strokeFrom: 1000,
        strokeTo: 10000,
        sizeTo: 1500,
        colorFrom: Pal.reactorPurple2,
        colorTo: new Color(1, 1, 1, 0)
    })

    const effect = new MultiEffect(waveEffect)

    const purpleNuke = extend(BulletType, {
        collides: false,
        
        hitsound: Sounds.explosion,

        instantDisappear: true,
        despawnHit: true,

        splashDamage: 100000000,
        splashDamageRadius: 617,

        pierce: true,

        hitEffect: effect
    })

    return purpleNuke
}

function atomicBullet(lifetime, speed, length, size, followStrength, followUnit) {

    const atomicBullet = extend(BulletType, {
        damage: 0,
        speed: speed,
        lifetime: 100000,
        hitSize: 0,
        collides: false,
        drag: 0,
        hittable: false,
        reflectable: false,
        absorbable: false,

        init(b) {
            if (!b) return

            this.super$init(b)
            b.data = new Trail(length);
        },
        update(b) {
            this.super$update(b)

            b.data.update(b.x, b.y)

            let unitX = followUnit.getX()
            let unitY = followUnit.getY()

            let angleBetween = Math.atan2(unitY - b.y, unitX - b.x) * (180 / Math.PI)

            let lifetimeMultiplier = Math.min(b.time / lifetime, 1)

            // prevent circling
            let circlingPreventionRange = 100
            let circlingPreventionMultiplier = Math.max((circlingPreventionRange - Math.min(Mathf.len(unitY - b.y, unitX - b.x), circlingPreventionRange)) / circlingPreventionRange * 60, 1)

            let newAngle = functions.interpolateAngle(b.rotation(), angleBetween, 360, Core.graphics.getDeltaTime() * Math.min(100, followStrength * lifetimeMultiplier * circlingPreventionMultiplier))

            // activate thingy and freeze when near the followUnit
            if (Mathf.len(unitY - b.y, unitX - b.x) < 8 && b.vel.len() > 0) {

                b.vel.set(new Vec2(0, 0))

                // placeholder effect
                Fx.reactorExplosion.at(b.x, b.y)

                let allBullets = Groups.bullet
                let similarBulletCounter = 0

                // chceck how many bullets are of this type with velocity of > 0
                allBullets.forEach(bullet => {
                    if (bullet.type == b.type && bullet.vel.len() > 0) {
                        similarBulletCounter += 1
                    }
                })

                if (similarBulletCounter <= 0) {


                    // explosion
                    Call.createBullet(purpleNuke(), followUnit.team, unitX, unitY, 0, 0, 0, 0)

                    // destroy all units that isn't the player, might change this

                    // fix this
                    Groups.unit.each(
                        u => {
                            print(u)

                            if (u != followUnit) {
                                u.kill()
                            }
                        }
                    )
                }
            }

            b.rotation(newAngle)
            
        },
        draw(b) {
            this.super$draw(b)
            b.data.draw(Color.valueOf("bc50ff"), size)
        }
    })

    return atomicBullet
}

module.exports = {
    atomicBullet: atomicBullet,
    purpleNuke: purpleNuke,
}