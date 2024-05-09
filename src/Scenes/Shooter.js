class Shooter extends Phaser.Scene {

    constructor(){
        super("galleryShooter");
        this.my = {sprite: {}, emittedSprites: []};
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
        //my.sprite.cloud = this.add.sprite(500, 600, "cloud");
        my.sprite.cloud = new Cloud(this, game.config.width/2, 600, "cloud", null, this.DKey, this.AKey, 4);
        my.sprite.cloud.setScale(.5);

    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        // screen boundaries
        const screenBounds = {
            left: 0,
            right: 1000,
            top: 0,
            bottom: 800
        }

        my.sprite.cloud.update();

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
    }
}