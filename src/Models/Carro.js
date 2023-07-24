class Carro extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setScale(0.25);
        this.setAngle(180);
        this.setDepth(0.5);
        scene.add.existing(this);
        scene.physics.world.enable(this);
    }
}

export default Carro;