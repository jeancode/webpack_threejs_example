
import * as THREE from 'three';


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// Configurar la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear un cubo
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Posicionar la cámara
camera.position.z = 5;


new RGBELoader()
.setPath( './textures/equirectangular/' )
.load( 'royal_esplanade_1k.hdr', function ( texture ) {

    texture.mapping = THREE.EquirectangularReflectionMapping;
    //scene.background = texture;
    scene.environment = texture;
    
} );




const loader = new GLTFLoader().setPath( './models/gltf/DamagedHelmet/glTF/' );

loader.load( 'DamagedHelmet.gltf', async function ( gltf ) {

    const model = gltf.scene;

    // wait until the model can be added to the scene without blocking due to shader compilation
    await renderer.compileAsync( model, camera, scene );

    scene.add( model );


} );





// Animación
const animate = function () {
    requestAnimationFrame(animate);

    // Rotar el cubo
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

// Iniciar la animación
animate();