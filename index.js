import { getGrill } from "./objects.js";

const main = () => {
    /* SETUP */
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, 0, height, 1, 1000);
    camera.position.z = 5;

    camera.zoom = 1;
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("threejsCanvas").appendChild(renderer.domElement);
    /* SETUP */

    /* GRILL */
    const MAX_POINTS_GRILL = 1000;
    const grillGeometry = new THREE.BufferGeometry();
    const grillPositions = new Float32Array(MAX_POINTS_GRILL * 3); // 3 vertices per point
    grillGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(grillPositions, 3)
    );
    /* GRILL */

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        /* GRILL */
        if (!!document.getElementById("grill-eye").value) {
            const grillDivision =
                document.getElementById("grill-division").value;
            const grill = getGrill(
                grillGeometry,
                camera.right,
                camera.bottom,
                grillDivision
            );
            scene.add(grill);
        } else {
            grillGeometry.setDrawRange(0, 0);
        }
        /* GRILL */
    }
    animate();
};

window.onload = main;
