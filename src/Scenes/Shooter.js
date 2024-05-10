class Shooter extends Phaser.Scene {

    constructor() {
        super("galleryShooter");
        this.my = {sprite: {}, emittedSprites: []};

        this.my.sprite.bullet = [];
        this.maxBullets = 10;

        this.score = 0;
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

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#322671',
            color: '#476ECC',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(this.score, scoreConfig);

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

        // enemy array
        this.enemies = [this.fly1, this.fly2, this.fly3];

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

        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));

        for (let bullet of my.sprite.bullet) {
            for (let enemy of this.enemies) {
                if (this.collides(enemy, bullet)) {
                    // clear out bullet -- put y offscreen, will get reaped next update
                    bullet.y = -100;
                    enemy.visible = false;
                    enemy.x = -100;
                    // update score
                    this.score += enemy.pointValue;
                    this.updateScore();
                    /*
                    // Play sound
                    this.sound.play("dadada", {
                        volume: 1   // Can adjust volume using this, goes from 0 to 1
                    });
                    // Have new hippo appear after end of animation
                    this.puff.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                        this.my.sprite.hippo.visible = true;
                        this.my.sprite.hippo.x = Math.random()*config.width;
                    }, this);
                    */
                }
            }
        }

        // make all of the bullets move
        for (let bullet of my.sprite.bullet) {
            bullet.setScale(0.3);
            bullet.y -= this.bulletSpeed;
        }

        my.sprite.cloud.update();
        this.fly1.update();
        this.fly2.update();
        this.fly3.update();
    }

    // A center-radius AABB collision check
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    updateScore() {
        this.scoreLeft.text = "Score: " + this.score;
    }
}