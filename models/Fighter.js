const MOVEMENT_SIZE = 60;

class Fighter {
    constructor() {
        this.sprite = PIXI.BaseTexture.from(window.app.loader.resources['firen'].url);

        this.spriteCords = {
            hOffset: 165,
            wOffset: 0,
            w: 80,
            h: 90,
        }

        this.life = 100
        this.isFacingRight = true
        this.isAttacking = false

        this.isWalking = false
        this.standing = [
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(this.spriteCords.wOffset + 0*this.spriteCords.w, this.spriteCords.hOffset, this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(this.spriteCords.wOffset + 1*this.spriteCords.w, this.spriteCords.hOffset, this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(this.spriteCords.wOffset + 2*this.spriteCords.w, this.spriteCords.hOffset, this.spriteCords.w, this.spriteCords.h)),
        ]
        this.animatedSprite = new PIXI.AnimatedSprite(this.standing)

        this.animatedSprite.animationSpeed = 0.1
        this.animatedSprite.loop = true
        this.animatedSprite.anchor.set(0.5, 0.5)
        this.animatedSprite.play()
        this.animatedSprite.x = 400
        this.animatedSprite.y = 400
    }

    _moveSmoothly({ amount, varName}) {
        const chunkSizeX = 5;
        const chunkSizeY = 3 // simulates a little jump

        let currentAmountX = 0

        const interval = setInterval(() => {
            if (currentAmountX >= Math.abs(amount)) {
                this.isWalking = false
                clearInterval(interval)
                return
            }
            this.animatedSprite[varName] += chunkSizeX * (amount > 0 ? 1 : -1)
            currentAmountX += chunkSizeX

            if (currentAmountX < Math.abs(amount) / 2) {
                this.animatedSprite.y += chunkSizeY
            } else {
                this.animatedSprite.y -= chunkSizeY
            }
        }, 15);
    }

    move (key) {
        if (this.isWalking) return
        this.isWalking = true
        if (key.code === 'KeyW') {
            this._moveSmoothly({ amount: -MOVEMENT_SIZE, varName: 'y' })
        }
        else if (key.code === 'KeyS') {
            this._moveSmoothly({ amount: MOVEMENT_SIZE, varName: 'y' })
        }
        else if (key.code === 'KeyA') {
            this._moveSmoothly({ amount: -MOVEMENT_SIZE, varName: 'x' })
            this.isFacingRight = false
            this.animatedSprite.scale.x = -1 * Math.abs(this.animatedSprite.scale.x)
        }
        else if (key.code === 'KeyD') {
            this._moveSmoothly({ amount: MOVEMENT_SIZE, varName: 'x' })
            this.isFacingRight = true
            this.animatedSprite.scale.x = Math.abs(this.animatedSprite.scale.x)
        }

         this.animatedSprite.textures = [
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(0 * this.spriteCords.w, 115 + (6 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(1 * this.spriteCords.w, 115 + (6 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(2 * this.spriteCords.w, 115 + (6 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(3 * this.spriteCords.w, 115 + (6 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(4 * this.spriteCords.w, 115 + (6 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
        ]
        this.animatedSprite.loop = false
        this.animatedSprite.animationSpeed = 0.4
        this.animatedSprite.play()
         this.animatedSprite.onComplete = () => {
            this.isWalking = false
            this.animatedSprite.textures = this.standing
        }
    }

    firstAttack() {
        this.animatedSprite.textures = [
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(this.spriteCords.wOffset + 0 * this.spriteCords.w, this.spriteCords.hOffset + 1 * this.spriteCords.h, this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(this.spriteCords.wOffset + 1 * this.spriteCords.w, this.spriteCords.hOffset + 1 * this.spriteCords.h, this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(this.spriteCords.wOffset + 2 * this.spriteCords.w, this.spriteCords.hOffset + 1 * this.spriteCords.h, this.spriteCords.w, this.spriteCords.h)),
        ]
        this.animatedSprite.loop = false
        this.animatedSprite.play()
        this.animatedSprite.onComplete = () => {
            this.isAttacking = false
            this.animatedSprite.textures = this.standing
        }
    }

    secondAttack() {
        this.isAttacking = true
        this.animatedSprite.textures = [
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(0 * this.spriteCords.w, 150 + (12 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(1 * this.spriteCords.w, 150 + (12 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(2 * this.spriteCords.w, 150 + (12 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(3 * this.spriteCords.w, 150 + (12 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(4 * this.spriteCords.w, 150 + (12 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
        ]
        this.animatedSprite.loop = false
        this.animatedSprite.animationSpeed = 0.2
        this.animatedSprite.play()
        this.animatedSprite.onComplete = () => {
            this.animatedSprite.textures = this.standing
            this.isAttacking = false
        }
        setTimeout(() => { this.isAttacking = false }, 200)
    }

    sufferDamage ({ lifeAmount, fromThing }) {
        this.life -= lifeAmount
        this.animatedSprite.tint = 0xff0000
        this.animatedSprite.x += (this.animatedSprite.x < fromThing.animatedSprite.x ? -1 : 1) * 25

        this.animatedSprite.textures = [
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(0 * this.spriteCords.w, 160 + (11 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(1 * this.spriteCords.w, 160 + (11 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(2 * this.spriteCords.w, 160 + (11 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(3 * this.spriteCords.w, 160 + (11 * this.spriteCords.h), this.spriteCords.w, this.spriteCords.h)),
        ]
        this.animatedSprite.loop = false
        this.animatedSprite.animationSpeed = 0.4
        this.animatedSprite.play()
        this.animatedSprite.onComplete = () => {
            this.animatedSprite.textures = this.standing
            this.animatedSprite.tint = 0xFFFFFF
        }
        setTimeout(() => { this.animatedSprite.tint = 0xFFFFFF }, 200)
    }

    gainLife ({ lifeAmount }) {
        this.life += lifeAmount
    }


}

export { Fighter }
