// DifficultyScene.js

class DifficultyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DifficultyScene' });
  }

  preload() {
    this.load.image('bg_difficulties', '/assets/background/bg_difficulties.png');
  }

  create() {
    this.add.image(0, 0, 'bg_difficulties').setOrigin(0).setScale(1);

    const facil = this.add.graphics();
    facil.fillStyle(0x000000, 0);
    facil.fillCircleShape(new Phaser.Geom.Circle(this.cameras.main.width / 2 - 100, 270, 70));

    facil.setInteractive(new Phaser.Geom.Circle(this.cameras.main.width / 2 - 100, 270, 70), Phaser.Geom.Circle.Contains);

    facil.on('pointerover', () => {
      this.input.setDefaultCursor('pointer');
    });
    facil.on('pointerout', () => {
      this.input.setDefaultCursor('default');
    });
    facil.on('pointerdown', () => {
      this.scene.start('DayRace',  { difficulty: 'fácil' });
    });


    const medio = this.add.graphics();
    medio.fillStyle(0x000000, 0);
    medio.fillCircleShape(new Phaser.Geom.Circle(this.cameras.main.width / 2 + 100, 270, 70));

    medio.setInteractive(new Phaser.Geom.Circle(this.cameras.main.width / 2 + 100, 270, 70), Phaser.Geom.Circle.Contains);

    medio.on('pointerover', () => {
      this.input.setDefaultCursor('pointer');
    });
    medio.on('pointerout', () => {
      this.input.setDefaultCursor('default');
    });
    medio.on('pointerdown', () => {
      this.scene.start('DayRace',  { difficulty: 'médio' });
    });


    const dificil = this.add.graphics();
    dificil.fillStyle(0x000000, 0);
    dificil.fillCircleShape(new Phaser.Geom.Circle(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 70));

    dificil.setInteractive(new Phaser.Geom.Circle(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 70), Phaser.Geom.Circle.Contains);

    dificil.on('pointerover', () => {
      this.input.setDefaultCursor('pointer');
    });
    dificil.on('pointerout', () => {
      this.input.setDefaultCursor('default');
    });
    dificil.on('pointerdown', () => {
      this.scene.start('DayRace',  { difficulty: 'difícil' });
    });

  }
}

export default DifficultyScene;
