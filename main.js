import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)

const renderer = new THREE.WebGLRenderer({
  alpha: true,
});
renderer.setSize( window.innerWidth-20, window.innerHeight -20)
renderer.setClearColor(0xcccfff, 0.5);
// Set up the renderer for shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement )






//Floor
const geometry = new THREE.PlaneGeometry(10,10)
const material = new THREE.MeshStandardMaterial({ 
  color: 0xffce3,
  metalness: 1,
  roughness: 1,

});
const floor = new THREE.Mesh( geometry, material)
floor.rotation.x = -Math.PI / 2
floor.position.y = 0.1
floor.receiveShadow = true
scene.add(floor)





//Cube
const cubeGeometry = new THREE.BoxGeometry(1,2,1)
const cubeMaterial= new THREE.MeshStandardMaterial({ 
  color: 0xfffffc,
  metalness: 1,
  roughness: 1,
 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.position.set(0,1,0)
cube.castShadow = true
scene.add(cube)




// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 4, 2);
light.target.position.set(-5, 0, 0);
light.castShadow = true;
light.shadow.bias = 0;
//camera properties
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 10;
light.shadow.camera.left = -10;
light.shadow.camera.right = 10;
light.shadow.camera.top = 10;
light.shadow.camera.bottom = -20;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

//Light2
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(0, 4, 2);
light2.target.position.set(-5, 0, 0);
light2.shadow.bias = -0.01;
//camera properties

//Light3
const light3 = new THREE.DirectionalLight(0xffffff, 1);
light3.position.set(-5, 4, 2);
light3.target.position.set(-5, 0, 0);
light3.shadow.bias = -0.01;
//camera properties
light3.shadow.camera.near = 0.1;
light3.shadow.camera.far = 100;
light3.shadow.camera.left = -10;
light3.shadow.camera.right = 10;
light3.shadow.camera.top = 10;
light3.shadow.camera.bottom = -10;
light3.shadow.mapSize.width = 1024;
light3.shadow.mapSize.height = 1024;

// Add the light to the scene
scene.add(light);
scene.add(light2);
scene.add(light3);






// Camera Position
camera.position.z = 5
camera.position.y = 2






// Animation Loop
function animate(){
  requestAnimationFrame( animate )
  TWEEN.update()
  updateCamera()
  renderer.render ( scene, camera )
}

animate()

// Camera Center Mesh
function updateCamera() {
  camera.lookAt(cube.position);
}






// Arrow Keys 
function handleKeyPress(event) {
  const step = 1;
  switch (event.key) {
    case "ArrowUp":
      moveCube({ z: cube.position.z - step });
      break;
    case "ArrowDown":
      moveCube({ z: cube.position.z + step });
      break;
    case "ArrowLeft":
      moveCube({ x: cube.position.x - step });
      break;
    case "ArrowRight":
      moveCube({ x: cube.position.x + step });
      break;
    default:
      break;
  }
}


// Smooth movement TWEEN
function moveCube(position) {
  new TWEEN.Tween(cube.position)
    .to(position, 500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
}



// Add event listener for key presses
window.addEventListener("keydown", handleKeyPress);




