class Shooter extends Phaser.Scene {

    constructor() {
        super("galleryShooter");
        this.my = {sprite: {}};

        this.my.sprite.bullet = [];
        this.maxBullets = 10;

        this.my.sprite.enemyBullet = [];

        this.score = 0;
        this.playerHealth = 3;
    }

    preload() {
        this.load.setPath("./assets/"); // set load path
        // player
        this.load.image("cloud", "cloud.png"); // cloud
        // enemies
        this.load.image("fly", "fly_fly.png"); // fly enemy
        this.load.image("aircraft", "playerShip1_blue.png"); // aircraft enemy
        this.load.image("wingEnemy", "wingMan2.png"); // winged enemy
        // assets
        this.load.image("flame", "flame.png"); // enemy's bullet
        this.load.image("lightning", "lighting_yellow.png"); // player's lightning bolt
        this.load.image("heart", "platformPack_item017.png"); // heart icon

        // audio
        this.load.audio("bulletFire", "impactWood_medium_003.ogg");
        this.load.audio("impact", "impactPunch_medium_000.ogg");
        this.load.audio("enemyFire", "impactTin_medium_001.ogg");

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

        // setting health bar
        my.sprite.heart1 = this.add.sprite(20, 580, "heart");
        my.sprite.heart2 = this.add.sprite(50, 580, "heart");
        my.sprite.heart3 = this.add.sprite(80, 580, "heart");

        // creating player sprite
        my.sprite.cloud = new Cloud(this, game.config.width/2, game.config.height - 40, "cloud", null, this.DKey, this.AKey, 5);
        my.sprite.cloud.setScale(.4);

        // enemy sprites (flies)
        // move speed
        this.flyMoveSpeed = 3;
        this.fly1 = new Enemy(this, 1000, Phaser.Math.Between(50, 400), "fly", null, this.flyMoveSpeed, 10, 0);
        this.fly2 = new Enemy(this, 1000, Phaser.Math.Between(50, 400), "fly", null, this.flyMoveSpeed, 10, 3000);
        this.fly3 = new Enemy(this, 1000, Phaser.Math.Between(50, 400), "fly", null, this.flyMoveSpeed, 10, 5000);

        // enemy sprites (winged enemies)
        // move speed
        this.wingEnemyMoveSpeed = 7;
        this.wing1 = new Enemy(this, 1000, Phaser.Math.Between(50, 400), "wingEnemy", null, this.wingEnemyMoveSpeed, 50, 21000);
        this.wing1.setScale(0.6);
        this.wing2 = new Enemy(this, 1000, Phaser.Math.Between(50, 400), "wingEnemy", null, this.wingEnemyMoveSpeed, 50, 24000);
        this.wing2.setScale(0.6);
        this.wing3 = new Enemy(this, 1000, Phaser.Math.Between(50, 400), "wingEnemy", null, this.wingEnemyMoveSpeed, 50, 27000);
        this.wing3.setScale(0.6);

        // enemy sprites (aircraft)
        // move speed
        this.aircraftMoveSpeed = 5;
        this.aircraft1 = new Enemy(this, 1005, Phaser.Math.Between(50, 400), "aircraft", null, this.aircraftMoveSpeed, 100, 35000);
        this.aircraft1.flipY = true;
        this.aircraft2 = new Enemy(this, 1005, Phaser.Math.Between(50, 400), "aircraft", null, this.aircraftMoveSpeed, 100, 40000);
        this.aircraft2.flipY = true;

        // aircraft array
        this.aircrafts = [this.aircraft1, this.aircraft2];


        // enemy array
        this.enemies = [this.fly1, this.fly2, this.fly3, this.wing1, this.wing2, this.wing3, this.aircraft1, this.aircraft2];

        this.bulletSpeed = 6;

        this.gameOver = false;

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

                // play sound
                this.sound.play("bulletFire", {
                    volume: 1   // Can adjust volume using this, goes from 0 to 1
                });
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
                    // play sound
                    this.sound.play("impact", {
                        volume: 1   // Can adjust volume using this, goes from 0 to 1
                    });
                }
            }
        }

        // make all of the bullets move
        for (let bullet of my.sprite.bullet) {
            bullet.setScale(0.3);
            bullet.y -= this.bulletSpeed;
        }

        // check for if aircraft enemies are active
        for (let aircraft of this.aircrafts) {
            if (aircraft.visible === true) {
                // checking to see if timer has elapsed yet
                if (!aircraft.shootTimer || this.time.now > aircraft.shootTimer) {
                    // create bullet
                    my.sprite.enemyBullet.push(this.add.sprite(
                        aircraft.x, aircraft.y+(aircraft.displayHeight/2), "flame")
                    );

                    // play sound
                    this.sound.play("enemyFire", {
                        volume: 1   // Can adjust volume using this, goes from 0 to 1
                    });

                    // set timer
                    aircraft.shootTimer = this.time.now + 1000;
                }
            }
        }

    my.sprite.enemyBullet = my.sprite.enemyBullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));

    // make all of the enemy bullets move
    for (let bullet of my.sprite.enemyBullet) {
        bullet.setScale(0.3);
        bullet.y += this.bulletSpeed;
    }

    for (let bullet of my.sprite.enemyBullet) {
        if (this.collides(my.sprite.cloud, bullet)) {
            bullet.y = -100;
            this.playerHealth -= 1;

            // play sound
            this.sound.play("impact", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });

            if (this.playerHealth === 2) {
                my.sprite.heart3.visible = false;
            }

            if (this.playerHealth === 1) {
                my.sprite.heart2.visible = false;
            }

            if (this.playerHealth === 0) {
                my.sprite.heart1.visible = false;
                this.gameOver = true;
            }
        }
    }

        my.sprite.cloud.update();
        for (let enemy of this.enemies) {
            enemy.update();
        }
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