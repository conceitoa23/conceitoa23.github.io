import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/MTLLoader';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera(
    30,
    window.innerHeight / window.innerHeight,
    10,
    1800
);
scene.add( camera );

camera.rotation.y = (45 / 180) * Math.PI;
camera.position.x = 800;
camera.position.y = 100;
camera.position.z = 1000;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;

const light1 = new THREE.PointLight(0xc4c4c4, 1);
light1.position.set(100, 300, 200);
scene.add(light1);

const light2 = new THREE.PointLight(0xc4c4c4, 1);
light2.position.set(500, 100, 300);
scene.add(light2);

const light3 = new THREE.PointLight(0xc4c4c4, 1);
light3.position.set(400, 100, -300);
scene.add(light3);

const light4 = new THREE.PointLight(0xc4c4c4, 1);
light4.position.set(-500, 300, -300);
scene.add(light4);

const pointLight= new THREE.PointLight(0xffffff);
pointLight.position.set(50,50,50);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const mtlloader = new MTLLoader();
mtlloader.setPath('https://github.com/conceitoa23/conceitoa23.github.io/blob/main/');
mtlloader.load(
    'caixinhapendrive.mtl', (materials) => {
    materials.preload();

    const objloader = new OBJLoader();
    objloader.setMaterials(materials);
    objloader.setPath('https://github.com/conceitoa23/conceitoa23.github.io/blob/main/');
    objloader.load(
        'caixinhapendrive.obj', 
        (object) => {
            object.scale.set(80, 80, 80);
            scene.add(object);
    },
    (xhr) => {
        console.log(
            `Carregando objeto: ${(xhr.loaded / xhr.total) * 100}% Carregados`
        );
    },
    (err) => {
        console.log(`Aconteceu um erro no objeto: ${err}`);    
    }
);
},  
(xhr) => {
    console.log(
        `Carregando material: ${(xhr.loaded / xhr.total) * 100}% Carregados`
    );
},
(err) => {
    console.log(`Aconteceu um erro no material: ${err}`);    
}
);

const animate = function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
};


animate();
