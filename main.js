import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as TWEEN from '@tweenjs/tween.js'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)

const renderer = new THREE.WebGLRenderer({
  alpha: true,
});
renderer.setSize( window.innerWidth, window.innerHeight)
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




camera.position.z = 5
camera.position.y = 2.5










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

light.shadow.camera.near = 0.1;
light.shadow.camera.far = 10;
light.shadow.camera.left = -10;
light.shadow.camera.right = 10;
light.shadow.camera.top = 10;
light.shadow.camera.bottom = -20;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

// Light2
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(0, 4, 2);
light2.target.position.set(-5, 0, 0);
light2.shadow.bias = -0.01;

// Light3
const light3 = new THREE.DirectionalLight(0xffffff, 1);
light3.position.set(-5, 4, 2);
light3.target.position.set(-5, 0, 0);
light3.shadow.bias = -0.01;

// Add the light to the scene
scene.add(light);
scene.add(light2);
scene.add(light3);






// 3D Model
const loader = new GLTFLoader();

loader.load(
  '/public/paper_yacht/scene.gltf',
  function (gltf) {
    const object = gltf.scene;
    object.position.set( 0, -0.2, 0)
    object.castShadow = true
    object.receiveShadow = true
    scene.add(object);
  },

  // called when loading has errors
  // function (error) {
  //   console.error(error);
  // }
);












// Arrow Keys & General Cube Movement
function handleKeyPress(event) {
  const step = 1;
  switch (event.key) {
    case "ArrowUp":
      moveCube({ z: cube.position.z - step });
      moveCam({ z: camera.position.z - step });
      break;
    case "ArrowDown":
      moveCube({ z: cube.position.z + step });
      moveCam({ z: camera.position.z + step });
      break;
    case "ArrowLeft":
      moveCube({ x: cube.position.x - step });
      moveCam({ x: camera.position.x - step });
      break;
    case "ArrowRight":
      moveCube({ x: cube.position.x + step });
      moveCam({ x: camera.position.x + step });
      break;
    case " ":
      if (cube.position.y === 1) {
        console.log("il cubo e a terra puoi saltare")
        jumpCube()
        

      }

      break;
    default:
      break;
  }
}



document.getElementById("su").addEventListener("click",() => {
  const step = 1
  moveCube({ z: cube.position.z - step });
  moveCam({ z: camera.position.z - step });

})
document.getElementById("giu").addEventListener("click",() => {
  const step = 1
  moveCube({ z: cube.position.z + step });
  moveCam({ z: camera.position.z + step });

})
document.getElementById("left").addEventListener("click",() => {
  const step = 1
  moveCube({ x: cube.position.x - step });
  moveCam({ x: camera.position.x - step });
})
document.getElementById("right").addEventListener("click",() => {
  const step = 1
  
  moveCube({ x: cube.position.x + step });
  moveCam({ x: camera.position.x + step });

})






// Add event listener for key presses
window.addEventListener("keydown", handleKeyPress);














// Logic Function


  // Camera Center Mesh
  function updateCamera() {
    camera.lookAt(cube.position);
  }

  // Smooth movement TWEEN
  function moveCube(position) {
    new TWEEN.Tween(cube.position)
      .to(position, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }

  function moveCam(position) {
    new TWEEN.Tween(camera.position)
      .to(position, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }

  // Jump Function
  function jumpCube() {
    const jumpHeight = 1; // Set the jump height to 1 unit
    const jumpDuration = 500; // Set the duration of the jump to 500 ms
    const jumpTween = new TWEEN.Tween(cube.position)
      .to({ y: cube.position.y + jumpHeight }, jumpDuration / 2)
      .easing(TWEEN.Easing.Quadratic.Out) // Ease out for the first half of the jump
      .onComplete(() => {
        // After reaching the peak of the jump, fall back to the ground
        const fallTween = new TWEEN.Tween(cube.position)
          .to({ y: 1 }, jumpDuration / 2)
          .easing(TWEEN.Easing.Quadratic.In) // Ease in for the second half of the jump
          .start();
      })
      .start();
  }



  // Animation Loop
  function animate(){
    requestAnimationFrame( animate )
    cube.rotation.y += 0.05
    TWEEN.update()
    updateCamera()
    renderer.render ( scene, camera )
  }

  animate();

