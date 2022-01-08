// Debug
// const gui = new dat.GUI();

let isLoadingComplete = false;
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {};
loadingManager.onLoad = function () {
  document.querySelector(".loader_container").style.display = "none";
  tubeGeometry.setDrawRange(0, 0);

  // gsap.to(tubeGeometry.setDrawRange, { count: Infinity, duration: 1 });
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // Update Orbital Controls
    controls.update();

    // Render
    renderer.render(scene, camera);
    if (tubeGeometry.drawRange.count < 6000) {
      tubeGeometry.setDrawRange(0, elapsedTime * 1000);
      tubeGeometry.attributes.position.needsUpdate = true;
    }

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
  isLoadingComplete = true;
};
loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  document.querySelector(".progress_bar_internal").style.width =
    (itemsLoaded / itemsTotal) * 400 + 4 + "px";
  document.querySelector(".loading_ball").style.marginLeft =
    (itemsLoaded / itemsTotal) * 400 - 24 + "px";
  if (itemsLoaded > 7) {
    document.querySelector(".loading_text").innerHTML = "Almost there...";
  }
};
loadingManager.onError = function (url) {
  console.log("There was an error loading " + url);
};

// Canvas
const canvas = document.querySelector(".canvas1");

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x00241c);
const textureLoader = new THREE.TextureLoader(loadingManager);
const grassTexture = textureLoader.load("media/textures/grassTexture.jpg");
const markerTexture = textureLoader.load("media/textures/markerTexture.png");
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(50, 50);
let envMap = new THREE.CubeTextureLoader(loadingManager)
  .setPath("media/hdri/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);

scene.background = envMap;
// scene.fog = new THREE.Fog(0xffffff, 0.0025, 50);
// scene.environment = envMap;
// Objects
//GLTF
const tree1 = new THREE.GLTFLoader(loadingManager).load(
  "media/gltf/tree1/scene.gltf",
  function (gltf) {
    treeScene = gltf.scene;
    treeScene.scale.set(0.8, 0.8, 0.8);
    treeScene.position.set(11, 0.01, -11);
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
      }
    });
    for (let i = 0; i < 8; i++) {
      let treeClone = treeScene.clone();
      treeClone.position.x = (i - 5) * (Math.random() + 1) * -3;
      treeClone.position.z = (Math.random() * 2 + 5) * -2;
      treeClone.rotation.y = Math.random() * Math.PI;
      let scaleOfClone = Math.random() / 4 + 1;
      treeClone.scale.set(scaleOfClone, scaleOfClone, scaleOfClone);
      scene.add(treeClone);
    }
    for (let i = 0; i < 9; i++) {
      let treeClone = treeScene.clone();
      treeClone.position.x = (i - 7) * (Math.random() + 1) * -3;
      treeClone.position.z = (Math.random() * 2 + 5) * 2;
      treeClone.rotation.y = Math.random() * Math.PI;
      let scaleOfClone = Math.random() / 4 + 1;
      treeClone.scale.set(scaleOfClone, scaleOfClone, scaleOfClone);
      scene.add(treeClone);
    }
    for (let i = 0; i < 8; i++) {
      let treeClone = treeScene.clone();
      treeClone.position.x = (Math.random() + 0.1) * 50;
      treeClone.position.z = (Math.random() + 0.2) * -50;
      treeClone.rotation.y = Math.random() * Math.PI;
      let scaleOfClone = Math.random() / 4 + 1;
      treeClone.scale.set(scaleOfClone, scaleOfClone, scaleOfClone);
      scene.add(treeClone);
    }
    for (let i = 0; i < 8; i++) {
      let treeClone = treeScene.clone();
      treeClone.position.x = (Math.random() + 0.1) * -50;
      treeClone.position.z = (Math.random() + 0.2) * -50;
      treeClone.rotation.y = Math.random() * Math.PI;
      let scaleOfClone = Math.random() / 4 + 1;
      treeClone.scale.set(scaleOfClone, scaleOfClone, scaleOfClone);
      scene.add(treeClone);
    }
    for (let i = 0; i < 8; i++) {
      let treeClone = treeScene.clone();
      treeClone.position.x = (Math.random() + 0.1) * -50;
      treeClone.position.z = (Math.random() + 0.2) * 50;
      treeClone.rotation.y = Math.random() * Math.PI;
      let scaleOfClone = Math.random() / 4 + 1;
      treeClone.scale.set(scaleOfClone, scaleOfClone, scaleOfClone);
      scene.add(treeClone);
    }
    for (let i = 0; i < 8; i++) {
      let treeClone = treeScene.clone();
      treeClone.position.x = (Math.random() + 0.1) * 50;
      treeClone.position.z = (Math.random() + 0.2) * 50;
      treeClone.rotation.y = Math.random() * Math.PI;
      let scaleOfClone = Math.random() / 4 + 1;
      treeClone.scale.set(scaleOfClone, scaleOfClone, scaleOfClone);
      scene.add(treeClone);
    }
    scene.add(gltf.scene);
  }
);

