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

    // Exiba a mensagem de "Game Over"
    // const gameOverText = this.add.text(this.game.config.width / 2, (this.game.config.height / 2) - 250, 'Game Over', { fontFamily: 'Impact', fontSize: '52px', fill: '#fff' });
    // gameOverText.setOrigin(0.5);

    // // Crie o botão de reset
    // const resetButton = this.add.text(this.game.config.width / 2, (this.game.config.height / 2) + 220, 'Recomeçar', { fontFamily: 'Impact', fontSize: '40px', fill: '#fff' });
    // resetButton.setOrigin(0.5);
    // resetButton.setInteractive();

    // const exitButton = this.add.text(this.game.config.width / 2, (this.game.config.height / 2) + 280, 'Sair', { fontFamily: 'Impact', fontSize: '40px', fill: '#fff' });
    // exitButton.setOrigin(0.5);
    // exitButton.setInteractive();// Torna o botão interativo para eventos de clique

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

    // resetButton.on('pointerup', () => {
    //   this.scene.stop(); // Encerra a cena de "Game Over"
    //   this.scene.start('DayRace'); // Retoma a cena do jogo
    // });

    // exitButton.on('pointerup', () => {
    //   this.scene.stop(); // Encerra a cena de "Game Over"
    //   this.scene.start('MainMenuScene'); // Retoma a cena do jogo
    // });


  }
}

export default CongratulationsScene;