// Em Ishida
// Created: 5/3/2024
// Phaser: 3.70.0
//
// Gallery Shooter
//
// An example of putting sprites on the screen using Phaser
// 
// Art assets from Kenny Assets "Shape Characters" set:
// https://kenney.nl/assets/shape-characters

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1000,
    height: 600,
    scene: [Shooter, GameOver]
}

// Global variable to hold sprites
var my = {sprite: {}};
let score = 0;

const game = new Phaser.Game(config);
