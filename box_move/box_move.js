window.addEventListener('DOMContentLoaded', function(){
  //body要素の高さ・幅を固定
  let body = document.querySelector("body");
  body.style.height = window.innerHeight + "px";

  init();
});

function init() {
  //canvasと画面サイズがどうにも合いません
  const width = window.innerWidth;
  const height = window.innerHeight;

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
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  // 箱を作成
  const geometry = new THREE.BoxGeometry(200, 200, 200);
  const material = new THREE.MeshStandardMaterial({color: 0x28bb33});
  const box = new THREE.Mesh(geometry, material);
  //シーンに追加
  scene.add(box);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);

  //アニメーション処理（使用するときは初回実行の部分をコメントアウトしてください）
  tick();

  function tick() {
    //とりあえずrequestAnimationFrame()は再帰関数（自分の中で自分を使う）で使う
    let animation_id = requestAnimationFrame(tick);

    // 箱を回転させる
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;
    box.rotation.z += 0.01;

    // レンダリング
    renderer.render(scene, camera);
  }
}
