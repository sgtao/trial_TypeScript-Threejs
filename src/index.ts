// import文を使ってSassファイルを読み込む。
import './style.scss'
// import文を使ってThree.jsのデモファイルを読み込む
import three_cube from './threejs_demos/01_three_cube'
import use_OrbitCtrl from './threejs_demos/02_use_OrbitCtrl'
import load_Model_STL from './threejs_demos/03_load_Model_STL'

function main(): void {
  // 1st Three Demo(TypeScript)
  three_cube('#flutterCube')

  // 2nd Three Demo(TypeScript)
  use_OrbitCtrl('#useOrbitCtrl')

  // 3rd Three Demo(TypeScript)
  load_Model_STL('#loadModel')
}

window.addEventListener('DOMContentLoaded', () => {
  main()
})
// EOF
