class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PauseScene' });
  }

  create() {

    const background = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x4F2555, 0.6);
    background.setOrigin(0);

    const gameOverText = this.add.text(this.game.config.width / 2, (this.game.config.height / 2) - 250, 'Pause', { fontFamily: 'Impact', fontSize: '52px', fill: '#fff' });
    gameOverText.setOrigin(0.5);

    const continueButton = this.add.text(this.game.config.width / 2, (this.game.config.height / 2), 'Retomar', { fontFamily: 'Impact', fontSize: '40px', fill: '#fff' });
    continueButton.setOrigin(0.5);
    continueButton.setInteractive(); 

    // Crie o botão de reset
    const resetButton = this.add.text(this.game.config.width / 2, (this.game.config.height / 2) + 220, 'Recomeçar', {fontFamily: 'Impact', fontSize: '40px', fill: '#fff' });
    resetButton.setOrigin(0.5);
    resetButton.setInteractive(); // Torna o botão interativo para eventos de clique

    const exitButton = this.add.text(this.game.config.width / 2, (this.game.config.height / 2) + 280, 'Sair', {fontFamily: 'Impact', fontSize: '40px', fill: '#fff' });
    exitButton.setOrigin(0.5);
    exitButton.setInteractive();



    continueButton.on('pointerup', () => {
      this.scene.stop(); // Encerra a cena de "Game Over"
      this.scene.resume('DayRace'); // Retoma a cena do jogo
    });

    resetButton.on('pointerup', () => {
      this.scene.stop(); // Encerra a cena de "Game Over"
      this.scene.start('DayRace'); // Retoma a cena do jogo
    });

    exitButton.on('pointerup', () => {
      this.scene.stop();
      this.scene.stop('DayRace');// Encerra a cena de "Game Over"
      this.scene.start('MainMenuScene'); // Retoma a cena do jogo
    });

  }
}

export default GameOverScene;