// MainMenuScene.js

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  handleNameForm() {
    let name = this.nameInput.getChildByName("name");
    if (name.value != "") {
      sessionStorage.setItem('name', name.value);
      this.createUser(name.value);
      this.scene.start('DifficultyScene');
    }
    else {
      alert("Preencha seu nickname para continuar!");
      name.value = "";
    }
  }

  async createUser(name) {
    try {
      let url = 'http://localhost:3000';
      const reqBody = { nickname: name };
      const response = await axios.post(`${url}/api/user`, reqBody);

      if (response && response.data) {
        sessionStorage.setItem("userInfo", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      alert("Erro ao criar o usuário! Tente novamente mais tarde.");
      throw error;
    }
  }

  preload() {
    this.load.image('bg_home', '/assets/background/bg_home.png');
    this.load.html("form", "/components/form.html");
  }

  create() {
    this.add.image(0, 0, 'bg_home').setOrigin(0).setScale(0.8);

    const circle = this.add.graphics();
    circle.fillStyle(0x000000, 0);
    circle.fillCircleShape(new Phaser.Geom.Circle(this.cameras.main.width / 2, this.cameras.main.height - 175, 45));

    circle.setInteractive(new Phaser.Geom.Circle(this.cameras.main.width / 2, this.cameras.main.height - 175, 45), Phaser.Geom.Circle.Contains);

    circle.on('pointerover', () => {
      this.input.setDefaultCursor('pointer');
    });
    circle.on('pointerout', () => {
      this.input.setDefaultCursor('default');
    });


    let username = sessionStorage.getItem("name");

    if (username && username.length > 0) {

      circle.on('pointerdown', () => {
        this.scene.start('DifficultyScene');
      });

      const text = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height - 70,
        `Bem vindo, ${username}`,
        {
          fontFamily: 'Impact',
          fontSize: 30,
          color: '#ffffff',
          fontWeight: 'bold'
        }
      );
      text.setOrigin(0.5);

      const alterar = this.add.text(
        text.x,
        text.y + text.height / 2 + 30,
        "Alterar",
        {
          fontFamily: 'Impact',
          fontSize: 20,
          color: '#1C1948',
          backgroundColor: '#ffffff',
          padding: {
            left: 10,
            right: 10,
            top: 5,
            bottom: 5,
          },
        }
      );
      alterar.setOrigin(0.5);
      alterar.setInteractive();

      alterar.on('pointerdown', () => {
        sessionStorage.removeItem("name");
        location.reload();
      });
    }

    else {
      circle.on('pointerdown', () => {
        this.handleNameForm();
      });

      this.nameInput = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height - 50).createFromCache("form");

      this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

      this.returnKey.on("down", event => {
        this.handleNameForm();
      });
    }

  }
}

export default MainMenuScene;
