import Phaser from 'phaser';

class Play extends Phaser.Scene {

    constructor() {
        super('PlayScene');
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const player = this.createPlayer();
        this.physics.add.collider(player, layers.platformsColliders);
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
        const player = this.physics.add.sprite(100, 250, 'player');
        player.body.setGravityY(500);
        player.setCollideWorldBounds(true);
        return player;
    }
}

export default Play;
