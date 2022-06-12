import { fsSource } from "./shaders.js";

export const getGrill = (buffer, width, height, div, ratio) => {
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x600000,
    });
    const linePoints = [];
    for (let i = 1; i <= div; i++) {
        if (width > height) {
            for (let j = 0; j < ratio; j++) {
                // VERTICAL
                linePoints.push(
                    new THREE.Vector3((height * i) / div + j * height, 0, 1)
                );
                linePoints.push(
                    new THREE.Vector3(
                        (height * i) / div + j * height,
                        height,
                        1
                    )
                );
                // HORIZONTAL
                linePoints.push(new THREE.Vector3(0, (height * i) / div, 1));
                linePoints.push(
                    new THREE.Vector3(width, (height * i) / div, 1)
                );
            }
        } else {
            for (let j = 0; j < ratio; j++) {
                // HORIZONTAL
                linePoints.push(
                    new THREE.Vector3(0, (width * i) / div + j * width, 1)
                );
                linePoints.push(
                    new THREE.Vector3(width, (width * i) / div + j * width, 1)
                );
                // VERTICAL
                linePoints.push(new THREE.Vector3((width * i) / div, 0, 1));
                linePoints.push(
                    new THREE.Vector3((width * i) / div, height, 1)
                );
            }
        }
    }
    const lineGeometry = buffer.setFromPoints(linePoints);
    buffer.setDrawRange(0, div * ratio * 4);
    return new THREE.LineSegments(lineGeometry, lineMaterial);
};

export const getNoise = (buffer, width, height, div, ratio) => {
    const customMaterial = new THREE.ShaderMaterial({
        uniforms: {
            u_resolution: { type: "v2", value: new THREE.Vector2() },
            width: { type: "float", value: width },
            height: { type: "float", value: height },
            div: { type: "int", value: div },
            ratio: { type: "int", value: ratio },
        },
        vertexShader: vsSource,
        fragmentShader: fsSource,
    });

    // DEFINE NEW INIT POINT
    const Points = [];

    Points.push(new THREE.Vector3(-1, -1, 0));
    Points.push(new THREE.Vector3(1, -1, 0));
    Points.push(new THREE.Vector3(1, 1, 0));
    Points.push(new THREE.Vector3(-1, -1, 0));
    Points.push(new THREE.Vector3(1, 1, 0));
    Points.push(new THREE.Vector3(-1, 1, 0));

    // Points.push(new THREE.Vector3(0, 0, 0));
    // Points.push(new THREE.Vector3(width, 0, 0));
    // Points.push(new THREE.Vector3(width, height, 0));
    // Points.push(new THREE.Vector3(0, 0, 0));
    // Points.push(new THREE.Vector3(width, height, 0));
    // Points.push(new THREE.Vector3(0, height, 0));

    const noiseGeometry = buffer.setFromPoints(Points);
    buffer.setDrawRange(0, 6);

    return new THREE.Mesh(noiseGeometry, customMaterial);
};
