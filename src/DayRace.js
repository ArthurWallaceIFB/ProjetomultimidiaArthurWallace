class DayRace extends Phaser.Scene {
    constructor() {
        super({ key: 'DayRace' });
        this.backgroundPositionY = 0;
        this.maxCars = 3;
        this.carNames = ['car1', 'car2', 'car3', 'car4', 'car5', 'car6'];
        this.minPosX = 100; // Posição X mínima
        this.maxPosX = 400; // Posição X máxima
        this.rowSpacing = 166; // Espaçamento vertical entre as fileiras de carros
        this.carSpeed = 200; // Velocidade de movimento dos carros
        this.rowsPositions = [100, 250, 405];
        this.spawnDelayRange = [10, 500]; // Intervalo de atraso aleatório antes de gerar um novo carro
    }

    checkOverlap(newX, newY) {
        let overlap = false;
    
        this.carsGroup.getChildren().forEach((car) => {
            if (Phaser.Math.Distance.Between(car.x, car.y, newX, newY) < 40) { // Verifique a distância de colisão de 40 pixels
                overlap = true;
            }
        });
    
        return overlap;
    }

    preload() {
        this.load.image('road', 'assets/background/pista.png');
        this.load.image('player', 'assets/players/player.png');
        this.load.image('car1', 'assets/players/car1.png');
        this.load.image('car2', 'assets/players/car2.png');
        this.load.image('car3', 'assets/players/car3.png');
        this.load.image('car4', 'assets/players/car4.png');
        this.load.image('car5', 'assets/players/car5.png');
        this.load.image('car6', 'assets/players/car6.png');
    }

    create() {
        this.carsGroup = this.physics.add.group();

        this.cameras.main.setBounds(0, 0, this.game.config.width, this.textures.get('road').getSourceImage().height * 10);

        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'road').setOrigin(0);
        this.background.setScale(1);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.image(this.game.config.width / 3, 500, 'player');
        this.player.scale = 0.25;

        //this.cameras.main.startFollow(this.player, false, 0.5, 0.5, 0, (this.game.config.height * 0.5) - 120);

        this.generateInitialCars();
    }

    generateInitialCars() {
        for (let i = 0; i < this.maxCars; i++) {
            const carIndex = Phaser.Math.Between(0, this.carNames.length - 1);
            const carName = this.carNames[carIndex];
            const rowIndex = i;
    
            const availablePositions = this.rowsPositions;
            const randomPosIndex = Phaser.Math.Between(0, availablePositions.length - 1);
            const randomPosX = availablePositions[randomPosIndex]; // Escolhe aleatoriamente uma posição x disponível
    
            const car = this.physics.add.image(randomPosX, -100 - (rowIndex * this.rowSpacing), carName);
            car.scale = 0.25;
            car.angle = 180;
            this.carsGroup.add(car);
        }
    }

    generateRandomCar() {
        const carIndex = Phaser.Math.Between(0, this.carNames.length - 1);
        const carName = this.carNames[carIndex];
        const rowIndex = this.maxCars; // Índice da próxima fileira de carros
    
        const availablePositions = this.rowsPositions; // Posições x disponíveis
        const randomPosIndex = Phaser.Math.Between(0, availablePositions.length - 1);
        const randomPosX = availablePositions[randomPosIndex]; // Escolhe aleatoriamente uma posição x disponível
    
        const car = this.physics.add.image(randomPosX, -100 - (rowIndex * this.rowSpacing), carName);
        car.scale = 0.25;
        car.angle = 180;
        this.carsGroup.add(car);
    }
    update() {
        const speed = 1;
    
        this.backgroundPositionY += (this.player.body.velocity.y) * speed;
        this.background.tilePositionY = this.backgroundPositionY;
    
        this.player.setVelocity(0);
    
        if (this.cursors.up.isDown && this.player.y > 0) {
            this.player.setVelocityY(-20);
    
            if (this.cursors.left.isDown && this.player.x > 50) {
                this.player.setAngle(-5).setVelocityX(-200);
            }
            else if (this.cursors.right.isDown && this.player.x < this.game.config.width - 50) {
                this.player.setAngle(5).setVelocityX(200);
            }
            else {
                this.player.setAngle(0);
            }
        }
    
        this.carsGroup.getChildren().forEach((car) => {
            car.setVelocityY(this.carSpeed); // Ajuste a velocidade de movimento dos carros conforme necessário
    
            // Verifique se o carro passou da parte inferior da tela e reposicione-o no topo
            if (car.y > this.game.config.height) {
                car.y = -car.height; // Posição inicial acima da tela
    
                // Defina um atraso aleatório antes de reposicionar o carro
                const delay = Phaser.Math.Between(this.spawnDelayRange[0], this.spawnDelayRange[1]);
    
                this.time.delayedCall(delay, () => {
                    const availablePositions = this.rowsPositions;
                    const randomPosIndex = Phaser.Math.Between(0, availablePositions.length - 1);
                    const randomPosX = availablePositions[randomPosIndex]; // Escolhe aleatoriamente uma posição x disponível
    
                    // Defina a nova posição X para o carro
                    car.x = randomPosX;
                });
            }
        });
    
        // Gere um novo carro atrás do último carro da fila se ele já tiver sido reposicionado
        const lastCar = this.carsGroup.getLast(true);
        if (lastCar.y > this.game.config.height) {
            this.generateRandomCar();
        }
    }
}

export default DayRace;
  