const planeGeometry = new THREE.PlaneBufferGeometry(200, 200);
var numPoints = 100;
let points = [];
points.push(-0.0435764809423283, 3.24466601091913, 0.742807309230195);
points.push(-0.237535556905693, 6.44234684103942, 1.43130932120936);
points.push(-0.606106461368608, 12.6998251425312, 2.791293566488);
points.push(-0.949709611956893, 18.7785067391809, 4.12678399565772);
points.push(-1.26932104903389, 24.6843474135509, 5.43567432242016);
points.push(-1.56589595475812, 30.42318689606, 6.71592071435687);
points.push(-1.84036865308333, 36.0007488649835, 7.96554179292928);
points.push(-2.09365260975841, 41.4226409464534, 9.18261863347867);
points.push(-2.32664043232749, 46.6943547144583, 10.3652947652262);
points.push(-2.54020387012985, 51.8212656908433, 11.511776171273);
points.push(-2.7351938143, 56.80863334531, 12.6203312886);
points.push(-2.91244029776761, 61.6616010954168, 13.689291008068);
points.push(-3.07275249525757, 66.3851963065785, 14.7170486744176);
points.push(-3.21691872328993, 70.9843302920665, 15.7020600862695);
points.push(-3.34570644017997, 75.4637983130088, 16.6428434961242);
points.push(-3.45986224603813, 79.82827957839, 17.5379796103619);
points.push(-3.56011188277005, 84.0823372450513, 18.3861115892429);
points.push(-3.64716023407657, 88.2304184176903, 19.1859450469073);
points.push(-3.72169132545373, 92.2768541488614, 19.936248051375);
points.push(-3.78436832419273, 96.2258594389755, 20.635851124546);
points.push(-3.83583353938, 100.0815332363, 21.2836472422);
points.push(-3.87670842189713, 103.847858436959, 21.8785918339966);
points.push(-3.90759356442093, 107.528701884933, 22.4197027834752);
points.push(-3.92906870142337, 111.127814372059, 22.9060604280553);
points.push(-3.94169270917165, 114.648830638031, 23.3368075590362);
points.push(-3.94600360572813, 118.0952693704, 23.7111494215969);
points.push(-3.94251855095037, 121.470533204572, 24.0283537147965);
points.push(-3.93173384649113, 124.77790872381, 24.2877505915739);
points.push(-3.91412493579837, 128.020566459236, 24.4887326587478);
points.push(-3.89014640411521, 131.201560889825, 24.630754977017);
points.push(-3.86023197848, 134.32383044241, 24.71333506096);
points.push(-3.82479452772625, 137.390197491682, 24.7360528790352);
points.push(-3.78422606248269, 140.403368360187, 24.6985508535808);
points.push(-3.73889773517321, 143.365933318327, 24.6005338608151);
points.push(-3.68915984001693, 146.280366584363, 24.4417692308362);
points.push(-3.63534181302813, 149.14902632441, 24.2220867476219);
points.push(-3.57775223201629, 151.974154652441, 23.9413786490301);
points.push(-3.51667881658609, 154.757877630286, 23.5995996267985);
points.push(-3.45238842813741, 157.502205267629, 23.1967668265446);
points.push(-3.38512706986529, 160.209031522014, 22.732959847766);
points.push(-3.31511988676, 162.88013429884, 22.20832074384);
points.push(-3.24257116560697, 165.517175451362, 21.6230540220238);
points.push(-3.16766433498685, 168.121700780691, 20.9774266434544);
points.push(-3.09056196527545, 170.695140035798, 20.2717680231489);
points.push(-3.01140576864381, 173.238806913507, 19.5064700300042);
points.push(-2.93031659905813, 175.7538990585, 18.6819869867969);
points.push(-2.84739445227981, 178.241498063315, 17.7988356701837);
points.push(-2.76271846586545, 180.702569468348, 16.8575953107011);
points.push(-2.67634691916685, 183.13796276185, 15.8589075927654);
points.push(-2.58831723333097, 185.548411379929, 14.803476654673);
points.push(-2.4986459713, 187.93453270655, 13.6920690886);
points.push(-2.40732883781129, 190.296828073534, 12.5255139406023);
points.push(-2.31434067939741, 192.63568276056, 11.304702710616);
points.push(-2.2196354843861, 194.951365995161, 10.0305893524567);
points.push(-2.12314638290029, 197.244030952728, 8.70419027382014);
points.push(-2.02478564685812, 199.51371475651, 7.32658433628187);
points.push(-1.92444468997293, 201.76033847761, 5.89891285529729);
points.push(-1.82199406775321, 203.98370713499, 4.42237960020166);
points.push(-1.71728347750269, 206.183509695466, 2.89825079421025);
points.push(-1.61014175832026, 208.359319073712, 1.32785511441804);

