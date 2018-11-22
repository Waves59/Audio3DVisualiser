// example import asset
// import imgPath from './assets/img.jpg';

// TODO : add Dat.GUI
// TODO : add Stats

export default class App {

    constructor() {

        this.container = document.querySelector( '#main' );
    	document.body.appendChild( this.container );

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 10 );
        this.camera.position.z = 1;

    	this.scene = new THREE.Scene();

        let geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3(-0.1, 0, 0), // 0
            new THREE.Vector3(0.1, 0, 0), // 1
            new THREE.Vector3(0, 0.2, 0), // 2
            new THREE.Vector3(0, -0.2, 0 ), // 3
            new THREE.Vector3(0.2,-0.2,0), // 4
            new THREE.Vector3(-0.2, -0.2, 0 ), // 5
        );
        geometry.faces.push(
            new THREE.Face3(0,1,2),
            new THREE.Face3(1,3,4),
            new THREE.Face3(0,5,3)
        );
        
        
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        this.mesh = new THREE.Mesh( geometry, material );

        this.scene.add(this.mesh)


    	this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    	this.renderer.setPixelRatio( window.devicePixelRatio );
    	this.renderer.setSize( window.innerWidth, window.innerHeight );
    	this.container.appendChild( this.renderer.domElement );

    	window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.onWindowResize();

        this.renderer.animate( this.render.bind(this) );
    }

    render() {

    	this.renderer.render( this.scene, this.camera );
    }

    onWindowResize() {

    	this.camera.aspect = window.innerWidth / window.innerHeight;
    	this.camera.updateProjectionMatrix();
    	this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}
