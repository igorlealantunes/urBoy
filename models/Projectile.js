class Projectile {

    constructor({ x, y, direction }) {
        this.sprite = PIXI.BaseTexture.from(window.app.loader.resources['firen'].url);
        this.direction = direction
        this.damage = 20
        this.isExploding = false
        this.hasExploded = false

        const hOffset = 180
        const wOffset = 0
        const w = 85;
        const h = 77;

        this.isFacingRight = true

        this.travelling = [
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(wOffset + 0 * w, hOffset + 18 * h, w, h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(wOffset + 1 * w, hOffset + 18 * h, w, h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(wOffset + 2 * w, hOffset + 18 * h, w, h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(wOffset + 3 * w, hOffset + 18 * h, w, h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(wOffset + 4 * w, hOffset + 18 * h, w, h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(wOffset + 5 * w, hOffset + 18 * h, w, h)),
        ]
        this.exploding = [
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(wOffset + 6 * w, hOffset + 18 * h, w, h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(wOffset + 7 * w, hOffset + 18 * h, w, h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(wOffset + 8 * w, hOffset + 18 * h, w, h)),
        ]

        this.animatedSprite = new PIXI.AnimatedSprite(this.travelling)

        this.animatedSprite.animationSpeed = 0.1
        this.animatedSprite.loop = true
        this.animatedSprite.anchor.set(0.5, 0.5)
        this.animatedSprite.play()
        this.animatedSprite.x = x
        this.animatedSprite.y = y
    }

    move () {
        if (this.isExploding) return
        if (this.animatedSprite.x < 0 || this.animatedSprite.x > app.screen.width) {
            this.explode()
        }

        if (this.direction === 'right') {
            this.animatedSprite.x += 10
        } else if (this.direction === 'left') {
            this.animatedSprite.x -= 10
            if (this.animatedSprite.scale.x > 0) {
                this.animatedSprite.scale.x *= -1
            }
        } else if (this.direction === 'up') {
            this.animatedSprite.y -= 10
        } else if (this.direction === 'down') {
            this.animatedSprite.y += 10
        }
    }

    isHitting ({ thing }) {
        return this.animatedSprite.getBounds().contains(thing.animatedSprite.x, thing.animatedSprite.y)
    }

    explode () {
        this.isExploding = true
        this.animatedSprite.textures = this.exploding
        this.animatedSprite.loop = false
        this.animatedSprite.play()
        this.animatedSprite.onComplete = () => {
            this.isExploding = false
            this.hasExploded = true
            app.stage.removeChild(this.animatedSprite)
        }
    }
}

export { Projectile }
