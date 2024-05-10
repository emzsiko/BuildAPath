class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }
  
    create() {

        // key bindings
        this.RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#322671',
            color: '#476ECC',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.add.text(game.config.width / 2, game.config.height / 2,"GAME OVER", scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height / 2) + 50, "Press 'R' to restart", scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height / 2) + 100, "Score: " + score, scoreConfig).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.RKey)) {
            this.scene.start("galleryShooter");
        }
    }
  }