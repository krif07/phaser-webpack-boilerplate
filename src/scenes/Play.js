import Phaser from 'phaser';
import Player from "../entities/Player";

class Play extends Phaser.Scene {

    constructor(config) {
        super('PlayScene');
        this.config = config;
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const player = this.createPlayer();

        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders
            }
        });

        this.setUpFollowUpCameraOn(player);
    }

    createMap(){
        const map = this.make.tilemap({key: 'map'});
        map.addTilesetImage('main_lev_build_1','tiles-1');
        return map;
    }

    createLayers(map){
        const tileSet1 = map.getTileset('main_lev_build_1');
        const platformsColliders = map.createDynamicLayer('platforms_colliders', tileSet1);
        const platforms = map.createStaticLayer('platforms', tileSet1);
        const environment = map.createStaticLayer('environment', tileSet1);

        //platformsColliders.setCollisionByExclusion(-1, true);
        platformsColliders.setCollisionByProperty({collides: true});
        return {environment, platforms, platformsColliders}
    }

    createPlayer(){
        return new Player(this, 100, 250);
    }

    createPlayerColliders(player, {colliders}){
        player.addCollider(colliders.platformsColliders, null);
    }

    setUpFollowUpCameraOn(player){
        const {height, width, mapOffset, zoomFactor} = this.config;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
        this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomFactor);
        this.cameras.main.startFollow(player);
    }

}

export default Play;
