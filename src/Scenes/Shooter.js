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

        // creating sprites
        my.sprite.cloud = new Cloud(this, game.config.width/2, game.config.height - 40, "cloud", null, this.DKey, this.AKey, 5);
        my.sprite.cloud.setScale(.4);

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

        // Remove all of the bullets which are offscreen
        // filter() goes through all of the elements of the array, and
        // only returns those which **pass** the provided test (conditional)
        // In this case, the condition is, is the y value of the bullet
        // greater than zero minus half the display height of the bullet? 
        // (i.e., is the bullet fully offscreen to the top?)
        // We store the array returned from filter() back into the bullet
        // array, overwriting it. 
        // This does have the impact of re-creating the bullet array on every 
        // update() call. 
        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));

        my.sprite.cloud.update();

    /*
        // lightning bolt bullet
        if(Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            // creates sprite to emit
            let emittedSprite = this.add.sprite(my.sprite.cloud.x, my.sprite.cloud.y, "lightning");
            // add sprites to list
            my.emittedSprites.push(emittedSprite);
        }

        // move upwards
        for (let i = 0; i < my.emittedSprites.length; i++) {
            let emittedSprite = my.emittedSprites[i];
            emittedSprite.y -= 8;

            // check if in bounds or not
            if (emittedSprite.y < screenBounds.top) {
                emittedSprite.destroy();
                my.emittedSprites.splice(i, 1);
                i--;
            }
        }
        */
    }
}