import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Sky } from 'three/examples/jsm/objects/Sky.js'

export default function use_OrbitCtrl(el: string): void {
  console.log(el)
  const targetDOM = document.querySelector<HTMLElement>(el)
  let camera: THREE.PerspectiveCamera
  let scene: THREE.Scene
  let renderer: THREE.WebGLRenderer
  let controls: OrbitControls
  let sky: Sky
  let sun: THREE.Vector3

  init()
  //render(); // remove when using next line for animation loop (requestAnimationFrame)
  animate()

  function initSky() {
    // Add Sky
    sky = new Sky()
    sky.scale.setScalar(450000)
    scene.add(sky)

    sun = new THREE.Vector3()

    /// GUI

    const effectController = {
      turbidity: 0.5,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 2,
      azimuth: -90,
      exposure: 0.5,
    }

    const uniforms = sky.material.uniforms
    uniforms['turbidity'].value = effectController.turbidity
    uniforms['rayleigh'].value = effectController.rayleigh
    uniforms['mieCoefficient'].value = effectController.mieCoefficient
    uniforms['mieDirectionalG'].value = effectController.mieDirectionalG

    const phi = THREE.MathUtils.degToRad(90 - effectController.elevation)
    const theta = THREE.MathUtils.degToRad(effectController.azimuth)

    sun.setFromSphericalCoords(1, phi, theta)

    uniforms['sunPosition'].value.copy(sun)

    renderer.toneMappingExposure = effectController.exposure
    renderer.render(scene, camera)
  }

  function init() {
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xcccccc)
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002)

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    const width: number = Math.round(window.innerWidth * 0.95)
    const height: number = Math.round(window.innerHeight * 0.95)
    renderer.setSize(width, height)
    // document.body.appendChild(renderer.domElement)
    console.log(targetDOM)
    if (targetDOM !== null) targetDOM.appendChild(renderer.domElement)
    else document.body.appendChild(renderer.domElement)

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.set(400, 200, 0)

    // controls

    controls = new OrbitControls(camera, renderer.domElement)
    controls.listenToKeyEvents(window) // optional

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05

    controls.screenSpacePanning = false

    controls.minDistance = 100
    controls.maxDistance = 500

    controls.maxPolarAngle = Math.PI / 2

    // world

    const geometry = new THREE.CylinderGeometry(0, 10, 30, 4, 1)
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })

    for (let i = 0; i < 500; i++) {
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = Math.random() * 1600 - 800
      mesh.position.y = 0
      mesh.position.z = Math.random() * 1600 - 800
      mesh.updateMatrix()
      mesh.matrixAutoUpdate = false
      scene.add(mesh)
    }

    // lights

    const dirLight1 = new THREE.DirectionalLight(0xffffff)
    dirLight1.position.set(1, 1, 1)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0x002288)
    dirLight2.position.set(-1, -1, -1)
    scene.add(dirLight2)

    const ambientLight = new THREE.AmbientLight(0x222222)
    scene.add(ambientLight)

    //
    initSky()

    window.addEventListener('resize', onWindowResize)
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  function animate() {
    requestAnimationFrame(animate)

    controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render()
  }

  function render() {
    renderer.render(scene, camera)
  }

  console.log('use OrbitControl')
}
