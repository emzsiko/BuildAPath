class Cloud extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, right, left, playerSpeed) {
        super(scene, x, y, texture, frame);
        
        this.right = right;
        this.left = left;
        this.playerSpeed = playerSpeed;
        scene.add.existing(this);
    }

    update() {
        // moving right
        if(this.right.isDown) {
            // ensuring can move right
            if (this.x < (game.config.width - (this.displayWidth/2))) {
                this.x += this.playerSpeed;
            }
        }

        // moving left
        if(this.left.isDown) {
            // ensuring can move left
            if (this.x > (this.displayWidth/2)) {
                this.x -= this.playerSpeed;
            }
        }
    }
}