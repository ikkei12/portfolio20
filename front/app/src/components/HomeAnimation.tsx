import React, { useEffect } from 'react';
import * as THREE from 'three';
import '../styles/HomeAnimation.scss';
import gif1 from "../images/top_gif/1.gif"
import gif2 from "../images/top_gif/2.gif"
import gif3 from "../images/top_gif/3.gif"

const HomeAnimation = () => {
  //   const OrbitControls = require('three-orbitcontrols');
  const init = () => {
    // サイズを指定
    const width = 960;
    const height = 540;
    let rot = 0; // 角度
    let rotY = 0; // 角度

    let mouseX = 0; // マウス座標
    let mouseY = 0; // マウス座標

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      alpha: true,
    });
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);

    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const urlArray = [
      gif1,
      gif2,
      gif3,
    ];
    var min = 0;
    var max = 2;
    const urlIndex = Math.floor(Math.random() * (max + 1 - min)) + min;

    // マテリアルを作成
    const material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(urlArray[urlIndex]),
      side: THREE.DoubleSide,
    });

    // 球体の形状を作成します
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    // 形状とマテリアルからメッシュを作成します
    const earthMesh = new THREE.Mesh(geometry, material);
    // シーンにメッシュを追加します
    scene.add(earthMesh);

    // 星屑を作成します (カメラの動きをわかりやすくするため)
    createStarField();

    function createStarField() {
      // 形状データを作成
      const geometry = new THREE.Geometry();
      for (let i = 0; i < 1000; i++) {
        geometry.vertices.push(
          new THREE.Vector3(
            3000 * (Math.random() - 0.5),
            3000 * (Math.random() - 0.5),
            3000 * (Math.random() - 0.5)
          )
        );
      }
      // マテリアルを作成
      const material = new THREE.PointsMaterial({
        size: 10,
        color: 0x888888,
        transparent: true,
      });

      // 物体を作成
      const mesh = new THREE.Points(geometry, material);
      scene.add(mesh);
    }

    // マウス座標はマウスが動いた時のみ取得できる
    document.addEventListener('mousemove', (event) => {
      mouseX = event.pageX;
    });
    // マウス座標はマウスが動いた時のみ取得できる
    document.addEventListener('mousemove', (event) => {
      mouseY = event.pageY;
    });

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      // マウスの位置に応じて角度を設定
      // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを10度で乗算する
      const targetRot = (mouseX / window.innerWidth) * 10;
      const targetRotY = (mouseY / window.innerHeight) * 10;

      // イージングの公式を用いて滑らかにする
      // 値 += (目標値 - 現在の値) * 減速値
      rot += (targetRot - rot) * 0.02;
      rotY += (targetRotY - rot) * 0.02;

      // ラジアンに変換する
      const radian = (rot * Math.PI) / 180;
      const radianY = (rotY * Math.PI) / 180;

      // 角度に応じてカメラの位置を設定
      camera.position.x = 1000 * Math.sin(radian);
      camera.position.y = 1000 * Math.sin(radianY);
      camera.position.z = 1000 * Math.cos(radian);
      // 原点方向を見つめる
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      // レンダリング
      renderer.setClearColor(0x000000, 0);
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return <canvas id="canvas" />;
};

export default HomeAnimation;
