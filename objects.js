export const getGrill = (buffer, width, height, div = 5) => {
    const ratio = Math.max(
        Math.ceil(width / height),
        Math.ceil(height / width)
    );
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x600000,
    });
    const linePoints = [];
    for (let i = 1; i <= div; i++) {
        if (width > height) {
            for (let j = 0; j < ratio; j++) {
                // VERTICAL
                linePoints.push(
                    new THREE.Vector3((height * i) / div + j * height, 0, 0)
                );
                linePoints.push(
                    new THREE.Vector3(
                        (height * i) / div + j * height,
                        height,
                        0
                    )
                );
                // HORIZONTAL
                linePoints.push(new THREE.Vector3(0, (height * i) / div, 0));
                linePoints.push(
                    new THREE.Vector3(width, (height * i) / div, 0)
                );
            }
        } else {
            for (let j = 0; j < ratio; j++) {
                // HORIZONTAL
                linePoints.push(
                    new THREE.Vector3(0, (width * i) / div + j * width, 0)
                );
                linePoints.push(
                    new THREE.Vector3(width, (width * i) / div + j * width, 0)
                );
                // VERTICAL
                linePoints.push(new THREE.Vector3((width * i) / div, 0, 0));
                linePoints.push(
                    new THREE.Vector3((width * i) / div, height, 0)
                );
            }
        }
    }
    const lineGeometry = buffer.setFromPoints(linePoints);
    buffer.setDrawRange(0, div * ratio * 4);
    return new THREE.LineSegments(lineGeometry, lineMaterial);
};
