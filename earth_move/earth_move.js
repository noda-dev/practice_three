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
  let rot = 0;

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

  //平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  //シーンに追加
  scene.add(directionalLight);

  //星屑を作成する
  createStarField();

  function createStarField(){
    const geometry = new THREE.Geometry();
    for (let i = 0; i < 1000; i++) {
      geometry.vertices.push(new THREE.Vector3(
        3000 * (Math.random() - 0.5),
        3000 * (Math.random() - 0.5),
        3000 * (Math.random() - 0.5),
      ));
    }
    // マテリアルを作成
    const material = new THREE.PointsMaterial({
      size: 10,
      color: 0xFFFFFF,
    });
    // 物体を作成
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
  }


  //アニメーション処理（使用するときは初回実行の部分をコメントアウトしてください）
  animate();

  function animate() {
    // 毎フレーム角度を0.5度ずつ足していく
    rot += 0.5;
    // ラジアンに変換する
    const radian = rot * Math.PI / 180;
    // 角度に応じてカメラの位置を設定（x座標,y座標をそのままx座標=y座標,z座標=x座標として扱っている）
    camera.position.x = 1000 * Math.cos(radian);
    camera.position.z = 1000 * Math.sin(radian);
    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
}
