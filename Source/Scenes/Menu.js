class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    //--------------------------------------------------------------------------
    // PRELOAD
    //--------------------------------------------------------------------------
    preload()
    {
        // load audio files
//        this.load.audio("sfx_select", "./Assets/blip_select12.wav"); //Need to find sound smh
        this.load.audio("menuMusic", "./Assets/music/mainmenu.mp3");
        this.load.image("background", "./Assets/juice.jpg")
    }
    //-end preload()------------------------------------------------------------
    //--------------------------------------------------------------------------
    // CREATE
    //--------------------------------------------------------------------------
    create() {
        // Background
        const background = this.add.image(0, 0, "background");
        background.setOrigin(0, 0); // Set the origin to the top-left corner
        background.setScale(game.config.width / background.width, game.config.height / background.height);
    
        // menu music plays
        this.menuMusic = this.sound.add("menuMusic", { loop: true }); // "loop: true" will loop the music
        this.menuMusic.play();
        this.menuMusic.setVolume(game.settings.musicVolume)
        // menu display configuration
        let menuConfig =
        {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#f3b141",
            color: "#843605",
            align: "right",
            padding: {top: 5, bottom: 5},
            fixedWidth: 0
        };
    
        // Menu text positioning
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
    
        // show menu text
        this.add.text
        (
            centerX, // x-coord
            10 + textSpacer, // y-coord
            "Juice Box :)", // initial text to be displayed
            menuConfig // configuration object
        ).setOrigin(0.5);
    
        // Menu Buttons
        // Start
        this.startButton = this.add.text(centerX, centerY + textSpacer, "Start Game", menuConfig)
        .setOrigin(0.5)
        .setInteractive()
        .setAlpha(1);
    
        // Settings
        this.settingsButton = this.add.text(centerX, centerY + textSpacer + 50, "Settings", menuConfig)
        .setOrigin(0.5)
        .setInteractive()
        .setAlpha(1);
    
        // Credits
        this.creditsButton = this.add.text(centerX, centerY + textSpacer + 100, "Credits", menuConfig)
        .setOrigin(0.5)
        .setInteractive()
        .setAlpha(1);
    
        // Back to Main Menu
        this.backButton = this.add.text(centerX, centerY + textSpacer + 100, "Back", menuConfig)
        .setOrigin(0.5)
        .disableInteractive()
        .setAlpha(0);
    
        // Settings Sliders
        // Music Volume
        const initialValue = game.settings.musicVolume;
        const minX = centerX - 150;
        const maxX = centerX + 150;

        const initialX = minX + initialValue * (maxX - minX);

        this.musVolSlider = this.add.rectangle(centerX, centerY, 300, 10, 0x666666);
        this.musVolSlider.setAlpha(0).disableInteractive();

        // Create the handle at the initial position
        this.musVolHandle = this.add.sprite(initialX, centerY, "handleImage").setAlpha(0).disableInteractive(); // Replace with your handle image
        // Handle drag event
        this.musVolHandle.on("drag", (pointer, dragX) => {
            // Constrain the handle's position within the slider track
            const newX = Phaser.Math.Clamp(dragX, minX, maxX);
            this.musVolHandle.setPosition(newX, centerY);

            // Calculate and update the value based on the handle's position
            const value = (newX - minX) / (maxX - minX); // Normalize to a value between 0 and 1
            //console.log("Volume Value:", value);

            // Update the volume of the music
            this.menuMusic.setVolume(value);
            game.settings.musicVolume = value;
        });
    
        // SFX Volume
        const sfxInitVal = game.settings.sfxVolume;
        const sfxMinX = centerX - 150;
        const sfxMaxX = centerX + 150;

        const sfxInitX = minX + sfxInitVal * (maxX - minX);

        this.sfxSliderTrack = this.add.rectangle(centerX, centerY - 100, 300, 10, 0x666666);
        this.sfxSliderTrack.setAlpha(0).disableInteractive();

        // Create the handle at the initial position
        this.sfxHandle = this.add.sprite(sfxMinX, centerY - 100, "handleImage").setAlpha(0).disableInteractive(); // Replace with your handle image
        // Handle drag event
        this.sfxHandle.on("drag", (pointer, dragX) => {
            // Constrain the handle's position within the slider track
            const newX = Phaser.Math.Clamp(dragX, minX, maxX);
            this.sfxHandle.setPosition(newX, centerY - 100);

            // Calculate and update the value based on the handle's position
            const sfxValue = (newX - minX) / (maxX - minX); // Normalize to a value between 0 and 1
            console.log("Brightness Value:", sfxValue);
            game.settings.sfxVolume = sfxValue;

            // Update the volume of the music
        });

    
        // Main Menu Button Actions
        // Start
        this.startButton.on('pointerdown', () => {
            this.startGame();
        });
    
        // Settings
        this.settingsButton.on('pointerdown', () => {
            this.settings();
        });
    
        // Credits
        this.creditsButton.on('pointerdown', () => {
            this.credits();
        });
    
        // Back
        this.backButton.on('pointerdown', () => {
            this.back();
        });

        // Credits :)
        this.creditJustin = this.add.text
        (
            centerX - 100, // x-coord
            250 - textSpacer, // y-coord
            "Justin", // initial text to be displayed
            menuConfig // configuration object
        ).setOrigin(0.5).setAlpha(0);

        this.creditKen = this.add.text
        (
            centerX + 100, // x-coord
            250 - textSpacer, // y-coord
            "Ken", // initial text to be displayed
            menuConfig // configuration object
        ).setOrigin(0.5).setAlpha(0);
        
        this.creditNoah = this.add.text
        (
            centerX - 100, // x-coord
            300 - textSpacer, // y-coord
            "Noah", // initial text to be displayed
            menuConfig // configuration object
        ).setOrigin(0.5).setAlpha(0);

        this.creditThomas = this.add.text
        (
            centerX + 100, // x-coord
            300 - textSpacer, // y-coord
            "Thomas", // initial text to be displayed
            menuConfig // configuration object
        ).setOrigin(0.5).setAlpha(0);
        
        this.creditJin = this.add.text
        (
            centerX - 100, // x-coord
            350 - textSpacer, // y-coord
            "Jin", // initial text to be displayed
            menuConfig // configuration object
        ).setOrigin(0.5).setAlpha(0);

        this.creditMars = this.add.text
        (
            centerX + 100, // x-coord
            350 - textSpacer, // y-coord
            "Mars", // initial text to be displayed
            menuConfig // configuration object
        ).setOrigin(0.5).setAlpha(0);

        this.creditAndrew = this.add.text
        (
            centerX - 100, // x-coord
            400 - textSpacer, // y-coord
            "Andrew", // initial text to be displayed
            menuConfig // configuration object
        ).setOrigin(0.5).setAlpha(0);

        this.creditTy = this.add.text
        (
            centerX + 100, // x-coord
            400 - textSpacer, // y-coord
            "Ty", // initial text to be displayed
            menuConfig // configuration object
        ).setOrigin(0.5).setAlpha(0);

        // define input keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    startGame() {
        // Configuration settings for the game
        game.settings = {
            playerSpeed: 4,
            fastzombieSpeed: 4,
            gameTimer: 1320000,
            gasTimer: 0,
            gas: 8,
            apm: 'pm',
        };
    
        this.sound.play("sfx_select");
    
        // Stop the menu music (if any)
        if (this.menuMusic) {
            this.menuMusic.stop();
        }
    
        // Transition to the game scene
        this.scene.start("playScene");
    }

    settings(){
        //Disable Main Menu Buttons
        this.startButton.setAlpha(0).disableInteractive();
        this.creditsButton.setAlpha(0).disableInteractive();
        this.settingsButton.setAlpha(0).disableInteractive();
        // Enable Settings Sliders/Buttons
        this.musVolSlider.setAlpha(1).setInteractive();
        this.sfxSliderTrack.setAlpha(1).setInteractive();
        this.musVolHandle.setAlpha(1).setInteractive({ draggable: true });
        this.sfxHandle.setAlpha(1).setInteractive({ draggable: true });
        
        this.backButton.setAlpha(1).setInteractive();
    }

    back(){
        // Enable Main Menu Buttons
        this.startButton.setAlpha(1).setInteractive();
        this.creditsButton.setAlpha(1).setInteractive();
        this.settingsButton.setAlpha(1).setInteractive();
        // Disable EVERYTHING ELSE
        // Disable Settings
        this.musVolSlider.setAlpha(0).disableInteractive();
        this.brightSliderTrack.setAlpha(0).disableInteractive();
        this.musVolHandle.setAlpha(0).disableInteractive();
        this.brightHandle.setAlpha(0).disableInteractive();
        this.backButton.setAlpha(0).disableInteractive();
        // Disable credits
        this.creditJustin.setAlpha(0);
        this.creditJin.setAlpha(0);
        this.creditAndrew.setAlpha(0);
        this.creditKen.setAlpha(0);
        this.creditMars.setAlpha(0);
        this.creditNoah.setAlpha(0);
        this.creditThomas.setAlpha(0);
        this.creditTy.setAlpha(0);
    }

    credits(){   
        //Disable Main Menu Buttons
        this.startButton.setAlpha(0).disableInteractive();
        this.creditsButton.setAlpha(0).disableInteractive();
        this.settingsButton.setAlpha(0).disableInteractive();

        // Enable Credits Buttons        
        this.creditJustin.setAlpha(1);
        this.creditJin.setAlpha(1);
        this.creditAndrew.setAlpha(1);
        this.creditKen.setAlpha(1);
        this.creditMars.setAlpha(1);
        this.creditNoah.setAlpha(1);
        this.creditThomas.setAlpha(1);
        this.creditTy.setAlpha(1);

        this.backButton.setAlpha(1).setInteractive();        
    }
    // UPDATE
    //--------------------------------------------------------------------------
    update()
    {
        console.log(game.settings.sfxVolume);
    }
}
//-end update()-----------------------------------------------------------------

