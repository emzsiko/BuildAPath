class Shooter extends Phaser.Scene {

    constructor() {
        super("galleryShooter");
        this.my = {sprite: {}, emittedSprites: []};

        this.my.sprite.bullet = [];
        this.maxBullets = 10;
    }

    preload() {
        this.load.setPath("./assets/"); // set load path
        // player
        this.load.image("cloud", "cloud.png"); // cloud
        // assets
        this.load.image("enemyFlame", "flame.png"); // enemy's bullet
        this.load.image("lightning", "lighting_yellow.png"); // player's lightning bolt
        this.load.image("heart", "platformPack_item017.png"); // heart icon
        // enemies
        this.load.image("fly", "fly_fly.png"); // fly enemy
        this.load.image("aircraft", "playerShip1_blue.png"); // aircraft enemy
        this.load.image("wingEnemy", "wingMan2.png"); // winged enemy

    }

    create() {
        let my = this.my;

        // Define key bindings
        this.ESCKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.oKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // creating player sprite
        my.sprite.cloud = new Cloud(this, game.config.width/2, game.config.height - 40, "cloud", null, this.DKey, this.AKey, 5);
        my.sprite.cloud.setScale(.4);

        // enemy sprites (flies)
        // move speed
        this.flyMoveSpeed = 3;
        this.fly1 = new Enemy(this, 1000, Phaser.Math.Between(50, 400), "fly", null, this.flyMoveSpeed, 10, 0);
        this.fly2 = new Enemy(this, 1000, Phaser.Math.Between(50, 400), "fly", null, this.flyMoveSpeed, 10, 3000);
        this.fly3 = new Enemy(this, 1000, Phaser.Math.Between(50, 400), "fly", null, this.flyMoveSpeed, 10, 5000);

        this.bulletSpeed = 6;

    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

       // check for bullet being fired
       if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            // are we under our bullet quota?
            if (my.sprite.bullet.length < this.maxBullets) {
                my.sprite.bullet.push(this.add.sprite(
                    my.sprite.cloud.x, my.sprite.cloud.y-(my.sprite.cloud.displayHeight/2), "lightning")
                );
            }
        }

    // Make all of the bullets move
        for (let bullet of my.sprite.bullet) {
            bullet.setScale(0.3);
            bullet.y -= this.bulletSpeed;
        }

        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));

        my.sprite.cloud.update();
        this.fly1.update();
        this.fly2.update();
        this.fly3.update();
    }
}