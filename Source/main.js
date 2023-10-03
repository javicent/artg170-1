// Create game configuration object
let config =
{
    type: Phaser.CANVAS,
    width: 640, //default 640
    //width: 1700, //default 640
    
    height: 480, //default 480
    scene: [Menu, Play]
};

let game = new Phaser.Game(config); // create main game object

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// define the game settings, initially set for easy mode
game.settings =
{
    playerSpeed: 5,
    fastzombieSpeed: 4,
    gameTimer: 6000,
    gasTimer: 0,
    gas: 8,
    apm: 'pm',
};

// reserve some keyboard bindings
let keyE, keyH, keyM, keyR, keyLEFT, keyRIGHT, keyA, keyD, keySPACE;
// reserve an inputPlugin binding
let mouse;