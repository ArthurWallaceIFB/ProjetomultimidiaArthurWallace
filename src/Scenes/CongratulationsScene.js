class CongratulationsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CongratulationsScene' });
  }

  init(data) {
    this.currentTime = data.currentTime || 10;
    this.newRecord = data.newRecord || true;
  }

  create() {
    const background = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x4F2555, 0.6);
    background.setOrigin(0);

    const congratulationsText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 250, `Parabéns!`, { fontFamily: 'Impact', fontSize: '52px', fill: '#fff' });
    congratulationsText.setOrigin(0.5);

    if (this.newRecord) {
      this.add.text(this.game.config.width / 2 - 170, this.game.config.height / 2 - 70, `Novo recorde alcançado!`, { fontFamily: 'Impact', fontSize: '35px', fill: '#fff' });

      const timeText = this.add.text(this.game.config.width / 2 - 100, this.game.config.height / 2 - 10, `Tempo: ${this.currentTime.toFixed(2)}s`, { fontFamily: 'Impact', fontSize: '35px', fill: '#fff' });
    }
    else {
      const timeText = this.add.text(this.game.config.width / 2 - 100 , this.game.config.height / 2, `Tempo: ${this.currentTime.toFixed(2)}s`, { fontFamily: 'Impact', fontSize: '35px', fill: '#fff' });
      timeText.setOrigin(0.5);
    }


    const restartButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 220, 'Recomeçar', { fontFamily: 'Impact', fontSize: '40px', fill: '#fff' });
    restartButton.setOrigin(0.5);
    restartButton.setInteractive();

    const exitButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 280, 'Sair', { fontFamily: 'Impact', fontSize: '40px', fill: '#fff' });
    exitButton.setOrigin(0.5);
    exitButton.setInteractive();

    restartButton.on('pointerdown', () => {
      this.scene.stop(); // Encerra a cena de "Game Over"
      this.scene.start('DayRace'); // Retoma a cena do jogo
    });

    exitButton.on('pointerdown', () => {
      this.scene.stop();
      this.scene.stop('DayRace');
      this.scene.start('MainMenuScene');
    });


  }
}

export default CongratulationsScene;