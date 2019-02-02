window.addEventListener('DOMContentLoaded', function(){
  //body要素の高さ・幅を固定
  toWindowSize();
  //描画
  init();
});

function toWindowSize(){
  let body = document.querySelector("body");
  body.style.height = window.innerHeight + "px";
}

function init() {
  //canvasと画面サイズがどうにも合いません
  const width = window.innerWidth;
  const height = window.innerHeight;

  //レンダラーを作成（3D空間をカメラで撮って、レンダラーを通して指定の場所に描画する）
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });

  //スマホでも綺麗に見えるようにこれを書く（これがないとボヤけるらしい）
  renderer.setPixelRatio(window.devicePixelRatio);
  //デフォルトだとレンダラーを通して「3D空間を描画する場所のサイズ」が小さすぎるからサイズの設定をしておく
  renderer.setSize(width, height);

  //シーンを作成（3D空間のこと。ここにカメラやオブジェクトを作成して配置していく）
  const scene = new THREE.Scene();

  //カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(0, 0, 500);

  //物体
  const geometry = new THREE.SphereGeometry(100, 100, 100);
  //画像を読み込む
  const loader = new THREE.TextureLoader();
  const texture = loader.load("earthmap1k.jpg");
  //マテリアルにテクスチャを設定
  const material = new THREE.MeshStandardMaterial({map: texture});
  //メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  //シーンに追加
  scene.add(mesh);

  //平行光源だけでは光の当たらない部分が真っ暗になるし、環境光だけではのっぺりとした表現になる
  //平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  //環境光（空間全体を照らす光として使う）
  const ambientLight = new THREE.AmbientLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  //シーンに追加
  scene.add(ambientLight);
  scene.add(directionalLight);

  //アニメーション処理（使用するときは初回実行の部分をコメントアウトしてください）
  animate();

  function animate() {

    //箱を回転させる
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    mesh.rotation.z += 0.005;

    //レンダリング
    renderer.render(scene, camera);

    //とりあえずrequestAnimationFrame()は再帰関数（自分の中で自分を使う）で使う
    let animation_id = requestAnimationFrame(animate);
  }
}
