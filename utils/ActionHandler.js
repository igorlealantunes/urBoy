import { Projectile } from "../models/Projectile.js";

class ActionHandler {

    constructor({ fighter, appData }) {
        this.fighter = fighter;
        this.appData = appData;

        this.isListening = true
    }

    setIsListening(isListening) {
        this.isListening = isListening
    }

    handle(key) {
        if (!this.isListening) {
            console.log('Not listening')
            return
        }
        const fighterMovingKeys = ['KeyW', 'KeyA', 'KeyS', 'KeyD'];

        if (fighterMovingKeys.includes(key.code)) {
            this.fighter.move(key);
        }
        else if (key.code === 'KeyJ') {
            this._handleFirstAttack()
        }
        else if (key.code === 'KeyK') {
            this._handleSecondAttack()
        }
    }

    _handleFirstAttack() {
        this.fighter.firstAttack()

        const fighterX = this.fighter.animatedSprite.x
        const fighterY = this.fighter.animatedSprite.y
        const fighterReachX = this.fighter.animatedSprite.width / 2
        const fighterReachY = this.fighter.animatedSprite.height / 2

        this.appData.enemies.filter(e => e.life > 0).forEach(enemy => {
            const enemyX = enemy.animatedSprite.x
            const enemyY = enemy.animatedSprite.y
            const enemyReach = enemy.animatedSprite.width / 2

            if (Math.abs(fighterY - enemyY) > fighterReachY) return

            if (this.fighter.isFacingRight) {
                const reachX = fighterX + fighterReachX + enemyReach
                if (enemyX > fighterX && reachX > enemyX) { // fighter is within reach of enemy
                    enemy.sufferDamage({ fighter: this.fighter, lifeAmount: 30 })
                }
            } else {
                const reachX = fighterX - fighterReachX - enemyReach
                if (enemyX < fighterX && reachX < enemyX) { // fighter is within reach of enemy
                    enemy.sufferDamage({ fighter: this.fighter, lifeAmount: 30 })
                }
            }
        })
    }
    _handleSecondAttack() {
        if (this.fighter.isAttacking) return
        this.fighter.secondAttack()
        const projectile = new Projectile({
            x: this.fighter.animatedSprite.x,
            y: this.fighter.animatedSprite.y,
            direction: this.fighter.isFacingRight ? 'right' : 'left',
        })

        this.appData.projectiles.push(projectile)
        app.stage.addChild(projectile.animatedSprite);
    }
}


export { ActionHandler }
