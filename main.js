import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from '@tweenjs/tween.js'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)

const renderer = new THREE.WebGLRenderer({
  alpha: true,
});
renderer.setSize( window.innerWidth, window.innerHeight)
renderer.setClearColor(0xffffff, 0.5); //0xcccfff
// Set up the renderer for shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement )














//Floor
const geometry = new THREE.PlaneGeometry(100,100)
const material = new THREE.MeshStandardMaterial({ 
  color: 0xffffff,
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
  color: 0xcccfff,
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

light.shadow.camera.near = 1.10;
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

loader.load( '/juice-carton/scene.gltf', function (gltf) {
    const object = gltf.scene;
    object.position.set( -1.5, -0.0, -2.5)
    object.rotation.y = -1
    object.castShadow = true
    object.receiveShadow = true
    object.scale.x = 1.5
    object.scale.y = 1.5
    object.scale.z = 1.5
    scene.add(object);


      //RayCaster for Clicks
  // Add event listener for mouse clicks
  document.body.addEventListener("click", onObjectClick);
  
  // Function to handle mouse clicks on the object
  function onObjectClick(event) {
    //console.log("click on canvas")

  // Get the mouse coordinates relative to the renderer canvas
  const x = event.clientX;
  const y = event.clientY;

  // Use THREE.Raycaster to detect clicks on the object
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(object);

  // If the click intersects with the object, log "OK" to the console
  if (intersects.length > 0) {
    console.log("OK");
    //handleFloater() //(on/off based on state)
    //clickDialog()
    autoDialog()
    
  }
}
  //END OF RAYCAST
  },

  // called when loading has errors
    // function (error) {
    //   console.error(error);
    // }
);
























//TEXT3D
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.pointerEvents = 'none'
labelRenderer.domElement.className = 'LMAO'
labelRenderer.domElement.id = 'LMAO'
document.body.appendChild(labelRenderer.domElement)






const p = document.createElement('p');
p.innerHTML = '<div class=""> Benvenuto nel mio Sito, Umano! </div>'
p.className = 'test-float'
p.id = "test-float"
// const cPointLabel = new CSS2DObject(p)
// scene.add(cPointLabel)
// cPointLabel.position.set(0,2,0)

const div = document.createElement('div');
div.appendChild(p)
const divContainer = new CSS2DObject(div)
scene.add(divContainer)
divContainer.position.set(0,2,0)



let state = 1
function clickDialog(){
  
  if (state === 1){
    document.getElementById("test-float").style.display = "flex"
  } else if ( state === 2){
    p.innerHTML = '<div class=""> Questo e un progetto svilupato in Three.Js da Federico Lacchini </div>'
  }else if ( state === 3){
    p.innerHTML = '<div class=""> Hai paura di un coniglio che parla? </div>'
  } else if ( state === 4){
    p.innerHTML = '<div class=""> Avvicinati pure... </div>'
  } else if ( state === 5){
    p.innerHTML = '<div class=""> Non mangio! </div>'
  } else if ( state === 6){
    document.getElementById("test-float").style.display = "none"
    state = 1
  }
    //document.getElementById("test-float").style.display = "none"
  state = state + 1
}


let clickC = false
function autoDialog(){
  if (clickC === false){
    clickC = true 
    document.getElementById("test-float").style.display = "flex"
    setTimeout(()=>{
      p.innerHTML = '<div class=""> Questo e un progetto svilupato in Three.Js da Federico Lacchini </div>'
      setTimeout(()=>{
        p.innerHTML = '<div class=""> Hai paura di un coniglio che parla? </div>'
        setTimeout(()=>{
          p.innerHTML = '<div class=""> Fai bene... </div>'
          setTimeout(()=>{
            p.innerHTML = '<div class=""> Siamo carini e coccolosi, la probilita di essere uccisi da un coniglio e molto bassa </div>'
            setTimeout(()=>{
              p.innerHTML = '<div class=""> Ma non e mai 0.. </div>'
              setTimeout(()=>{
                document.getElementById("test-float").style.display = "none"
                clickC = false
              },2000)
            },4000)
          },2000)
        },2000)
      },2000)
    },2000)

  } else {
    return 
  }

  
  
  
  
}













// Arrow Keys & General Cube Movement
function handleKeyPress(event) {
  const step = 1;
  switch (event.key) {
    case "w":
      moveCube({ z: cube.position.z - step });
      moveCam({ z: camera.position.z - step });
      break;
    case "s":
      moveCube({ z: cube.position.z + step });
      moveCam({ z: camera.position.z + step });
      break;
    case "a":
      moveCube({ x: cube.position.x - step });
      moveCam({ x: camera.position.x - step });
      break;
    case "d":
      moveCube({ x: cube.position.x + step });
      moveCam({ x: camera.position.x + step });
      break;
    case " ":
      if (cube.position.y === 1) {
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



function handleFloater(){
  if (document.getElementById("test-float").style.display === "none"){
    document.getElementById("test-float").style.display = "flex"
  } else {
    document.getElementById("test-float").style.display = "none"

  }
}













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

    labelRenderer.render(scene,camera)
  }

  animate();

