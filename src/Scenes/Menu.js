class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
        this.my = {sprite: {}};

        this.moveRight = true;
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

        // player
        my.sprite.cloud = this.add.sprite(game.config.width/2, game.config.height/2 + 50, "cloud");
        my.sprite.cloud.setDepth(1);
        my.sprite.cloud.setScale(0.4);
        // shadow for player
        my.sprite.cloudShadow = this.add.sprite(my.sprite.cloud.x, my.sprite.cloud.y, "cloudShadow");
        my.sprite.cloudShadow.setAlpha(0.2); // set shadow opacity
        my.sprite.cloudShadow.setScale(0.43); // adjust shadow scale
        my.sprite.cloudShadow.setDepth(0); // ensure shadow is behind the cloud

        // bolt
        my.sprite.lightning = this.add.sprite(game.config.width/2, game.config.height/2 - 30, "lightning");
        my.sprite.lightning.setScale(0.5);

        // key bindings
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

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

        this.add.text(game.config.width / 2, 150, "BOLT BLASTER", scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, 450, "Press 'S' to start", scoreConfig).setOrigin(0.5);
    }

    update() {
        let my = this.my;

        // start game
        if (Phaser.Input.Keyboard.JustDown(this.SKey)) {
            this.scene.start("controls");
        }

        // cloud movement
        if (this.moveRight === true) {
            my.sprite.cloud.x += 1;
            my.sprite.cloudShadow.x += 1;
            my.sprite.lightning.x += 1;

            if (my.sprite.cloud.x >= (game.config.width/2 + 40)) {
                this.moveRight = false;
            }
        }

        if(this.moveRight === false) {
            my.sprite.cloud.x -= 1;
            my.sprite.cloudShadow.x -= 1;
            my.sprite.lightning.x -= 1;

            if (my.sprite.cloud.x <= (game.config.width/2 - 40)) {
                this.moveRight = true;
            }
        }
    }
  }