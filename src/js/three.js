import * as THREE from '../../src/build/three.module.js';
import { OrbitControls } from '../../src/js/jsm/controls/OrbitControls.js';
// import Stats from '../../src/js/jsm/libs/stats.module.js';
// import dat from '../../src/js/jsm/libs/dat.gui.module.js';
import React, { Component } from "react";
import '../three.css'
import SkyFront from '../img/corona_ft.png'
import SkyBack from '../img/corona_bk.png'
import SkyUp from '../img/corona_up.png'
import SkyDown from '../img/corona_dn.png'
import SkyLeft from '../img/corona_lf.png'
import SkyRight from '../img/corona_rt.png'

let renderer, scene, camera, cameraControl, isPlaying, animals, clock, timeSpeed, nextTime;
let animal1Geometry, animal2Geometry, animal3Geometry, animalsMaterial;

let cameraHeight = 2;

class Three extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        animals = props.animals
        isPlaying = false
        this.renderLoop = this.renderLoop.bind(this)
        this.resizeFrame = this.resizeFrame.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.stop = this.stop.bind(this)
        this.resetCamera = this.resetCamera.bind(this)
        this.updateScene = this.updateScene.bind(this)
        this.changeTimeSpeed = this.changeTimeSpeed.bind(this)
        this.setUpPlayingScene = this.setUpPlayingScene.bind(this)
        this.updateAnimalMeshCount = this.updateAnimalMeshCount.bind(this)
        this.setAnimalRandomPosition = this.setAnimalRandomPosition.bind(this)
        this.initializeAnimalsMeshes = this.initializeAnimalsMeshes.bind(this)
        this.putAnimalMesh = this.putAnimalMesh.bind(this)
        this.deleteAnimalMesh = this.deleteAnimalMesh.bind(this)
    }
    updateScene() {
        let time = Math.round(clock.getElapsedTime() * 10) / 10
        if (time > nextTime) {
            console.log("time", time)
            console.log("nexTime", nextTime)
            console.log("timeSpeed", timeSpeed)
            nextTime += timeSpeed
        }

    }
    initializeAnimalsMeshes() {
        this.setUpPlayingScene()
        animals[0].meshes = []
        animals[1].meshes = []
        animals[2].meshes = []
        this.updateAnimalMeshCount(0, animals[0].p)
        this.updateAnimalMeshCount(0, animals[1].p)
        this.updateAnimalMeshCount(0, animals[2].p)

    }
    setUpPlayingScene() {
        animals[0].p = animals[0].p0
        animals[1].p = animals[1].p0
        animals[2].p = animals[2].p0

    }
    updateAnimalMeshCount(animalIndex, thisMany) {
        if(thisMany <0){return}
        let difference = thisMany - animals[animalIndex].meshes.length
        console.log(animals)
        if (difference === 0 ) { return }
        if (difference > 0) { //Add animals
            for (var i = 0; i < difference; i++) {
                this.putAnimalMesh(animalIndex)
            }
        } else if (difference < 0) { //Kill animals
            for (var i = difference; i < 0; i++) {
                this.deleteAnimalMesh(animalIndex)
            }
        }
    }
    putAnimalMesh(animalIndex) {

    }
    deleteAnimalMesh(animalIndex) {

    }
    setAnimalRandomPosition(mesh) {

    }
    play(animalsIn, timeSpeedIn) {
        animals = animalsIn
        timeSpeed = timeSpeedIn
        nextTime = timeSpeedIn
        console.log("is playing")
        this.setUpPlayingScene()
        clock = new THREE.Clock()
        isPlaying = true
    }
    pause() {
        console.log("is paused")
        isPlaying = false
    }
    stop() {
        console.log("is stopped")
        isPlaying = false
    }
    resetCamera() {
        camera.position.set(3, cameraHeight, 3);
        camera.up = new THREE.Vector3(0, 1, 0);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
    resizeFrame() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    changeTimeSpeed(value) {
        console.log("changinTime:", value)
        timeSpeed = value
    }
    renderLoop() {
        if (isPlaying) {
            this.updateScene()
        }
        renderer.render(scene, camera);
        requestAnimationFrame(this.renderLoop);
    }

    componentDidMount() {
        // RENDERER
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(new THREE.Color(0, 0, 0));

        //renderer.setClearColor(new THREE.Color(0.2, 0.2, 0.35));
        this.mount.appendChild(renderer.domElement);

        // SCENE
        scene = new THREE.Scene();
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            SkyFront,
            SkyBack,
            SkyUp,
            SkyDown,
            SkyRight,
            SkyLeft,

        ]);
        scene.background = texture

        // CAMERA
        let fov = 60;
        let aspect = window.innerWidth / window.innerHeight;
        let near = 0.1;
        let far = 10000;
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.set(3, cameraHeight, 3);
        camera.up = new THREE.Vector3(0, 1, 0);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        cameraControl = new OrbitControls(camera, renderer.domElement);
        // Light
        // const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        // scene.add(light);
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 5, 0);
        scene.add(light);
        // MODELS
        let material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, wireframe: false });
        //Floor
        let floorDepth = 4
        let floorWidth = 4
        let floorHeight = 0.4
        let floorGeometry = new THREE.BoxGeometry(floorWidth, floorHeight, floorDepth);
        let floor = new THREE.Mesh(floorGeometry, material);
        floor.position.set(0, 0, 0);
        //Right wall
        let rWallDepth = 0.2
        let rWallWidth = floorWidth
        let rWallHeight = 2
        let rWallGeometry = new THREE.BoxGeometry(rWallWidth, rWallHeight, rWallDepth);
        let rightWall = new THREE.Mesh(rWallGeometry, material);
        rightWall.position.set(0, rWallHeight / 2 - floorHeight / 2, rWallWidth / 2 * -1);
        //Left wall
        let lWallDepth = 0.2
        let lWallWidth = floorWidth
        let lWallHeight = 2
        let lWallGeometry = new THREE.BoxGeometry(lWallWidth, lWallHeight, lWallDepth);
        let leftWall = new THREE.Mesh(lWallGeometry, material);
        leftWall.position.set(floorWidth / 2 * -1, lWallHeight / 2 - floorHeight / 2, 0);
        leftWall.rotation.y = Math.PI / 2
        // let worldAxes = new THREE.AxesHelper(10);
        //Animals material
        animalsMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, wireframe: false });
        //Animal1  Geometry
        animal1Geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
        //Animal2  Geometry
        animal2Geometry = new THREE.ConeGeometry(0.15, 0.3, 20);
        //Animal3  Geometry
        animal3Geometry = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 20);

        //Adding Scene Objects
        scene.add(floor)
        scene.add(rightWall)
        scene.add(leftWall)

        this.initializeAnimalsMeshes()
        // scene.add(worldAxes);
        // isPlaying = false
        this.renderLoop();

        window.addEventListener("resize", this.resizeFrame);
    }
    render() {
        return <div ref={ref => (this.mount = ref)} />;
    }

}
export default Three;
// EVENT LISTENERS & HANDLERS
// document.addEventListener("DOMContentLoaded", init);

// class Floor extends THREE.Mesh {
//     constructor() {
//         super();
//         console.log("ehheheh")
//         this.geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
//         this.material = new THREE.MeshBasicMaterial();
//         this.rotation.x = -0.5 * Math.PI;
//         this.wireframeHelper = new THREE.LineSegments(new THREE.WireframeGeometry(this.geometry));
//         this.wireframeHelper.material.color = new THREE.Color(0.2, 0.2, 0.2);
//         this.add(this.wireframeHelper);
//         this.visible = true;
//     }
// }