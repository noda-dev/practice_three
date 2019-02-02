window.addEventListener('DOMContentLoaded', init);

function init() {
  const width = 960;
  const height = 540;

  // レンダラーを作成（3D空間をカメラで撮って、レンダラーを通して指定の場所に描画する）
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });

  //スマホでも綺麗に見えるようにこれを書く（これがないとボヤけるらしい）
  renderer.setPixelRatio(window.devicePixelRatio);
  //デフォルトだと「レンダラーを通して3D空間を描画する場所のサイズ」が小さすぎるからサイズの設定をしておく
  renderer.setSize(width, height);

  // シーンを作成（3D空間のこと。ここにカメラやオブジェクトを作成して配置していく）
  const scene = new THREE.Scene();

  // カメラを作成
  //THREE.PerspectiveCamera(画角, アスペクト比, 手前をどこまで映すか, 奥をどこまで映すか)
  const camera = new THREE.PerspectiveCamera(100, width / height, 1, 10000);
  //camera.position.set(真ん中からの横移動, 真ん中からの縦移動, 真ん中からの奥行きの移動)
  camera.position.set(0, 0, 1000);

  // 箱を作成
  const geometry = new THREE.BoxGeometry(200, 200, 200);
  const material = new THREE.MeshStandardMaterial({color: 0x0000FF});
  const box = new THREE.Mesh(geometry, material);
  //シーンに追加
  scene.add(box);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);

  // 初回実行
  renderer.render(scene, camera);
}
