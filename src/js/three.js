import * as THREE from '../../src/build/three.module.js';
import { OrbitControls } from '../../src/js/jsm/controls/OrbitControls.js';
// import Stats from '../../src/js/jsm/libs/stats.module.js';
// import dat from '../../src/js/jsm/libs/dat.gui.module.js';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../three.css'

let renderer, scene, camera, cameraControl, mesh, stats, isPlaying;
// let theta = 2 * Math.PI / 360
let theta = 0
let radius = 3;
let cameraHeight = 0;
let params = {}
let sidebarWidth = 0
class Three extends Component {
    constructor(props){
        super(props);
        console.log(props)
        sidebarWidth = props.width
        this.renderLoop = this.renderLoop.bind(this)
    }
    renderLoop() {
        // stats.begin();
        if (isPlaying) {
            let newX, newZ
            if (!params.counterClockwise) {
                newX = radius * Math.sin(theta)
                newZ = radius * Math.cos(theta)
                theta += 2 * Math.PI / 360 * params.speed
            } else {
                newX = radius * Math.sin(theta) * -1
                newZ = radius * Math.cos(theta) * -1
                theta -= 2 * Math.PI / 360 * params.speed
            }
            camera.position.set(newX, cameraHeight, newZ);
            camera.up = new THREE.Vector3(0, 1, 0);
            camera.lookAt(new THREE.Vector3(0, 0, 0));

        }

        renderer.render(scene, camera); // DRAW SCENE
        // updateScene();
        // stats.end();
        // stats.update();
        requestAnimationFrame(this.renderLoop);
    }

    componentDidMount() {
        // RENDERER
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth-sidebarWidth, window.innerHeight);
        //renderer.setClearColor(new THREE.Color(0.2, 0.2, 0.35));
        this.mount.appendChild(renderer.domElement);

        // SCENE
        scene = new THREE.Scene();

        // CAMERA
        let fov = 60;
        let aspect = window.innerWidth / window.innerHeight;
        let near = 0.1;
        let far = 10000;
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.set(0, cameraHeight, radius);
        camera.up = new THREE.Vector3(0, 1, 0);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        cameraControl = new OrbitControls(camera, renderer.domElement);

        // MODELS
        let geometry = new THREE.ConeGeometry();
        let material = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
        mesh.name = "Cube";
        mesh.position.set(0, 0.5, 0);


        // WORLD AXES
        let worldAxes = new THREE.AxesHelper(10);

        // SCENE GRAPH
        scene.add(mesh);
        scene.add(worldAxes);

        this.renderLoop();
        window.addEventListener("resize", function () {
            renderer.setSize(window.innerWidth-sidebarWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });
    }

    

    // updateScene() {
    // }

    

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
//         this.geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
//         this.material = new THREE.MeshBasicMaterial();
//         this.rotation.x = -0.5 * Math.PI;
//         this.wireframeHelper = new THREE.LineSegments(new THREE.WireframeGeometry(this.geometry));
//         this.wireframeHelper.material.color = new THREE.Color(0.2, 0.2, 0.2);
//         this.add(this.wireframeHelper);
//         this.visible = false;
//     }
// }