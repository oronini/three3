import * as THREE from 'three';
// import {
//   Lensflare,
//   LensflareElement,
// } from 'three/examples/jsm/objects/Lensflare.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

let camera, scene, renderer;
let controls;
const clock = new THREE.Clock();

const animate = () => {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  controls.update(delta);
  renderer.render(scene, camera);
};

const init = () => {
  // camera
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    5,
    15000
  );
  camera.position.z = 6500;

  // scene
  scene = new THREE.Scene();

  // geometry
  const size = 250;
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 50,
  });

  for (let i = 0; i < 2500; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
    mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
    mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;

    scene.add(mesh);
  }

  // 平行光源
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.1);
  scene.add(dirLight);

  // ポイント光源を追加
  const addLight = (h, s, l, x, y, z) => {
    const light = new THREE.PointLight(0xffffff, 5.5, 2000); //色、強さ、減衰
    light.color.setHSL(h, s, l);
    light.position.set(x, y, z);
    scene.add(light);
  };

  addLight(0.08, 0.3, 0.9, 0, 0, -1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  controls = new FlyControls(camera, renderer.domElement);
  controls.movementSpeed = 2500;
  controls.rollSpeed = Math.PI / 80;
  animate();
  renderer.render(scene, camera);
};

init();

const onWindowResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

window.addEventListener('resize', onWindowResize);
