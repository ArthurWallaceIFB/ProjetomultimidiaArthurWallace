// MainMenuScene.js

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  preload() {
    this.load.image('bg_home', '/assets/background/bg_home.png');
  }

  create() {
    this.add.image(0, 0, 'bg_home').setOrigin(0).setScale(0.8);

    const circle = this.add.graphics();
    circle.fillStyle(0x000000, 0);
    circle.fillCircleShape(new Phaser.Geom.Circle( this.cameras.main.width / 2, this.cameras.main.height - 175, 45));

    circle.setInteractive(new Phaser.Geom.Circle(this.cameras.main.width / 2,this.cameras.main.height - 175, 45), Phaser.Geom.Circle.Contains);

    circle.on('pointerover', () => {
      this.input.setDefaultCursor('pointer');
    });
    circle.on('pointerout', () => {
      this.input.setDefaultCursor('default');
    });
    circle.on('pointerdown', () => {
      this.scene.start('DifficultyScene');
    });

    const text = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height - 50,
      'Recorde: 0',
      {
        fontFamily: 'Impact',
        fontSize: 30,
        color: '#ffffff',
        fontWeight: 'bold'
      }
    );
    text.setOrigin(0.5);

  }
}

export default MainMenuScene;
