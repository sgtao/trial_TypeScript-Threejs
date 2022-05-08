import * as THREE from 'three'

export default function three_cube(el: string): void {
  console.log(el)
  const targetDOM = document.querySelector<HTMLElement>(el)
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer()
  // レンダラーのサイズを設定
  const width: number = Math.round(window.innerWidth * 0.95)
  const height: number = Math.round((width * 3) / 4)
  renderer.setSize(width, height)
  // canvasをbodyに追加
  // document.body.appendChild(renderer.domElement)
  console.log(targetDOM)
  if (targetDOM !== null) targetDOM.appendChild(renderer.domElement)
  else document.body.appendChild(renderer.domElement)

  // シーンを作成
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x008080)

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 10000)
  camera.position.set(0, 0, 1000)

  // 箱を作成
  const geometry = new THREE.BoxGeometry(250, 250, 250)
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
  const box = new THREE.Mesh(geometry, material)
  box.position.z = -5
  scene.add(box)
  // 環境光源を作成
  // new THREE.AmbientLight(色, 光の強さ)
  const lightAimbent = new THREE.AmbientLight(0x303030, 1.0)
  scene.add(lightAimbent)
  // 平行光源を生成
  const light = new THREE.DirectionalLight(0xffffff)
  light.position.set(1, 1, 1)
  scene.add(light)

  const tick = (): void => {
    requestAnimationFrame(tick)

    box.rotation.x += 0.05
    box.rotation.y += 0.05

    // 描画
    renderer.render(scene, camera)
  }
  tick()

  console.log('Hello Three.js')
}
