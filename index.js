import Phaser from 'phaser';
import MainMenuScene from './src/MainMenuScene';
import DifficultyScene from './src/DifficultyScene';
import DayRace from './src/DayRace';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 500,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [MainMenuScene, DifficultyScene, DayRace]
};

const game = new Phaser.Game(config);
