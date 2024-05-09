class Enemy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, moveSpeed, pointValue, delay) {
        super(scene, x, y, texture, frame);
        
        this.moveSpeed = moveSpeed;
        this.pointValue = pointValue;
        this.delay = delay;
        this.isDelayed = true;
        scene.add.existing(this);

        // delay countdown
        scene.time.delayedCall(this.delay, () => {
            this.isDelayed = false; // Set isDelayed to false after the delay
        });
    }

    update() {

        if (this.isDelayed === true) {
            this.visible = false;
            return;
        }

        this.visible = true;
        
        // move left
        this.x -= this.moveSpeed;

        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}