let pointsArray = [];
let pointsValue = [];
points.forEach((element) => {
  if (
    (points.indexOf(element) + 1) % 3 === 0 &&
    points.indexOf(element) !== 0
  ) {
    pointsValue.push(element);
    pointsArray.push(
      new THREE.Vector3(pointsValue[1], pointsValue[2], pointsValue[0])
    );
    pointsValue = [];
  } else {
    pointsValue.push(element);
  }
});
var curve = new THREE.CatmullRomCurve3(pointsArray);

const tubeGeometry = new THREE.TubeGeometry(curve, numPoints, 0.7, 10, false);
const markerGeometry = new THREE.PlaneBufferGeometry(1, 10);
// Materials
const planeMaterial = new THREE.MeshStandardMaterial({
  map: grassTexture,
});

const tubeMaterial = new THREE.MeshStandardMaterial({
  color: 0xf6ff00,
});
const markerMaterial = new THREE.MeshStandardMaterial({
  map: markerTexture,
  alphaMap: markerTexture,
  opacity: 0.7,
  transparent: true,
});
// Mesh
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
var tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
tubeMesh.scale.set(0.06, 0.06, 0.06);
tubeMesh.position.x = -1;
tubeMesh.position.y = -0.01;
planeMesh.rotation.set(-Math.PI / 2, 0, 0);
tubeMesh.castShadow = true;
planeMesh.receiveShadow = true;
markerMesh.rotation.set(-Math.PI / 2, 0, -Math.PI / 2);
markerMesh.position.y = 0.005;
markerMesh.position.x = 8.9;
markerMesh.scale.set(2.205, 2.205, 2.205);
markerMesh.receiveShadow = true;
scene.add(planeMesh);
scene.add(tubeMesh);
scene.add(markerMesh);
// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.y = 2;
directionalLight.position.x = 0;
directionalLight.position.z = 0;
directionalLight.lookAt(tubeMesh.position);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 16;
directionalLight.shadow.mapSize.height = 16;
directionalLight.shadow.mapSize.x = 128;
directionalLight.shadow.mapSize.y = 128;
directionalLight.shadow.camera.left = -1;
directionalLight.shadow.camera.right = 13;
directionalLight.shadow.camera.top = 1;
directionalLight.shadow.camera.near = -1;
directionalLight.shadow.camera.bottom = -1;

// scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

// lightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(lightHelper);
scene.add(directionalLight);

/**
 *
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const clock = new THREE.Clock();

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  70,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = -3;
camera.position.y = 3;
camera.position.z = 4;
scene.add(camera);

// Controls

const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2 - 0.05;
// controls.autoRotate = true;
controls.enablePan = false;
controls.target = new THREE.Vector3(5.5, 0, 0);
// controls.maxDistance = 10;
controls.minDistance = 2;
controls.autoRotateSpeed = 1.5;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // alpha: true,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */
