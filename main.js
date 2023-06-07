import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function() {
  console.log('Started');
}

loadingManager.onLoad = function() {
  console.log('Loaded');
}

const loader = new GLTFLoader(loadingManager);
loader.load(
  '/models/computer/scene.gltf',
  function (gltf) {
    scene.add(gltf.scene);
    
  },
  function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	function ( error ) {
		console.log( 'An error happened' );
	}
);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(-20, 28, 0);


renderer.render(scene, camera);

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial( {color: 0xFF6347});
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus)

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// const gridHelper = new THREE.GridHelper(2000, 50);
// scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

controls.target = new THREE.Vector3(-40, 30, -100);
controls.enableRotate = false;
controls.enablePan = false;
controls.minDistance = 100;

function addStar(a, b, c) {
  const geometry = new THREE.SphereGeometry(.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = [a, b, c];
  star.position.set(x,y,z);
  scene.add(star);
}

addStar(-19, 28, 865);
addStar(-19, 28, 1565);
addStar(-19, 28, 2240);
addStar(-19, 28, 2815);

// Array(1000).fill().forEach(addStar);

const skyTexture = new THREE.TextureLoader().load('greenblacksky.avif');
scene.background = skyTexture;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -.25;
  // camera.position.x = t * -.002 - 20;
  // camera.position.y = t * -.002 + 28;

  console.log("X : " + camera.position.x);
  console.log("Y : " + camera.position.y);
  console.log("Z : " + camera.position.z);

  if (t != 0) {
    const instruction = document.getElementById("instructions");
    instruction.style.visibility = "hidden";
  }
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

console.log("X : " + camera.position.x);
console.log("Y : " + camera.position.y);
console.log("Z : " + camera.position.z);

animate()