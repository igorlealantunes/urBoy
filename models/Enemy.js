class Enemy {
    constructor() {
        this.sprite = PIXI.BaseTexture.from(app.loader.resources['enemy'].url);

        this.scoreAmount = 10;
        this.damage = 1
        this.life = 50 + (Math.random() * 300)
        this.isDead = false
        this.speed = 0.3 + (1.2*Math.random())
        this.animations = this.getAnimations()
        this.draw()
    }

    getAnimations () {
        const hOffset = 20
        const wOffset = 0
        const w = 58;
        const h = 85;

        const standing = [
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(wOffset + 0*w, hOffset, w, h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(wOffset + 1*w, hOffset, w, h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(wOffset + 2*w, hOffset, w, h)),
        ]

        return {
            standing
        }
    }

    isHitting ({ thing }) {
        return this.animatedSprite.getBounds().contains(thing.animatedSprite.x, thing.animatedSprite.y)
    }

    draw () {
        if (!this.animatedSprite)
            this.animatedSprite = new PIXI.AnimatedSprite(this.animations.standing)

        this.animatedSprite.animationSpeed = 0.1
        this.animatedSprite.loop = true
        this.animatedSprite.anchor.set(0.5, 0.5)
        this.animatedSprite.play()

        this.animatedSprite.alpha = 1

        this.animatedSprite.x = 600 + Math.random() * 200
        this.animatedSprite.y = Math.random() * 600
    }

    move (target) {
        this.animatedSprite.x += target.animatedSprite.x > this.animatedSprite.x ? this.speed : -this.speed
        this.animatedSprite.y += target.animatedSprite.y > this.animatedSprite.y ? this.speed : -this.speed
        this.facePlayer(target)
    }

    killMe () {
        this.animatedSprite.tint = null
        this.isDead = true
        setTimeout(() => {
            app.stage.removeChild(this.animatedSprite)
        }, 500)
    }

    facePlayer (target) {
        const diff = parseInt(target.animatedSprite.x - this.animatedSprite.x)
        if (diff > 0 && this.animatedSprite.scale.x > 0) this.animatedSprite.scale.x *= -1
        if (diff < 0 && this.animatedSprite.scale.x < 0) this.animatedSprite.scale.x *= -1
    }

    sufferDamage ({ fighter, lifeAmount }) {
        this.life -= lifeAmount
        this.animatedSprite.tint = 0xff0000;
        this.animatedSprite.x += (fighter.animatedSprite.x > this.animatedSprite.x ? -1 : 1) * 25

        setTimeout(() => {
            this.animatedSprite.tint = 0xFFFFFF;
        }, 300)
    }

}

export { Enemy }
