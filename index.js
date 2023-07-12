import Phaser from 'phaser';
import MainMenuScene from './src/Scenes/MainMenuScene';
import DifficultyScene from './src/Scenes/DifficultyScene';
import GameOverScene from './src/Scenes/GameOverScene';
import PauseScene from './src/Scenes/PauseScene';
import CongratulationsScene from './src/Scenes/CongratulationsScene';
import DayRace from './src/Scenes/DayRace';


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
    //scene: [MainMenuScene, DifficultyScene, DayRace, GameOverScene]
    scene: [MainMenuScene, DayRace, DifficultyScene, GameOverScene, PauseScene, CongratulationsScene]
};

const game = new Phaser.Game(config);
