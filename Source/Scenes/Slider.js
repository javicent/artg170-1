class Slider extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, initialValue) {
    super(scene, x, y);

    this.scene = scene;
    this.visible = false; // Initially hidden

    // Create the slider track
    this.track = this.scene.add.rectangle(0, 0, width, 10, 0x666666);
    this.add(this.track);

    // Create the handle
    this.handle = this.scene.add.sprite(0, 0, 'handleImage').setInteractive({ draggable: true });
    this.handle.on('drag', this.handleDrag, this);
    this.add(this.handle);

    // Set initial value
    this.setValue(initialValue);
  }

  handleDrag(pointer, dragX) {
    // Constrain the handle's position within the slider track
    const minX = -this.track.width / 2 + this.handle.width / 2;
    const maxX = this.track.width / 2 - this.handle.width / 2;
    const newY = this.handle.y; // Maintain the current Y position
    const newX = Phaser.Math.Clamp(dragX - this.x, minX, maxX);
    this.handle.setPosition(newX, newY);

    // Calculate and update the value based on the handle's position
    const value = (newX - minX) / (maxX - minX); // Normalize to a value between 0 and 1

    // Trigger a custom event to notify value changes
    this.emit('valuechange', value);
  }

  setValue(value) {
    // Set the slider's value (0 to 1)
    const minX = -this.track.width / 2 + this.handle.width / 2;
    const maxX = this.track.width / 2 - this.handle.width / 2;
    const newX = Phaser.Math.Clamp(minX + value * (maxX - minX), minX, maxX);
    this.handle.setPosition(newX, this.handle.y);
  }

  setVisible(isVisible) {
    if(isVisible){
        this.track.setAlpha(1);
        this.track.setInteractive();
        this.handle.setAlpha(1);
        this.handle.setInteractive();        
    }else{
        this.track.setAlpha(0);
        this.track.disableInteractive();
        this.handle.setAlpha(0);
        this.handle.disableInteractive();    
    }
  }
}
