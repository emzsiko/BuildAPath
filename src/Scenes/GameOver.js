class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    preload() {
        this.load.setPath("./assets/"); // set load path

        // bg
        this.load.image("bg", "GalleryShooterBG.png");
    }
  
    create() {

        // bg
        this.cloudbg = this.add.tileSprite(0, 0, 1000, 600, 'bg').setOrigin(0, 0);

        // key bindings
        this.RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        let scoreConfig = {
            fontFamily: 'monospace',
            fontSize: '25px',
            fontStyle: 'italic',
            backgroundColor: '#f1f1f1',
            color: '#Ffc94f',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                right: 5,
                left: 5,
            },
        }

        this.add.text(game.config.width / 2, (game.config.height / 2) - 50,"GAME OVER", scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, "Press 'R' to restart", scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height / 2) + 50, "Score: " + score, scoreConfig).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.RKey)) {
            score = 0;
            this.scene.start("galleryShooter");
        }
    }
  }