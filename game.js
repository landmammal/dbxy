// global state
const gameState = {
    score: 0
}


// phaser game configf
var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 550,
    fps: {target: 60},
    backgroundColor: "b9baff",
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 800 },
        enableBody: true,
  
      }
    },
    scene: [GameScene] //StartScene
};

const game = new Phaser.Game(config);