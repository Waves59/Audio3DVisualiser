// example import asset
// import imgPath from './assets/img.jpg';

// TODO : add Dat.GUI
// TODO : add Stats
import son from "./son.mp3";
import Sound from "./Sound.js";



class LoadSound{
    constructor() {
        this.sound = new Sound(son, 103, 0, this.startSound.bind(this), false)
        this.kicks = this.sound.createKick({
            frequency: [0, 1],
            threshold: 30,
            decay: 2.9,
            onKick: (kick) => {
                this.isKick = kick
            }, offKick: null
        });
        this.kicks.on();
    }
    startSound(){
        this.sound.play();
    }


}


var 
  start = Date.now(),
  fov = 30;





export default class App {

    constructor() {

        this.play = new LoadSound();

        

        
        this.container = document.querySelector( '#main' );
    	document.body.appendChild( this.container );

        // create a scene
        this.scene = new THREE.Scene();

        //camera

        this.camera = new THREE.PerspectiveCamera(
            fov,
            window.innerWidth / window.innerHeight,
            1,
            10000
          );
        this.camera.position.z = 100;

        var light = new THREE.PointLight( 0xff0000, 1, 100 );
        light.position.set( 50, 50, 50 );


        // create a wireframe material
        this.material = new THREE.ShaderMaterial( {

            uniforms: THREE.UniformsUtils.merge( [
                THREE.UniformsLib.points,
                THREE.UniformsLib.fog,
                {
                    time: { // float initialized to 0
                        type: "f",
                        value: 0.0
                    },
                    ufrequence: {
                        type: "f",
                        value: 0
                    },
                    color: { 
                        type: "f",
                        value: 0.5
                    },
                    color2: { 
                        type: "f",
                        value: 0.3
                    },
                    size: {
                        type: "f",
                        value: 1.0
                    }
                }
            ] ),
    
            vertexShader: document.getElementById( 'pointVertex' ).textContent,
            //fragmentShader: THREE.ShaderChunk.points_frag
            fragmentShader: document.getElementById('textureVertex').textContent
    
          } );
        

        //geometry  


        // create a sphere and assign the material
        this.mesh = new THREE.Points(
            new THREE.IcosahedronGeometry( 20, 4 ),
            this.material
        );

        this.scene.add( this.mesh );
        this.scene.add( light );


    	this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setPixelRatio( window.devicePixelRatio );
    	this.container.appendChild( this.renderer.domElement );

    	window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.onWindowResize();

        this.renderer.animate( this.render.bind(this) );
        
    }

    render() {
       this.material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );

       if(this.play.isKick < 250){
        this.material.uniforms['ufrequence'].value = this.play.isKick / 150
        this.material.uniforms['color'].value = 0.2
        this.material.uniforms['color2'].value = 0.8
       }
       if(this.play.isKick > 250) {
        console.log(`Kick: ${this.play.isKick}`)
        this.material.uniforms['ufrequence'].value = this.play.sound.frequencyDataArray[0] / 50
        this.material.uniforms['color'].value = 1
        this.material.uniforms['color2'].value = 0.4
       }
        this.renderer.render( this.scene, this.camera );
    }

    onWindowResize() {
    	this.camera.aspect = window.innerWidth / window.innerHeight;
    	this.camera.updateProjectionMatrix();
    	this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

}