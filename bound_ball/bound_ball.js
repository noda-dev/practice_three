window.addEventListener('DOMContentLoaded', function(){
    //body要素の高さを固定
    toWindowSize();
    //描画
    init();
  });
  
function toWindowSize(){
  let body = document.querySelector("body");
  body.style.height = window.innerHeight + "px";
}

//ブラウザと3D空間のサイズを同じように表示するためのカメラ設定（変に寄りすぎたり、遠すぎたりしない）
function defaultPerspectiveCamera(width, height){
  //カメラのz座標の位置を「ブラウザの高さの半分」の場所にして、画角を90度にすると「ブラウザ」と「3D空間のサイズ」が同じになる
  const camera = new THREE.PerspectiveCamera(90, width / height);
  camera.position.z = height / 2;
  return camera;
}
  
function init() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  //x座標・y座標・z座標
  let sphereX = 0;
  let sphereY = 0;
  let sphereZ = 0;
  //x座標・y座標の増加量
  let addX = 5;
  let addY = 5;
  //フレーム計測用
  let frame = 0;
  
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

  //カメラを作成（下記の設定でブラウザサイズとrendererサイズを合わせている）
  const camera = defaultPerspectiveCamera(width, height);

  //環境光
  const environmentalLight = new THREE.AmbientLight(0xFFFFFF);              
  scene.add(environmentalLight);  

  // 立方体のマテリアルとジオメトリを作成
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const geometry = new THREE.CircleGeometry(25, 50);

  const circle = new THREE.Mesh(geometry, material);
  circle.position.set(0, 0, 0);
  scene.add(circle);

  //アニメーション処理（使用するときは初回実行の部分をコメントアウトしてください）
  animate();

  function animate() {
    //ここにアニメーション処理を記述していく

    // フレーム数をインクリメント
    frame++;

    // フレーム数が２で割り切れなければ色の変更を行わない
    if(frame % 30 == 0) {
      circle.material.color.setRGB(Math.random(), Math.random(), Math.random());
    }

    //壁の反射処理
    if(sphereX+25 > width/2){
      addX *= -1;
    }else if(sphereX-25 < -width/2){
      addX *= -1;
    }

    if(sphereY+25 > height/2){
      addY *= -1;
    }else if(sphereY-25 < -height/2){
      addY *= -1
    }

    sphereX += addX;
    sphereY += addY;

    circle.position.set(sphereX, sphereY, sphereZ);

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  } 
}
  