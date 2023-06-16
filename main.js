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

loader.load(
  '/models/mountain/scene.gltf',
  function (gltf) {
    scene.add(gltf.scene);

    gltf.scene.position.x = 15;
    gltf.scene.position.y = 10;
    gltf.scene.position.z = 2730;
    gltf.scene.rotation.y = 0.5;
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

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);

controls.target = new THREE.Vector3(-40, 30, -100);
controls.enableRotate = false;
controls.enablePan = false;
controls.minDistance = 100;

function addStar(a, b, c) {
  const geometry = new THREE.SphereGeometry(.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const x = Math.random() * (100 + 100) - 100;
  const y = Math.random() * (100 + 100) - 100;
  const z = Math.random() * (3000 - 100) + 100;

  star.position.set(x,y,z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar);

const skyTexture = new THREE.TextureLoader().load('images/greenblacksky.avif');
scene.background = skyTexture;

const pfpTexture = new THREE.TextureLoader().load('images/pfp.PNG');

const pfp = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map : pfpTexture})
);

scene.add(pfp);

pfp.position.x = -16;
pfp.position.y = 28;
pfp.position.z = 792;

const kbTexture = new THREE.TextureLoader().load('images/keyboard.PNG');

const kb = new THREE.Mesh(
  new THREE.BoxGeometry(10, 3, 0.1),
  new THREE.MeshBasicMaterial({map : kbTexture})
);

scene.add(kb);

kb.position.x = -15;
kb.position.y = 28;
kb.position.z = 1490;

const ghTexture = new THREE.TextureLoader().load('images/github.PNG');

const gh = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({map : ghTexture})
);

scene.add(gh);

gh.position.x = -12;
gh.position.y = 28;
gh.position.z = 2185;

function makeIntroVisible() {
  const instruction = document.getElementById("instructions");
  instruction.style.visibility = "visible";
}

document.getElementById("project1").addEventListener("click", function() {changeProjectDescription(1);});
document.getElementById("project2").addEventListener("click", function() {changeProjectDescription(2);});
document.getElementById("project3").addEventListener("click", function() {changeProjectDescription(3);});
document.getElementById("project4").addEventListener("click", function() {changeProjectDescription(4);});

function changeProjectDescription(i) {
  switch (i) {
    case 0:
      // Default
      document.getElementById("project-name").innerText = "Projects";
      document.getElementById("project-description").innerText = "This section shows personal projects as well as significant school projects. Please click on the icons above to view.";
      document.getElementById("video-link").innerHTML = "";
      document.getElementById("gh-link").innerHTML = "";
      break;
    case 1:
      // Sports Organizer 
      document.getElementById("project-name").innerText = "Springboot Sports Organizer Webapp";
      document.getElementById("project-description").innerText = "This project acts as a full-stack web site acting as a sports organization tool, meaning a web site that emulates the real life applications used by many recreational centers to organize local sporting events. This app lets users create accounts, organize and join different sporting events divided into leagues and tournaments, and create and join teams. The program takes care of scheduling, maintaining rules, and providing a convenient user interface."
      document.getElementById("video-link").innerHTML = "";
      document.getElementById("gh-link").innerHTML = "<a href='https://github.com/DallasSchauer/Spring-Sports-Organizer'>Github Page</a>";
      break;
    case 2:
      // Ride Sim
      document.getElementById("project-name").innerText = "Ride Simulation App";
      document.getElementById("project-description").innerText = "App that simulates hypothetical ride simulation service using drones to pick up people.";
      document.getElementById("video-link").innerHTML = "<iframe width='560' height='315' src='https://www.youtube.com/embed/YyKTyInRQIw' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen></iframe>";
      document.getElementById("gh-link").innerText = "";
      break;
    case 3:
      // Wordle Sim
      document.getElementById("project-name").innerText = "Wordle Solver Web App";
      document.getElementById("project-description").innerText = "Webapp that uses my Wordle solving AI to test different strategies.";
      document.getElementById("video-link").innerHTML = "";
      document.getElementById("gh-link").innerHTML = "<a href='https://github.com/DallasSchauer/WordleSolverWebApp'>Github Page</a>";
      break;
    case 4:
      // Website
      document.getElementById("project-name").innerText = "This Website";
      document.getElementById("project-description").innerText = "Portfolio website using Threejs";
      document.getElementById("video-link").innerHTML = "";
      document.getElementById("gh-link").innerHTML = "<a href='https://github.com/DallasSchauer/PortfolioPage'>Github Page</a>";
    default:
      console.log("Switch statement error.");
  }
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -.25;

  console.log("X : " + camera.position.x + ", Y : " + camera.position.y + ", Z : " + camera.position.z);

  if (t != 0) {
    const instruction = document.getElementById("instructions");
    instruction.style.visibility = "hidden";
  }
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  pfp.rotation.x += 0.0075;
  pfp.rotation.y += 0.0075;

  kb.rotation.z += 0.005;

  gh.rotation.z += 0.005;

  renderer.render(scene, camera);
}

animate()
setTimeout(makeIntroVisible, 3000);
