//import Phaser from 'phaser';
//import Phaser from './node_modules/phaser/dist/phaser.js'
import MainMenuScene from './src/Scenes/MainMenuScene.js';
import DifficultyScene from './src/Scenes/DifficultyScene.js';
import GameOverScene from './src/Scenes/GameOverScene.js';
import PauseScene from './src/Scenes/PauseScene.js';
import CongratulationsScene from './src/Scenes/CongratulationsScene.js';
import DayRace from './src/Scenes/DayRace.js';


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 500,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    dom: {
        createContainer: true
    },
    // scene: [MainMenuScene, DayRace, DifficultyScene, GameOverScene, PauseScene, CongratulationsScene]
    scene: [MainMenuScene, DifficultyScene, DayRace, GameOverScene, PauseScene, CongratulationsScene]
};

const game = new Phaser.Game(config);
