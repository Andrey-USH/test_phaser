const gameState = {
    speed: 240,
    ups: 380,
    width: 1500,
    height: 600,
};

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
    }

    preload() {

        this.load.image('long', './Image/long.png')
        this.load.image('platform', './Image/platform.png')
        this.load.spritesheet('bot', './Image/bot', { frameWidth: 61, frameHeight: 64 })
    }

    create() {

        gameState.active = true;

        gameState.long = this.add.image(0, 0, 'long').setOrigin(0)
        gameState.player = this.physics.add.sprite(250, 358, 'bot')
        
        gameState.platforms = this.physics.add.staticGroup();

        gameState.platforms.create(750, 400, 'platform')

        this.createAnimations();

        this.cameras.main.setBounds(0, 0, gameState.width, gameState.height)
        this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
        this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5);

        gameState.player.setCollideWorldBounds(true);
        this.physics.add.collider(gameState.player, gameState.platforms);

        gameState.cursors = this.input.keyboard.createCursorKeys();
    }

    createAnimations() {

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('bot', { start: 144, end: 147 }, true),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('bot', { start: 27, end: 28 }, true),
            frameRate: 5,
            repeat: -1
        })
    }

    update() {

        if (gameState.active) {
            if (gameState.cursors.right.isDown) {
                gameState.player.setVelocityX(250)
                gameState.player.anims.play('run', true)
                gameState.player.flipX = false
            }
            else if (gameState.cursors.left.isDown) {
                gameState.player.setVelocityX(-250)
                gameState.player.anims.play('run', true)
                gameState.player.flipX = true
            }
            else {
                gameState.player.setVelocityX(0)
                gameState.player.anims.play('idle', true)
            }
        }
    }
}
