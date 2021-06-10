import * as THREE from '../../libs/three.weapp.js'
import { OrbitControls } from '../../jsm/controls/OrbitControls'
import gLTF from '../../jsm/loaders/GLTFLoader'

Page({
  data: {
    canvasId: null
  },
  onLoad: function () {
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        let canvasId = res[0].node._canvasId
        const canvas = THREE.global.registerCanvas(canvasId, res[0].node)
        
        this.setData({ canvasId })

        const camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 1, 1000);
        camera.position.z = 500;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xAAAAAA);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
      
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.maxDistance = 8
        controls.minDistance = 2
        // controls.enableDamping = true;
        // controls.dampingFactor = 0.25;
        // controls.enableZoom = false;

        // camera.position.set(200, 200, 500);
        // camera.position.set(- 5, 3, 10);
        camera.position.set( 2, 2, 2 );
        controls.update();

        // lights
        var light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 20, 0);
        scene.add(light);
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 20, 10);
        scene.add(light);

        //*/
        // import model
        let GLTFLoader = gLTF(THREE);
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
          // 'https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf'
          'https://statics.anchnet.com/website/assets/demo/kuka_animation_place_unqualified_1.gltf'
        , (gltf) => {
          const root = gltf.scene;
          scene.add(root);
        }, (e) => {
          console.error(e);
        })

        /*/
        const geometry = new THREE.BoxBufferGeometry(200, 200, 200);
      
        const texture = new THREE.TextureLoader().load('./pikachu.png');
        const material = new THREE.MeshBasicMaterial({ map: texture });
      
        // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        //*/
      
        // renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
        // renderer.setSize(canvas.width, canvas.height);
      
        function onWindowResize() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.width, canvas.height);
        }
        function render() {
          canvas.requestAnimationFrame(render);
          // mesh.rotation.x += 0.005;
          // mesh.rotation.y += 0.01;
          controls.update();
          renderer.render(scene, camera);
        }

        render()

      })
  },
  onUnload: function () {
    THREE.global.unregisterCanvas(this.data.canvasId)
  },
  touchStart(e) {
    // console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
  },
  touchMove(e) {
    // console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
  },
  touchEnd(e) {
    // console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
  },
  touchCancel(e) {
    // console.log('canvas', e)
  },
  longTap(e) {
    // console.log('canvas', e)
  },
  tap(e) {
    // console.log('canvas', e)
  },
  documentTouchStart(e) {
    // console.log('document',e)
  },
  documentTouchMove(e) {
    // console.log('document',e)
  },
  documentTouchEnd(e) {
    // console.log('document',e)
  },
})
