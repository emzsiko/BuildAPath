class Controls extends Phaser.Scene {
    constructor() {
        super("controls");
        this.my = {sprite: {}};

        this.moveUp = true;
    }

    preload() {
        this.load.setPath("./assets/"); // set load path

        // player
        this.load.image("cloud", "cloud.png"); // cloud
        this.load.image("cloudShadow", "shadow.png"); // cloud shadow

        // enemy
        this.load.image("wingEnemy", "wingMan2.png"); // winged enemy

        // lightning
        this.load.image("lightning", "lighting_yellow.png"); // player's lightning bolt

        // bg
        this.load.image("bg", "GalleryShooterBG.png");
    }
  
    create() {
        let my = this.my;

        // bg
        this.cloudbg = this.add.tileSprite(0, 0, 1000, 600, 'bg').setOrigin(0, 0);

        // enemy
        my.sprite.wingEnemy1 = this.add.sprite(150, game.config.height/2, "wingEnemy");
        my.sprite.wingEnemy1.setScale(0.6);
        my.sprite.wingEnemy2 = this.add.sprite(850, game.config.height/2, "wingEnemy");
        my.sprite.wingEnemy2.setScale(0.6);

        // key bindings
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

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

        this.add.text(game.config.width / 2, 150, "CONTROLS", scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 250, "Move right: 'D'", scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 300, "Move left: 'A'", scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 350, "Shoot: 'Space Bar'", scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 450, "Press 'S' to start", scoreConfig).setOrigin(0.5);
    }

    update() {
        let my = this.my;

        // start game
        if (Phaser.Input.Keyboard.JustDown(this.SKey)) {
            this.scene.start("galleryShooter");
        }

        // enemy movement
        if (this.moveUp === true) {
            my.sprite.wingEnemy1.y -= 2;
            my.sprite.wingEnemy2.y -= 2;

            if (my.sprite.wingEnemy1.y <= (game.config.height/2 - 100)) {
                this.moveUp = false;
            }
        }

        if (this.moveUp === false) {
            my.sprite.wingEnemy1.y += 2;
            my.sprite.wingEnemy2.y += 2;

            if (my.sprite.wingEnemy1.y >= (game.config.height/2 + 100)) {
                this.moveUp = true;
            }
        }
    }
  }