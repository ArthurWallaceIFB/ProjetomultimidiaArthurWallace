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

  hideRanking() {
    document.getElementById("ranking-container").style.display = "none";
  }
  async showRanking() {
    try {
      let url = 'http://localhost:3000';
      const response = await axios.get(`${url}/api/all/ranking`);
      const rankings = response.data;

      this.popularTabelas(rankings);


    }
    catch (error) {
      // Trate erros aqui
      alert("Erro ao buscar ranking!", error);
    }
  }

  popularTabelas(rankings) {
    let tabelaFacil, tabelaMedio, tabelaDificil;
    if (document.getElementById("ranking-container") != null) {
      document.getElementById("ranking-container").style.display = "block";
      tabelaFacil = document.getElementById("tabelaFacil");
      tabelaMedio = document.getElementById("tabelaMedio");
      tabelaDificil = document.getElementById("tabelaDificil");

      const limparDadosTabela = (tabela) => {
        // Remover todos os elementos filhos da tabela, exceto o primeiro (cabeçalho)
        while (tabela.children.length > 1) {
          tabela.removeChild(tabela.lastChild);
        }
      };
    
      // Limpar dados das tabelas
      limparDadosTabela(tabelaFacil);
      limparDadosTabela(tabelaMedio);
      limparDadosTabela(tabelaDificil);
    }
    else {
      const tableContainer = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2 - 130).createFromCache("table");

      tabelaFacil = tableContainer.getChildByID("tabelaFacil");
      tabelaMedio = tableContainer.getChildByID("tabelaMedio");
      tabelaDificil = tableContainer.getChildByID("tabelaDificil");
    }

    const completeRowWithDash = () => {
      const row = document.createElement("tr");
      const cellNickname = document.createElement("td");
      const cellTempo = document.createElement("td");

      cellNickname.textContent = "-";
      cellTempo.textContent = "-";

      row.appendChild(cellNickname);
      row.appendChild(cellTempo);

      return row;
    };

    // Função para garantir que cada tabela tenha pelo menos 3 itens
    const garantirMinimoItens = (tabela) => {
      const minimoItens = 4 - tabela.childElementCount;
      for (let i = 0; i < minimoItens; i++) {
        tabela.appendChild(completeRowWithDash());
      }
    };

    rankings.sort((a, b) => a.record - b.record);

    rankings.forEach((ranking) => {
      const { _idUser, record, difficulty } = ranking;
      const row = document.createElement("tr");
      const cellNickname = document.createElement("td");
      const cellTempo = document.createElement("td");

      cellNickname.textContent = _idUser.nickname;
      cellTempo.textContent = record.toFixed(2);

      row.appendChild(cellNickname);
      row.appendChild(cellTempo);

      switch (difficulty) {
        case "fácil":
          tabelaFacil.appendChild(row);
          break;
        case "médio":
          tabelaMedio.appendChild(row);
          break;
        case "difícil":
          tabelaDificil.appendChild(row);
          break;
      }
    });

    // Garantir que cada tabela tenha pelo menos 3 itens
    garantirMinimoItens(tabelaFacil);
    garantirMinimoItens(tabelaMedio);
    garantirMinimoItens(tabelaDificil);
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
    this.load.image("star_icon", "/assets/star.png");
    this.load.html("form", "/components/form.html");
    this.load.html("table", "/components/table.html");

  }

  create() {
    this.add.image(0, 0, 'bg_home').setOrigin(0).setScale(0.8);

    const starIcon = this.add.image(
      this.cameras.main.width - 40,
      40,
      "star_icon"
    ).setScale(0.07);

    const rankingText = this.add.text(
      this.cameras.main.width - 70,
      80,
      "Ranking",
      {
        fontFamily: "Impact",
        fontSize: "17px",
        color: "#ffffff",
        align: "center",
      }
    ).setOrigin(0, 0.5);

    const play_button = this.add.graphics();
    play_button.fillStyle(0x000000, 0);
    play_button.fillCircleShape(new Phaser.Geom.Circle(this.cameras.main.width / 2, this.cameras.main.height - 175, 45));

    play_button.setInteractive(new Phaser.Geom.Circle(this.cameras.main.width / 2, this.cameras.main.height - 175, 45), Phaser.Geom.Circle.Contains);

    play_button.on('pointerover', () => {
      this.input.setDefaultCursor('pointer');
    });
    play_button.on('pointerout', () => {
      this.input.setDefaultCursor('default');
    });


    starIcon.setInteractive();

    starIcon.on('pointerdown', () => {
      if (!this.is_ranking_visible) {
        this.showRanking();
        this.is_ranking_visible = true;
      }
      else {
        this.hideRanking();
        this.is_ranking_visible = false;
      }
    });

    let username = sessionStorage.getItem("name");

    if (username && username.length > 0) {

      play_button.on('pointerdown', () => {
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
      play_button.on('pointerdown', () => {
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
