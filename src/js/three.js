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
import { GLTFLoader } from "./jsm/loaders/GLTFLoader.js";
import Frame from '../assets/gltf/scene.gltf'
import Table from '../assets/gltf/table.gltf'

import Picture1 from '../assets/wallpaper1.jpeg'
import Pattern from '../assets/black_floor.jpeg'
import Rick from '../assets/rick.jpeg'
import Orangutan from '../assets/orangutan.png'

let renderer, scene, camera, cameraControl, isPlaying, isPaused, animals, clock, timeSpeed, nextTime;
let animal0Geometry, animal1Geometry, animal2Geometry, animalsMaterial;
let animal0Material, animal1Material, animal2Material;
let pic_frame1, ground, pic_frame2,pic_frame3, table;
let maxWidthOfObject = 0.1
let floorWidth, floorHeightOffset
let cameraHeight = 3;
let years = 0
let setAnimalLbl, setYearsLbl
let timeWhenPaused = 0
let timeLost = 0
let handleStop;

class Three extends Component {
    constructor(props) {
        super(props);
        animals = props.animals
        setAnimalLbl = [props.setAnimal0P, props.setAnimal1P, props.setAnimal2P]
        setYearsLbl = props.setYears
        handleStop = props.handleStop
        isPlaying = false
        isPaused = false
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
        this.updateP0 = this.updateP0.bind(this)
    }
    updateScene() {
        let time = Math.round((clock.getElapsedTime() - timeLost) * 10) / 10
        //If it is a new year
        if (time > nextTime) {
            // console.log("timespeed", timeSpeed)
            //TODO everything goes here
            if (time > nextTime + timeSpeed) {//IF objects haven't been added to the scene in time stop
                this.stop()
            }
            years += 1
            // console.log("year",years)
            animals.forEach((animal, index) => {
                // console.log(animal)
                let newP = Math.floor(animal.p0 * Math.pow(animal.t + 1, years))
                animal.p = newP
                //Add animals to the scene
                this.updateAnimalMeshCount(index, newP)

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
        if (thisMany <= 0) { return }
        let difference = thisMany - animals[animalIndex].meshes.length
        // console.log(animals[animalIndex].meshes.length)
        // let difference = thisMany = animals[animalIndex].p
        // console.log(`For animal ${animalIndex}: ${thisMany}`)
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
        //Change label with how many there are
        setAnimalLbl[animalIndex](thisMany)
    }
    putAnimalMesh(animalIndex) {
        let mesh;
        if (isPlaying) {
            let time = Math.round((clock.getElapsedTime() - timeLost) * 10) / 10
            if (time > nextTime + timeSpeed) {//IF objects haven't been added to the scene in time stop
                this.stop()
            }
        }

        if (animalIndex === 0) {
            mesh = new THREE.Mesh(animal0Geometry, animal0Material)
            animals[0].meshes.push(mesh)
        } else if (animalIndex === 1) {
            mesh = new THREE.Mesh(animal1Geometry, animal1Material)
            animals[1].meshes.push(mesh)
        } else if (animalIndex === 2) {
            mesh = new THREE.Mesh(animal2Geometry, animal2Material)
            animals[2].meshes.push(mesh)
        }
        this.setAnimalRandomPosition(mesh)

    }
    deleteAnimalMesh(animalIndex) {
        // console.log(animals[animalIndex].meshes.length)
        const animal = animals[animalIndex].meshes.pop()
        // console.log(animals[animalIndex].meshes.length)
        scene.remove(animal)
    }
    setAnimalRandomPosition(mesh) {
        //TODO consider the model width that could exeed the border
        let randomX = Math.random() * floorWidth / 2
        if (Math.random() > 0.5) { //Negative x
            randomX = randomX * -1 + maxWidthOfObject
        } else {//Positive x
            randomX = randomX - maxWidthOfObject
        }
        //console.log(randomX)
        let randomZ = Math.random() * floorWidth / 2
        if (Math.random() > 0.5) { //Negative Z
            randomZ = randomZ * -1 + maxWidthOfObject
        } else {//Positive Z
            randomZ = randomZ - maxWidthOfObject
        }
        //console.log(randomZ)
        //console.log(mesh)
        mesh.position.set(randomX, floorHeightOffset + mesh.geometry.parameters.height / 2, randomZ)
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
        isPaused = false
        isPlaying = true
    }
    pause() {
        //console.log("is paused")
        isPaused = true
        timeWhenPaused = clock.getElapsedTime()
        isPlaying = false
    }
    resume() {
        timeLost += clock.getElapsedTime() - timeWhenPaused
        isPaused = false
        isPlaying = true
    }
    stop() {
        //console.log("is stopped")
        isPaused = false
        isPlaying = false
        handleStop()
        console.log(animals)
        setAnimalLbl[0](animals[0].p0)
        setAnimalLbl[1](animals[1].p0)
        setAnimalLbl[2](animals[2].p0)
        // console.log(animals[0].meshes.length)
        // this.updateAnimalMeshCount(0, animals[0].p0)
        // console.log(animals[0].meshes.length)
        // console.log("L")
        // console.log(animals[1].meshes.length)
        // this.updateAnimalMeshCount(1, animals[1].p0)
        // console.log(animals[1].meshes.length)
        // console.log("L")
        // console.log(animals[2].meshes.length)
        // this.updateAnimalMeshCount(2, animals[2].p0)
        // console.log(animals[2].meshes.length)
        // for(var i = 0; i<3; i++){
        //     console.log("I",i)
        //     console.log(animals[i].meshes.length)
        //     while(animals[1].p0 !==animals[1].meshes.length){
        //         console.log("updateing:",i)
        //         this.updateAnimalMeshCount(1, animals[1].p0)
        //     }
        //     console.log(animals[i].meshes.length)
        // }
        // while(animals[0].p0 !==animals[0].meshes.length){
        //     console.log("updateing 0")
        //     this.updateAnimalMeshCount(0, animals[0].p0)
        // }
        // while(animals[1].p0 !==animals[1].meshes.length){
        //     console.log("updateing 1")
        //     this.updateAnimalMeshCount(1, animals[1].p0)
        // }
        // while(animals[2].p0 !==animals[2].meshes.length){
        //     console.log("updateing 2")
        //     this.updateAnimalMeshCount(2, animals[2].p0)
        // }
        console.log(animals)
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
    updateP0(index, value) {
        animals[index].p0 = value
    }
    renderLoop() {
        if (isPlaying) {
            this.updateScene()
        } else if (isPaused === false) {
            this.updateAnimalMeshCount(0, animals[0].p0)
            this.updateAnimalMeshCount(1, animals[1].p0)
            this.updateAnimalMeshCount(2, animals[2].p0)
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
        let material = new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: false });
        // let material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false });
        let floorMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
        //Floor
        let floorDepth = 4
        floorWidth = 4
        let floorHeight = 0.4
        floorHeightOffset = floorHeight / 2
        let floorGeometry = new THREE.BoxGeometry(floorWidth, floorHeight, floorDepth);
        let floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.set(0, -0.001, 0);
        const planeGeometry = new THREE.PlaneGeometry(floorDepth, floorWidth);
        const textureCarpet = new THREE.TextureLoader().load(Pattern);
        const materialCarpet = new THREE.MeshBasicMaterial({ map: textureCarpet });
        const carpet = new THREE.Mesh(planeGeometry, materialCarpet);
        carpet.rotateX(Math.PI / 2 * -1)
        carpet.position.y = floorHeightOffset
        ground = new THREE.Group()
        ground.add(floor)
        ground.add(carpet)
        scene.add(ground)
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
        animal0Material = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: false });
        animal1Material = new THREE.MeshBasicMaterial({ color: 0x0000FF, wireframe: false });
        animal2Material = new THREE.MeshBasicMaterial({ color: 0x00FF00, wireframe: false });

        //Animal0  Geometry
        animal0Geometry = new THREE.BoxGeometry(0.05, 0.05, 0.05)
        //Animal1  Geometry
        animal1Geometry = new THREE.ConeGeometry(0.05, 0.05, 20);
        //Animal2  Geometry
        animal2Geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.04, 20);

        //Frames
        let gltf_loader = new GLTFLoader();
        gltf_loader.load(Frame, function (gltf) {
            //Frame
            const frame = gltf.scene;
            frame.rotation.y = Math.PI
            //Picture
            const geometry = new THREE.PlaneGeometry(16 / 9, 1);
            const texture = new THREE.TextureLoader().load(Picture1);
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const picture = new THREE.Mesh(geometry, material);
            //Picture with frame
            pic_frame1 = new THREE.Group();
            pic_frame1.add(frame);
            pic_frame1.add(picture);

            pic_frame1.position.y = 1
            pic_frame1.rotation.y = Math.PI / 2
            pic_frame1.position.x = -1.88
            pic_frame1.position.z = 0.5
            scene.add(pic_frame1)
        });
        gltf_loader.load(Table, function (gltf) {
            //Frame
            table = gltf.scene;
            table.scale.set(0.5, 0.8, 0.5)
            table.position.set(-1.4, 0, -1.5)
            scene.add(table)
        });
        gltf_loader.load(Frame, function (gltf) {
            //Frame
            const frame = gltf.scene;
            frame.rotation.y = Math.PI
            //Picture
            const geometry = new THREE.PlaneGeometry(1, 16 / 9)
            const texture = new THREE.TextureLoader().load(Rick);
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const picture = new THREE.Mesh(geometry, material);
            picture.rotation.z = Math.PI / 2 * -1
            //Picture with frame
            pic_frame2 = new THREE.Group();
            pic_frame2.add(frame);
            pic_frame2.add(picture);
            pic_frame2.rotation.z = Math.PI / 2
            // pic_frame2.rotation.y = Math.

            pic_frame2.position.y = 1
            pic_frame2.position.z = -1.88

            pic_frame2.scale.set(0.5,0.5,0.5)
            scene.add(pic_frame2)
        });
        gltf_loader.load(Frame, function (gltf) {
            //Frame
            const frame = gltf.scene;
            frame.rotation.y = Math.PI
            //Picture
            const geometry = new THREE.PlaneGeometry(16 / 9,1)
            const texture = new THREE.TextureLoader().load(Orangutan);
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const picture = new THREE.Mesh(geometry, material);
            //Picture with frame
            pic_frame3 = new THREE.Group();
            pic_frame3.add(frame);
            pic_frame3.add(picture);
            // pic_frame2.rotation.y = Math.

            pic_frame3.position.y = 1
            pic_frame3.position.z = -1.88
            pic_frame3.position.x = 1
            pic_frame3.scale.set(0.5,0.5,0.5)
            scene.add(pic_frame3)
        });
        //Adding Scene Objects
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
