class Placar extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        //scene.add.existing(this);

        this.text = scene.add.text(x, y, '', { fontFamily: 'Impact', fontSize: '25px', fill: '#fff' }).setOrigin(0);
        this.text.setDepth(1);
    }

    atualizarTempo(tempo) {
        this.text.setText(`${Math.floor(tempo)} s`);
    }
}

export default Placar;