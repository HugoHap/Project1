const pangApp = {
    name: 'PANG',
    description: 'Project 1',
    version: '1.0.0',
    author: 'HA & CP',
    license: undefined,

    gameSize: { w: undefined, h: undefined },
    canvasNode: undefined,      /// ¿? ¿? ¿? ¿?
    ctx: undefined,
    player1: undefined,


    init(canvasID) {
        this.canvasNode = document.querySelector(`#${canvasID}`)
        this.ctx = this.canvasNode.getContext('2d')

        this.setDimensions()
        this.createPlayer()
        this.createPlatformStairs()
        this.drawAll()

        this.setEventListeners()
        this.start()
    },

    setDimensions() {
        this.gameSize = {
            w: this.canvasNode.getAttribute('width'),
            h: this.canvasNode.getAttribute('height')
        }
    },




    // Scenario creation and drawing
    drawAll() {
        this.drawGround()
        this.drawHeader()

        this.platform1.draw()
        this.player1.draw()
    },

    drawGround() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 630, this.gameSize.w, 20)
    },

    drawHeader() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.gameSize.w, 45)
    },

    createPlayer() {
        this.player1 = new Player(this.ctx, this.gameSize.w / 2, this.gameSize.h - 95, 75, 75, this.gameSize)
    },

    createPlatformStairs() {
        this.platform1 = new PlatformsStairs(this.ctx, this.gameSize, 300, 375, 700, 300)
    },




    // Player's movement
    setEventListeners() {
        document.onkeyup = event => {
            const { key } = event

            if (key === 'ArrowLeft') {                                      // Bloquear cuando no esté en las dos alturas posibles

                if (this.player1.playerPos.y + this.player1.playerSize.h === this.platform1.platformPos.y) {
                    if (this.player1.playerPos.x <= this.platform1.platformPos.x) {
                    } else {
                        this.player1.moveLeft()
                    }
                } else if (this.player1.playerPos.y + this.player1.playerSize.h !== this.platform1.stairPos.y + this.platform1.stairSize.h && this.player1.playerPos.y + this.player1.playerSize.h !== this.platform1.platformPos.y) {
                } else {
                    this.player1.moveLeft()
                }
            }
            if (key === 'ArrowRight') {                                     // Bloquear cuando no esté en las dos alturas posibles
                if (this.player1.playerPos.y + this.player1.playerSize.h === this.platform1.platformPos.y) {
                    if (this.player1.playerPos.x + this.player1.playerSize.w >= this.platform1.platformPos.x + this.platform1.platformSize.w) {
                    } else {
                        this.player1.moveRight()
                    }
                } else if (this.player1.playerPos.y + this.player1.playerSize.h !== this.platform1.stairPos.y + this.platform1.stairSize.h && this.player1.playerPos.y + this.player1.playerSize.h !== this.platform1.platformPos.y) {
                } else {
                    this.player1.moveRight()
                }
            }
            if (key === 'ArrowUp') {
                if (this.player1.playerPos.x + this.player1.playerSize.w <= this.platform1.stairPos.x + this.platform1.stairSize.w && this.player1.playerPos.x + this.player1.playerSize.w >= this.platform1.stairPos.x) {

                    if (this.player1.playerPos.y + this.player1.playerSize.h <= this.platform1.platformPos.y) {
                        this.player1.playerPos.y = this.platform1.platformPos.y - this.player1.playerSize.h
                    } else {
                        this.player1.moveUp()
                    }
                }
            }
            if (key === 'ArrowDown') {
                if (this.player1.playerPos.x > this.platform1.stairPos.x && this.player1.playerPos.x < this.platform1.stairPos.x + this.platform1.stairSize.w) {

                    if (this.player1.playerPos.y >= this.gameSize.h - 95) {
                        this.player1.playerPos.y = this.gameSize.h - 95
                    } else {
                        this.player1.moveDown()
                    }
                }
            }
        }
    },

    start() {
        setInterval(() => {
            this.clearAll()
            this.drawAll()
        }, 30)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    }

}