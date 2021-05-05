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
let animal0Geometry, animal1Geometry, animal2Geometry, animalsMaterial;
let floorWidth, floorOffset
let cameraHeight = 2;
let years = 0
let setAnimalLbl, setYearsLbl
let timeWhenPaused = 0
let timeLost = 0

class Three extends Component {
    constructor(props) {
        super(props);
        animals = props.animals
        setAnimalLbl = [props.setAnimal0P,props.setAnimal1P,props.setAnimal2P]
        setYearsLbl = props.setYears
        isPlaying = false
        this.renderLoop = this.renderLoop.bind(this)
        this.resizeFrame = this.resizeFrame.bind(this)
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.stop = this.stop.bind(this)
        this.resume = this.resume.bind(this)
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
        let time = Math.round((clock.getElapsedTime() -timeLost) * 10) / 10
        //If it is a new year
        if (time > nextTime) {
            // console.log("timespeed", timeSpeed)
            //TODO everything goes here
            years+=1
            // console.log("year",years)
            animals.forEach((animal, index) => {
                // console.log(animal)
                let newP = Math.floor(animal.p0*Math.pow(animal.t + 1,years))
                //Add animals to the scene
                this.updateAnimalMeshCount(index, newP)
                //Change label with how many there are
                setAnimalLbl[index](newP)
            })
            setYearsLbl(years)
            nextTime += timeSpeed
        }

    }
    initializeAnimalsMeshes() {
        this.setUpPlayingScene()
        animals[0].meshes = []
        animals[1].meshes = []
        animals[2].meshes = []
        //console.log(animals)
        this.updateAnimalMeshCount(0, animals[0].p)
        this.updateAnimalMeshCount(1, animals[1].p)
        this.updateAnimalMeshCount(2, animals[2].p)
        //console.log(animals)
    }
    setUpPlayingScene() {
        animals[0].p = animals[0].p0
        animals[1].p = animals[1].p0
        animals[2].p = animals[2].p0

    }
    updateAnimalMeshCount(animalIndex, thisMany) {
        if (thisMany < 0) { return }
        let difference = thisMany - animals[animalIndex].meshes.length
        //console.log(animals)
        if (difference === 0) { return }
        var i
        if (difference > 0) { //Add animals
            i = 0
            for (i; i < difference; i++) {
                this.putAnimalMesh(animalIndex)
            }
        } else if (difference < 0) { //Kill animals
            i = difference
            for (i; i < 0; i++) {
                this.deleteAnimalMesh(animalIndex)
            }
        }
    }
    putAnimalMesh(animalIndex) {
        let mesh;
        if (animalIndex === 0) {
            mesh = new THREE.Mesh(animal0Geometry, animalsMaterial)
            animals[0].meshes.push(mesh)
        } else if (animalIndex === 1) {
            mesh = new THREE.Mesh(animal1Geometry, animalsMaterial)
            animals[1].meshes.push(mesh)
        } else if (animalIndex === 2) {
            mesh = new THREE.Mesh(animal2Geometry, animalsMaterial)
            animals[2].meshes.push(mesh)
        }
        this.setAnimalRandomPosition(mesh)

    }
    deleteAnimalMesh(animalIndex) {
        const animal = animals[animalIndex].meshes.pop()
        scene.remove(animal)
    }
    setAnimalRandomPosition(mesh) {
        //TODO consider the model width that could exeed the border
        let randomX = Math.random() * floorWidth / 2
        if (Math.random() > 0.5) { randomX = randomX * -1 }
        //console.log(randomX)
        let randomZ = Math.random() * floorWidth / 2
        if (Math.random() > 0.5) { randomZ = randomZ * -1 }
        //console.log(randomZ)
        //TODO get the height of the mesh and add half of it to the y position
        //console.log(mesh)
        mesh.position.set(randomX, floorOffset + mesh.geometry.parameters.height / 2, randomZ)
        scene.add(mesh)
    }
    play(animalsIn, timeSpeedIn) {
        animals = animalsIn
        timeSpeed = timeSpeedIn
        nextTime = timeSpeedIn
        //console.log("is playing")
        animals.forEach((animal) => { animal.t = (animal.pn - animal.pn1) / animal.pn1 })
        // console.log(animals)
        this.setUpPlayingScene()
        clock = new THREE.Clock()
        isPlaying = true
    }
    pause() {
        //console.log("is paused")
        timeWhenPaused = clock.getElapsedTime()
        isPlaying = false
    }
    resume(){
        timeLost += clock.getElapsedTime() - timeWhenPaused
        isPlaying = true
    }
    stop() {
        //console.log("is stopped")
        isPlaying = false
        this.updateAnimalMeshCount(0,animals[0].p0)
        this.updateAnimalMeshCount(1,animals[1].p0)
        this.updateAnimalMeshCount(2,animals[2].p0)
        setAnimalLbl[0](animals[0].p0)
        setAnimalLbl[1](animals[1].p0)
        setAnimalLbl[2](animals[2].p0)
        timeLost = 0
        timeWhenPaused = 0
        years = 0
        setYearsLbl(years)
        clock.stop()
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
        //console.log("changinTime:", value)
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
        floorWidth = 4
        let floorHeight = 0.4
        floorOffset = floorHeight / 2
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
        //Change to MeshLambertMaterial to add shadows
        animalsMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: false });
        //Animal0  Geometry
        animal0Geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05)
        //Animal1  Geometry
        animal1Geometry = new THREE.ConeGeometry(0.05, 0.05, 20);
        //Animal2  Geometry
        animal2Geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.04, 20);
        
        //Adding Scene Objects
        scene.add(floor)
        scene.add(rightWall)
        scene.add(leftWall)
        this.initializeAnimalsMeshes()
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
//         //console.log("ehheheh")
//         this.geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
//         this.material = new THREE.MeshBasicMaterial();
//         this.rotation.x = -0.5 * Math.PI;
//         this.wireframeHelper = new THREE.LineSegments(new THREE.WireframeGeometry(this.geometry));
//         this.wireframeHelper.material.color = new THREE.Color(0.2, 0.2, 0.2);
//         this.add(this.wireframeHelper);
//         this.visible = true;
//     }
// }