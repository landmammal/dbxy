class GameScene extends Phaser.Scene {
    constructor(){
        super({ key: 'GameScene' });
    }
    
    preload() {   
        this.load.spritesheet('gokuw','assets/gokuw.png',{ frameWidth: 55.5, frameHeight: 68 });
        this.load.spritesheet('gokui', 'assets/gokui.png', { frameWidth: 50, frameHeight: 72 });
        this.load.spritesheet('gokut', 'assets/gokut.png',{frameWidth: 51.5, frameHeight: 72 });
        this.load.spritesheet('gokuj', 'assets/gokuj.png',{frameWidth: 46.5, frameHeight:80 });
        this.load.spritesheet('gokua', 'assets/gokua.png',{frameWidth: 56, frameHeight : 98 }) 
        this.load.image('ground', 'assets/platform.png');
        this.load.image('background', 'assets/dbz_sky.jpeg'); // closes 
    }

    create (){  

        // score text
        gameState.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '15px', fill: '#000000' })
        
        // mountain backgrounds
        this.add.image(800, 180, "background")
        this.add.image(2400, 180, "background")
        this.add.image(4000, 180, "background")
        this.add.image(5600, 180, "background")
        this.add.image(7200, 180, "background")
        this.add.image(8800, 180, "background")

        //Platform Physics
        const platforms = this.physics.add.staticGroup();

        //Creating Platforms
        //Ground Level Platform
        platforms.create(200, 400, "ground").setScale(0.5).refreshBody();
        //More Ground: Make them 1050px apart
        platforms
            .create(1250, 400, "ground")
            .setScale(0.5)
            .refreshBody();
        platforms
            .create(2300, 400, "ground")
            .setScale(0.5)
            .refreshBody();
        platforms
            .create(3350, 400, "ground")
            .setScale(0.5)
            .refreshBody();
        platforms
            .create(4400, 400, "ground")
            .setScale(0.5)
            .refreshBody();

        // adding hero
        gameState.player = this.physics.add.sprite(125,110,'gokui')
        gameState.player.setBounce(0.2);
        gameState.player.setCollideWorldBounds(true);

        // adding animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('gokuw', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'idle',
            frames: [ { key: 'gokui', frame: 3 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('gokuw', { start: 2, end:2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('gokut', { start: 0, end: 2 }),
            frameRate: 2,
            repeat: -1
        });
    
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('gokuj', { start: 1, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
    
        this.anims.create({
            key: 'space',
            frames: this.anims.generateFrameNumbers('gokua', { start: 3, end:5 } ),
            frameRate: 15
        });

        // camara settings
        this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
        this.physics.world.setBounds(0, 0, gameState.width, gameState.height) 
        this.cameras.main.startFollow(gameState.player, true, .05)

        // check for collisions
        this.physics.add.collider(gameState.player, platforms)

        // controllers for scene
        gameState.cursors = this.input.keyboard.createCursorKeys();

        // restart game
        this.input.on('pointerup', () => {
            gameState.score = 0;
            this.scene.restart();
          })

    }

     update (){ 
        if (gameState.cursors.right.isDown) {
            // moving right:
            gameState.player.setVelocityX(160);
            gameState.player.play('right', true);
          

        } else if (gameState.cursors.left.isDown) {
            // move left:
            gameState.player.setVelocityX(-160);
            gameState.player.anims.play('left', true);

        } else if (gameState.cursors.up.isDown){
            // jumping:
            gameState.player.setVelocityY(-330);
            gameState.player.anims.play('up', false)
            
        } else if (gameState.cursors.down.isDown) {
            // power pressing down:
            gameState.player.anims.play('down', true)
        }else if (gameState.cursors.space.isDown) {
            // power space down:
            // gameState.player.play('down', true);
            // gameState.power.visible=true
            gameState.power.anims.play('space',true)
            gameState.power.setVelocityX(160);   

        }else {
            // stay idle:            
            gameState.player.setVelocityX(0);
            gameState.player.play('idle');
        }
    }
}