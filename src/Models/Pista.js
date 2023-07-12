class Pista extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y, width, height, texture) {
        super(scene, x, y, width, height, texture);
        scene.add.existing(this);
    }
}

export default Pista;