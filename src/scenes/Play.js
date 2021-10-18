import Phaser from 'phaser';

class Play extends Phaser.Scene {

    constructor() {
        super('PlayScene');
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
    }

    createMap(){
        const map = this.make.tilemap({key: 'map'});
        map.addTilesetImage('main_lev_build_1','tiles-1');
        return map;
    }

    createLayers(map){
        const tileSet1 = map.getTileset('main_lev_build_1');
        const environment = map.createStaticLayer('environment', tileSet1);
        const platforms = map.createDynamicLayer('platforms', tileSet1);
        return {environment, platforms}
    }
}

export default Play;
