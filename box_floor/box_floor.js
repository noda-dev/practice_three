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
  //デフォルトだとレンダラーを通して「3D空間を描画する場所のサイズ」が小さすぎるからサイズの設定をしておく
  renderer.setSize(width, height);

  // シーンを作成（3D空間のこと。ここにカメラやオブジェクトを作成して配置していく）
  const scene = new THREE.Scene();

  // カメラを作成
  //THREE.PerspcetiveCamera(画角, アスペクト比, 手前（1が最小）, 奥);
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  //camera.position.set(横移動, 縦移動, 奥行き移動)
  camera.position.set(0, 150, 1000);

  // 箱と床を作成
  const box_geometry = new THREE.BoxGeometry(200, 200, 200);
  const floor_geometry = new THREE.BoxGeometry(500, 0, 500);
  const box_material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const floor_material = new THREE.MeshStandardMaterial({color: 0x0ca9be});
  const box = new THREE.Mesh(box_geometry, box_material);
  const floor = new THREE.Mesh(floor_geometry, floor_material);
  //シーンに追加
  box.position.set(0, 0, 0);
  floor.position.set(0, -100, 0);
  scene.add(box);
  scene.add(floor);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(0, 50, 10);
  // シーンに追加
  scene.add(directionalLight);

  // 初回実行
  renderer.render(scene, camera);
}
