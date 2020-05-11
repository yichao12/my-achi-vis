import React from 'react'
import { makeData,
  nextPosition
} from './util'

import * as THREE from 'three'

// import {TrackballControls} from 'three-TrackballControls'
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js'
// import {OBJLoader} from 'three-OBJLoader'
// import {MTLLoader} from 'three-MTLLoader'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js'

import planObj from '../../assets/model/archiPlan/plan.obj'
import planMtl from '../../assets/model/archiPlan/plan.mtl'
// import '../../assets/model/archiPlan/plan'
import './planThree.css'



class PlanThree extends React.Component{
  constructor(props){
    super(props)
    this.$container = React.createRef()
  }

  componentDidMount(){
    this.init()
  }

  componentWillUnmount(){
    
  }

  init(){
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbfd1e5 );
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500000);
    camera.position.x = 200;
    camera.position.y = 210;
    camera.position.z = 140;

    // 下面的lookAt没有用，要在要修改trakballcontrol的target，才会有用
    camera.lookAt(new THREE.Vector3(0, 150,150));

    // create a render and set the size
    var webGLRenderer = new THREE.WebGLRenderer({antialias: true});
    // 有点像设置背景的颜色
    webGLRenderer.setSize(800, 400);
    webGLRenderer.shadowMapEnabled = true;
    let containerDom = this.$container.current
    containerDom.appendChild(webGLRenderer.domElement);

    
    
    // 控制旋转
    var trackballControls = new TrackballControls(camera,webGLRenderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.0;
    trackballControls.panSpeed = 1.0;
    trackballControls.staticMoving = true;
    trackballControls.target = new THREE.Vector3(200, 0,-50)
    // trackballControls.object = webGLRenderer.domElement;

    // 光照-全局光
    var ambientLight = new THREE.AmbientLight(0xffffff,0.3);
    scene.add(ambientLight);

    // // // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 200, 200);
    spotLight.intensity = 1;
    spotLight.castShadow = true;
    spotLight.distance = 3000;
    scene.add(spotLight);

    var manager = new THREE.LoadingManager();

    var onError = function () { };
    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
      }
		};

    let _this = this
    console.log("_this.publicPath",_this.publicPath)
		new MTLLoader(manager)
			// .setPath('../../assets/model/archiPlan/')
			.load( planMtl, function ( materials ) {
				materials.preload();
				new OBJLoader( manager )
					.setMaterials( materials )
					// .setPath( '../../assets/model/archiPlan/' )
					.load( planObj, function ( object ) {
						object.scale.set(1, 1, 1);
						object.castShadow = true;
						object.receiveShadow = true;
						scene.add( object );
					}, onProgress, onError );
			} );

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(8, 8, 8);
    var cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        transparent:true,
        opacity:0.5
    });

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    console.log("cube.position",Object.values(cube.position),cube.position.x,cube.position.y,cube.position.z)
    cube.geometry.parameters.width = 800
    
    scene.add(cube);
    // 改变位置
    cube.scale.set(1, 5, 1);
    // 改变大小
    cube.position.set(6.5, 22.5, -6.5)
    // 改变材质的颜色，用这个接口
    cubeMaterial.color = new THREE.Color(0xaaaaaa)

    // 添加运动的粒子
    var sphereGeom= new THREE.SphereGeometry(2, 8, 8);
    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        transparent:true,
        opacity:0.5
    });
    var sphere = new THREE.Mesh(sphereGeom, sphereMaterial);
    sphere.position.set(0,5,0);
    sphere.castShadow = true;
    scene.add(sphere);

    let sphereSpeed = 1

    function render() {
        
      // 粒子运动
      let newPos = nextPosition(Object.values(sphere.position),sphereSpeed)
      // console.log("newPos",[...newPos])

      sphere.position.set(newPos[0],newPos[1],newPos[2])
      trackballControls.update();

      webGLRenderer.clear();
      // render using requestAnimationFrame
      webGLRenderer.render(scene, camera)
      requestAnimationFrame(render);
    }
    render();
  }

  animate(){

  }




  render() {
    return(
      <div className="planThree-container">
        <div ref = {this.$container} className="planThree-wrapper" >

        </div>
      </div>
    )
  }
}

export default PlanThree

