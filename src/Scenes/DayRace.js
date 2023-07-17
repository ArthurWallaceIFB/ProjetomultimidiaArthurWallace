import Carro from '../Models/Carro.js';
import Pista from '../Models/Pista.js';
import Placar from '../Models/Placar.js';

class DayRace extends Phaser.Scene {
    constructor() {
        super({ key: 'DayRace' });
        this.backgroundPositionY = 0;
        this.maxCars = 3;
        this.carNames = ['car1', 'car2', 'car3', 'car4', 'car5', 'car6'];
        this.rowSpacing = 500; // Espaçamento vertical entre as fileiras de carros
        this.rowsPositions = [100, 250, 405];
        this.isGameOver = false;
        this.isFinishLineVisible = false;
        this.finished = false;
        this.currentTime = 0;
        this.carSpeed = 100; // Velocidade de movimento dos carros
        this.carSpeedBase = 100;
        this.bgSpeed = 1;
        this.carXSpeed = 800;
        this.carYSpeed = -20;
    }

    init(data) {
        this.difficulty = data.difficulty;

        switch(this.difficulty){
            case "fácil":
                this.carSpeedBase = 50;
                this.bgSpeed = 4;
                this.carXSpeed = 300;
                break;
            case "médio":
                this.carSpeedBase = 100;
                this.bgSpeed = 5;
                this.carXSpeed = 600;
                break;
            case "difícil":
                this.carSpeedBase = 200;
                this.bgSpeed = 1;
                this.carXSpeed = 800;
                break;
        }

    }

    preload() {
        this.loadAssets();
    }

    create() {
        this.currentTime = 0;
        this.isFinishLineVisible = false;
        this.finished = false;
        this.createGroups();
        this.setCameraBounds();
        this.createBackground();
        this.createPlayer();
        this.generateInitialCars();
        this.createScoreImage();
        this.enableCollisions();
        this.initCursors();
    }

    update() {
        this.checkFinishLine();
        this.updateBackgroundPosition();
        this.handlePlayerInput();
        this.moveCars();
        this.handleCarRespawn();
        this.updateTime();
    }

    updateTime() {
        if (!this.isGameOver && !this.finished) {
            this.currentTime += this.game.loop.delta / 1000;
            this.tempoText.atualizarTempo(this.currentTime);
        }
    }

    loadAssets() {
        this.load.image('score_race', '/assets/background/score_race.png');
        this.load.image('pauseButton', 'assets/pause.png');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('road', 'assets/background/pista.png');
        this.load.image('player', 'assets/players/player.png');
        this.load.image('car1', 'assets/players/car1.png');
        this.load.image('car2', 'assets/players/car2.png');
        this.load.image('car3', 'assets/players/car3.png');
        this.load.image('car4', 'assets/players/car4.png');
        this.load.image('car5', 'assets/players/car5.png');
        this.load.image('car6', 'assets/players/car6.png');
        this.load.image('cone', 'assets/cone.png');
        this.load.image('finish_line', 'assets/background/teste_pista.png');
        
    }

    setCameraBounds() {
        const { width, height } = this.game.config;
        this.cameras.main.setBounds(0, 0, width, this.textures.get('road').getSourceImage().height * 50);
    }

    createBackground() {
        const { width, height } = this.game.config;
        const repeatCount = 50;

        const roadWidth = width;
        const roadHeight = this.textures.get('road').getSourceImage().height * repeatCount;

        this.background = new Pista(this, 0, 0, roadWidth, roadHeight, 'road').setOrigin(0);
    }

    initCursors() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createGroups() {
        this.carsGroup = this.physics.add.group();
    }

    createPlayer() {
        const { width, height } = this.game.config;
        this.player = this.physics.add.image(width / 3 + 85, height - 150, 'player');
        this.player.setDepth(1);
        this.player.scale = 0.25;
        this.cameras.main.startFollow(this.player, false, 0.5, 0.5, 0, (height * 0.5) - 120);
    }

    generateInitialCars() {
        const availablePositions = [...this.rowsPositions];
        Phaser.Utils.Array.Shuffle(availablePositions);

        for (let i = 0; i < this.maxCars; i++) {
            const carIndex = Phaser.Math.Between(0, this.carNames.length - 1);
            const carName = this.carNames[carIndex];
            const rowIndex = i;

            const randomPosX = availablePositions.pop();

            const car = new Carro(this, randomPosX, -100 - (rowIndex * this.rowSpacing), carName);
            this.carsGroup.add(car);
        }
    }

