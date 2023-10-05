class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }
    //--------------------------------------------------------------------------
    // PRELOAD
    //--------------------------------------------------------------------------
    preload()
    {
    } 
    //-end preload()------------------------------------------------------------
    //--------------------------------------------------------------------------
    // CREATE
    //--------------------------------------------------------------------------
    create()
    {
        this.paused = false;
        // menu display configuration
        let menuConfig =
        {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#f3b141",
            color: "#843605",
            align: "center",
            padding: {top: 5, bottom: 5},
            fixedWidth: 0
        };
    
        // Menu text positioning
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
            
        // Settings Sliders    
        // Music Volume
        const musXSpacer = -50;
        const musInitVal = game.settings.musicVolume;
        const musMinX = centerX - 150 + musXSpacer;
        const musMaxX = centerX + 150 + musXSpacer;

        const musInitX = musMinX + musInitVal * (musMaxX - musMinX);

        this.musVolSlider = this.add.rectangle(centerX + musXSpacer, centerY - 100, 300, 10, 0x666666);
        this.musVolSlider.setAlpha(0).disableInteractive();

        // Create the handle at the initial position
        this.musVolHandle = this.add.rectangle(musInitX, centerY - 100, 25, 50, 0x00ff00).setAlpha(0).disableInteractive(); // Replace with your handle image
        // Handle drag event
        this.musVolHandle.on("drag", (pointer, dragX) => {
            // Constrain the handle's position within the slider track
            const musNewX = Phaser.Math.Clamp(dragX, musMinX, musMaxX);
            this.musVolHandle.setPosition(musNewX, centerY - 100);

            // Calculate and update the value based on the handle's position
            const musValue = (musNewX - musMinX) / (musMaxX - musMinX); // Normalize to a value between 0 and 1

            // Update the volume of the music
            this.menuMusic.setVolume(musValue);
            game.settings.musicVolume = musValue;
        });
        this.musVol = this.add.text
        (
            musMinX - 60, // x-coord
            centerY - 100, // y-coord
            "Music\nVolume:", // initial text to be displayed
            menuConfig // configuration object
        ).setOrigin(0.5).setAlpha(0);

        // SFX Volume
        const sfxXSpacer = -50;
        const sfxInitVal = game.settings.sfxVolume;
        const sfxMinX = centerX - 150 + sfxXSpacer;
        const sfxMaxX = centerX + 150 + sfxXSpacer;

        const sfxInitX = sfxMinX + sfxInitVal * (sfxMaxX - sfxMinX);

        this.sfxVolSlider = this.add.rectangle(centerX + sfxXSpacer, centerY, 300, 10, 0x666666);
        this.sfxVolSlider.setAlpha(0).disableInteractive();

        this.sfxVolHandle = this.add.rectangle(sfxInitX, centerY,  25, 50, 0x00ff00).setAlpha(0).disableInteractive(); // Replace with your handle image
        // Handle drag event
        this.sfxVolHandle.on("drag", (pointer, dragX) => {
            // Constrain the handle's position within the slider track
            const sfxNewX = Phaser.Math.Clamp(dragX, sfxMinX, sfxMaxX);
            this.sfxVolHandle.setPosition(sfxNewX, centerY);

            // Calculate and update the value based on the handle's position
            const value = (sfxNewX - sfxMinX) / (sfxMaxX - sfxMinX); // Normalize to a value between 0 and 1

            // Update the volume of the music
            //this.menuMusic.setVolume(value); //replace with sfx music
            game.settings.sfxVolume = value;
        });
        this.sfxVol = this.add.text
        (
            sfxMinX - 60, // x-coord
            centerY, // y-coord
            "SFX\nVolume:", // initial text to be displayed
            menuConfig // configuration object
        ).setOrigin(0.5).setAlpha(0);        

        // Back Button
        this.backButton = this.add.text(centerX - 200, centerY + textSpacer + 100, "Back", menuConfig)
        .setOrigin(0.5)
        .disableInteractive()
        .setAlpha(0);
        this.backButton.on('pointerdown', () => {
            this.resume();
        });     

        // Return to main menu
        this.mainMenu = this.add.text(centerX + 200, centerY + textSpacer + 100, "Exit game", menuConfig)
        .setOrigin(0.5)
        .disableInteractive()
        .setAlpha(0);
        this.mainMenu.on('pointerdown', () => {
            this.returnToMainMenu();
        });    
    }
    // end create() ------------------------------------------------------------
    //--------------------------------------------------------------------------
    // UPDATE
    //--------------------------------------------------------------------------
    update()
    {
        // Add an event listener for the "Escape" key press
        this.input.keyboard.on('keydown-ESC', function (event) {
            if(!this.paused){
                this.pause();
            }else{
                this.resume();
            }
        }, this);
    }
    //-end update()-------------------------------------------------------------
    //--------------------------------------------------------------------------
    // COLLISIONS

    pause(){
       this.showSettings();
    }
    resume(){
        this.hideSettings();
    }

    returnToMainMenu(){
        this.hideSettings();
        
        this.confirmMainMenu = this.add.text(game.config.width/2, game.config.height/2, "Are you sure you want to exit?\nAll progress will be lost")
        .setOrigin(0.5)
        .setInteractive()
        .setAlpha(1);
        this.confirmMainMenuY = this.add.text(game.config.width/2 - 20, game.config.height/2 + 100, "Yes")
        .setOrigin(0.5)
        .setInteractive()
        .setAlpha(1);
        this.confirmMainMenuY.on('pointerdown', () => {
            this.scene.start("menuScene");            
        });
        this.confirmMainMenuN = this.add.text(game.config.width/2 + 20, game.config.height/2 + 100, "No")
        .setOrigin(0.5)
        .setInteractive()
        .setAlpha(1);        
        this.confirmMainMenuN.on('pointerdown', () => {
            this.confirmMainMenu.setAlpha(0).disableInteractive();
            this.confirmMainMenuY.setAlpha(0).disableInteractive();
            this.confirmMainMenuN.setAlpha(0).disableInteractive();
            this.showSettings();
        });
    }

    hideSettings(){
        this.musVolSlider.setAlpha(0).disableInteractive();
        this.sfxVolSlider.setAlpha(0).disableInteractive();
        this.musVolHandle.setAlpha(0).disableInteractive();
        this.sfxVolHandle.setAlpha(0).disableInteractive();
        this.musVol.setAlpha(0).disableInteractive();
        this.sfxVol.setAlpha(0).disableInteractive();

        this.mainMenu.setAlpha(0).disableInteractive();
        this.backButton.setAlpha(0).disableInteractive();
    }

    showSettings(){
        this.musVolSlider.setAlpha(1).setInteractive();
        this.musVolHandle.setAlpha(1).setInteractive({ draggable: true });        
        this.musVol.setAlpha(1).setInteractive();
        this.sfxVolSlider.setAlpha(1).setInteractive();
        this.sfxVolHandle.setAlpha(1).setInteractive({ draggable: true });
        this.sfxVol.setAlpha(1).setInteractive();

        this.mainMenu.setAlpha(1).setInteractive();
        this.backButton.setAlpha(1).setInteractive(); 
    }

    formatTime(ms)
    {
        let s = ms/1000;
        let min = Math.floor(s/60);
        let seconds = s%60;
        seconds = seconds.toString().padStart(2, "0");
        return `${min}:${seconds}`;
    }

    

}
