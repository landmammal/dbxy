class StartScene extends Phaser.Scene {
    constructor(){
        super({ key: 'StartScene' })
    }
    
    create(){
        this.add.text( 600, 300, 'Welcome to DBZXY', {fill: '#d1552e', fontSize: '20px'})
		this.input.on('pointerdown', () => {
			this.scene.stop('StarScene')
			this.scene.start('GameScene')
		})
    }
}