    createScoreImage() {
        const bg_score = this.add.image(0, 0, 'score_race').setOrigin(0);
        bg_score.setDepth(1);

        this.tempoText = new Placar(
            this,
            30,
            25,
            '',
            { fontFamily: 'Impact', fontSize: '25px', fill: '#fff' }
        ).setOrigin(0);
        this.tempoText.setDepth(1);

        const logo = this.add.image(this.game.config.width / 2, 40, 'logo');
        logo.scale = 0.12;
        logo.setDepth(1);

        const pauseButton = this.add.image(this.game.config.width - 50, 40, 'pauseButton');
        pauseButton.scale = 0.65;
        pauseButton.setInteractive();
        pauseButton.setDepth(1);

        pauseButton.on('pointerdown', () => {
            this.scene.pause();
            this.scene.launch('PauseScene');
        });
    }

    enableCollisions() {
        this.physics.add.collider(this.player, this.carsGroup, this.gameOver, null, this);
    }

    updateBackgroundPosition() {
        this.backgroundPositionY += (this.player.body.velocity.y * this.bgSpeed);
        this.background.tilePositionY = this.backgroundPositionY;
    }

    handlePlayerInput() {
        this.player.setVelocity(0);

        if (this.cursors.up.isDown && this.player.y > 0) {
            this.player.setVelocityY(this.carYSpeed);
            this.carSpeed = this.carSpeedBase + 600;

            if (this.cursors.left.isDown && this.player.x > 50) {
                this.player.setAngle(-10).setVelocityX(-this.carXSpeed);
            }
            else if (this.cursors.right.isDown && this.player.x < this.game.config.width - 50) {
                this.player.setAngle(10).setVelocityX(this.carXSpeed);
            }
            else {
                this.player.setAngle(0);
            }
        }
        else if (this.cursors.left.isDown && this.player.x > 50) {
            this.player.setAngle(-10).setVelocityX(-300);
        }
        else if (this.cursors.right.isDown && this.player.x > 50) {
            this.player.setAngle(10).setVelocityX(300);
        }
        else {
            this.carSpeed = this.carSpeedBase;
        }
    }

    moveCars() {
        this.carsGroup.getChildren().forEach((car) => {
            car.setVelocityY(this.carSpeed);
        });
    }

    handleCarRespawn() {
        const lastCar = this.carsGroup.getLast(true);
        if (lastCar.y > this.game.config.height - 200) {
            this.generateRandomCar();
        }
    }

    generateRandomCar() {
        const carIndex = Phaser.Math.Between(0, this.carNames.length - 1);
        const carName = this.carNames[carIndex];
        const rowIndex = this.maxCars;

        const availablePositions = this.rowsPositions;
        const randomPosIndex = Phaser.Math.Between(0, availablePositions.length - 1);
        const randomPosX = availablePositions[randomPosIndex];

        //const car = new Carro(this, randomPosX, -100 - (rowIndex * this.rowSpacing), carName);
        const car = new Carro(this, randomPosX, -300, carName);
        this.carsGroup.add(car);
    }

    createFinishLine() {
        this.isFinishLineVisible = true;
        const { width } = this.game.config;
        const finishLine = this.physics.add.image(width / 2, width - 60, 'finish_line');
        finishLine.scale = 2;
        //const finishLine = this.physics.add.image(width / 3 + 85, 0, height - 150, 'player');
        finishLine.setDepth(0);
        this.physics.world.enable(finishLine);
        finishLine.body.setAllowGravity(false);
        finishLine.body.setImmovable(true);
        this.tweens.add({
          targets: finishLine,
          y: 400,
          duration: 2000,
          ease: 'Linear',
          onComplete: () => {
            this.physics.add.overlap(this.player, finishLine, this.showCongratulations, null, this);
          }
        });
    }

    checkFinishLine() {
        if (!this.isFinishLineVisible && this.player.y < 520) {
            this.createFinishLine();
        }
    }

    showCongratulations() {
        this.finished = true;
        this.scene.pause();
        this.scene.launch('CongratulationsScene', { currentTime: this.currentTime });
    }

    gameOver() {
        this.scene.pause();
        this.scene.launch('GameOverScene');
        //this.currentTime = 0;
    }
}

export default DayRace;