import { getGrill, getNoise } from "./objects.js";

const main = () => {
    /* SETUP */
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, 0, height, 1, 1000);
    camera.position.z = 5;

    camera.zoom = 1;
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById("threejsCanvas").appendChild(renderer.domElement);

    const ratio = Math.max(
        Math.ceil(width / height),
        Math.ceil(height / width)
    );
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

    /* NOISE */
    const MAX_POINTS_NOISE = 50 * 50 * ratio;
    const noiseGeometry = new THREE.BufferGeometry();
    const noisePositions = new Float32Array(MAX_POINTS_NOISE);
    noiseGeometry.setAttribute(
        "position", // Size
        new THREE.BufferAttribute(noisePositions, 3)
    );
    /* NOISE */

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        const grillDivision = document.getElementById("grill-division").value;

        /* GRILL */
        if (!!document.getElementById("grill-eye").value) {
            const grill = getGrill(
                grillGeometry,
                camera.right,
                camera.bottom,
                grillDivision,
                ratio
            );
            scene.add(grill);
        } else {
            grillGeometry.setDrawRange(0, 0);
        }
        /* GRILL */

        /* NOISE */
        const noise = getNoise(
            noiseGeometry,
            camera.right,
            camera.bottom,
            grillDivision,
            ratio
        );
        scene.add(noise);
        /* NOISE */

        resize();
    }
    animate();
};

window.onload = main;
