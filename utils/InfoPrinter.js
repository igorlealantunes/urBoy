class InfoPrinter {
    constructor() {
        this.lifeBaseTexture = PIXI.BaseTexture.from(window.app.loader.resources['doom-face'].url)
        this.lifeSprite = null

        this._printScore()
        this._printFaceLife()
        this.previousLive = null
    }
    gameOver () {
        const gameOverSprite = new PIXI.Text(`GAME OVER`, {
            fontFamily: 'Arial',
            fontSize: 80,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ff0000', '#000000'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 600,
            lineJoin: 'round',
        });
        gameOverSprite.x = 200;
        gameOverSprite.y = 200;

        app.stage.addChild(gameOverSprite);

        setTimeout(() => {
            gameOverSprite.text += `\n\nSEU NOOB!`
        }, 2000)
    }
    updateScore ({ score }) {
        this.scoreText.text = `Score: ${score}`
    }
    updateLife ({ life }) {
        if (this.previousLive === life) return
        this.previousLive = life

        this.lifeText.text = `Life: ${life}`

        const h = 60
        const w = 45

        let startH = 0
        if (life >= 80) {
            startH = 0
        } else if (life >= 60) {
            startH = 1
        } else if (life >= 40) {
            startH = 2
        } else if (life >= 20) {
            startH = 3
        } else {
            startH = 4
        }

        this.lifeSprite.textures = [
            new PIXI.Texture(this.lifeBaseTexture, new PIXI.Rectangle(0*w, startH * h, w, h)),
            new PIXI.Texture(this.lifeBaseTexture, new PIXI.Rectangle(1*w, startH * h, w, h)),
            new PIXI.Texture(this.lifeBaseTexture, new PIXI.Rectangle(2*w, startH * h, w, h)),
            new PIXI.Texture(this.lifeBaseTexture, new PIXI.Rectangle(3*w, startH * h, w, h)),
            new PIXI.Texture(this.lifeBaseTexture, new PIXI.Rectangle(4*w, startH * h, w, h)),
            new PIXI.Texture(this.lifeBaseTexture, new PIXI.Rectangle(5*w, startH * h, w, h)),
        ]
        this.lifeSprite.loop = true
        this.lifeSprite.play()
    }
    _printScore () {
        this.scoreText = new PIXI.Text(``, {
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });
        this.scoreText.x = 0;
        this.scoreText.y = 750;

        app.stage.addChild(this.scoreText);
    }
    _printFaceLife () {
        const h = 50
        const w = 50

        this.lifeSprite = new PIXI.AnimatedSprite([
            new PIXI.Texture(this.lifeBaseTexture, new PIXI.Rectangle(0, 0, w, h)),
        ])

        this.lifeSprite.animationSpeed = 0.03
        this.lifeSprite.loop = true
        this.lifeSprite.anchor.set(0.5, 0.5)
        this.lifeSprite.play()
        this.lifeSprite.x = 400
        this.lifeSprite.y = 770

        app.stage.addChild(this.lifeSprite);

        this.lifeText = new PIXI.Text(`Life: `, {fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#ff0000'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });

        this.lifeText.x = 500;
        this.lifeText.y = 750;

        app.stage.addChild(this.lifeText);
    }
}

export { InfoPrinter }
