class Life {

    constructor({ x, y }) {
        this.sprite = PIXI.BaseTexture.from(window.app.loader.resources['potion'].url);

        this.lifeAmount = 10
        this.isUsed = false

        this.standing = [
            new PIXI.Texture(this.sprite, new PIXI.Rectangle(0, 0, 50, 50)),
        ]
        this.animatedSprite = new PIXI.AnimatedSprite(this.standing)

        this.animatedSprite.loop = false
        this.animatedSprite.anchor.set(0.5, 0.5)
        this.animatedSprite.play()
        this.animatedSprite.x = x
        this.animatedSprite.y = y
    }

    isHitting ({ thing }) {
        return this.animatedSprite.getBounds().contains(thing.animatedSprite.x, thing.animatedSprite.y)
    }

    destroyPotion ({}) {
        this.isUsed = true
        app.stage.removeChild(this.animatedSprite)
    }


}

export { Life }
