class CongratulationsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CongratulationsScene' });
  }

  init(data) {
    this.currentTime = data.currentTime;
  }

  create() {
    const background = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x4F2555, 0.6);
    background.setOrigin(0);

    const congratulationsText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 250, `Parabéns!`, { fontFamily: 'Impact', fontSize: '52px', fill: '#fff' });
    congratulationsText.setOrigin(0.5);

    const timeText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, `Tempo: ${this.currentTime.toFixed(2)}s`, { fontFamily: 'Impact', fontSize: '35px', fill: '#fff' });
    timeText.setOrigin(0.5);


    const nexPhaseButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 220, 'Continuar', { fontFamily: 'Impact', fontSize: '40px', fill: '#fff' });
    nexPhaseButton.setOrigin(0.5);
    nexPhaseButton.setInteractive();

    const restartButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 280, 'Recomeçar', { fontFamily: 'Impact', fontSize: '40px', fill: '#fff' });
    restartButton.setOrigin(0.5);
    restartButton.setInteractive();

    restartButton.on('pointerdown', () => {
      this.scene.stop(); // Encerra a cena de "Game Over"
      this.scene.start('DayRace'); // Retoma a cena do jogo
    });

    nexPhaseButton.on('pointerdown', () => {
      this.scene.stop(); // Encerra a cena de "Game Over"
      this.scene.start('DayRace'); // Retoma a cena do jogo
    });


  }
}

export default CongratulationsScene;