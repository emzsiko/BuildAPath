class Enemy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, moveSpeed, pointValue, delay) {
        super(scene, x, y, texture, frame);
        
        this.moveSpeed = moveSpeed;
        this.pointValue = pointValue;
        this.delay = delay;
        this.isDelayed = true;
        scene.add.existing(this);

        this.loops = 2;

        // delay countdown
        scene.time.delayedCall(this.delay, () => {
            this.isDelayed = false; // Set isDelayed to false after the delay
        });
    }

    update() {

        // stops update loop if still delayed and makes sprite hidden
        if (this.isDelayed === true) {
            this.visible = false;
            return;
        }

        this.visible = true;

        // move left
        this.x -= this.moveSpeed;

        if (this.x <= 0 - this.width) {
            // check if all loops are completed
            if (this.loops === 0) {
                // if all loops are completed, hide the sprite
                this.visible = false;
                this.x = -100;
            } else {
                // if there are remaining loops, reset the sprite's position to the right edge of the screen
                this.reset();
                // decrease the loop count
                this.loops--;
                console.log("loops remaining:", this.loops);
            }
        }
    }

    reset() {
        this.x = game.config.width;
    }
}