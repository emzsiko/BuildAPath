// Em Ishida
// Created: 5/3/2024
// Phaser: 3.70.0
//
// Bolt Blaster (CMPM 120 Gallery Shooter Project)
//
// A shoot em up game made with Phaser
//
// Uses code borrowed from Jim Whitehead
// 
// All assets from Kenny Assets:
// Jumper Pack: https://kenney.nl/assets/jumper-pack
// Platformer Art Extended Enemies: https://kenney.nl/assets/platformer-art-extended-enemies 
// Simplified Platformer Pack: https://kenney.nl/assets/simplified-platformer-pack
// Space Shooter Redux: https://kenney.nl/assets/space-shooter-redux
// Impact Sounds: https://kenney.nl/assets/impact-sounds
// Background Elements: https://kenney.nl/assets/background-elements 

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
    scene: [Menu, Controls, Shooter, GameOver]
}

// Global variable to hold sprites
var my = {sprite: {}};
let score = 0;

const game = new Phaser.Game(config);
