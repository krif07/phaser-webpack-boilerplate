import Phaser from "phaser";
import initAnimations from './playerAnims';
import collidable from "../mixins/collidable";

class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //Mixins
        Object.assign(this, collidable);

        this.init();
        this.initEvents();
    }

    init(){
        this.gravity = 500;
        this.playerVelocity = 150;
        this.jumpCount = 0;
        this.consecutiveJumps = 1;
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);

        initAnimations(this.scene.anims);
    }

    initEvents() {
        // To start listening the update event from main scene
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        const {left, right, space, up} = this.cursors;
        const isSpaceJustDownFunction = Phaser.Input.Keyboard.JustDown(space);
        const isUpJustDownFunction = Phaser.Input.Keyboard.JustDown(up);
        const onFloor = this.body.onFloor();

        if(left.isDown){
            this.setVelocityX(-this.playerVelocity);
            this.setFlipX(true);
        }else if(right.isDown){
            this.setVelocityX(this.playerVelocity);
            this.setFlipX(false);
        }else {
            this.setVelocityX(0);
        }

        if((isSpaceJustDownFunction || isUpJustDownFunction) && (onFloor || this.jumpCount < this.consecutiveJumps)){
            this.setVelocityY(-this.playerVelocity * 2);
            this.jumpCount++;
        }

        if(onFloor){
            this.jumpCount=0;
            this.body.velocity.x !== 0 ?
                this.play('run', true) : this.play('idle', true);
        }
        else{
            this.play('jump', true);
        }
    }
}
export default Player;
