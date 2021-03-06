import { vsSource, fsSource } from "./js/shaders.js";

var container;
var camera, scene, renderer, clock;
var uniforms;

const init = () => {
    container = document.getElementById("threeJS");

    camera = new THREE.Camera();
    camera.position.z = 1;

    scene = new THREE.Scene();
    clock = new THREE.Clock();

    var geometry = new THREE.PlaneBufferGeometry(2, 2);

    uniforms = {
        // BASE
        u_time: {
            type: "f",
            value: 1.0,
        },
        u_resolution: {
            type: "v2",
            value: new THREE.Vector2(),
        },
        u_mouse: {
            type: "v2",
            value: new THREE.Vector2(),
        },
        // PLAYGROUND
        // GRILL
        u_grill: {
            type: "f",
            value: document.getElementById("grill-division").value,
        },
        u_grill_active: {
            type: "bool",
            value: !!document.getElementById("grill-eye").value,
        },
        // GENERAL
        u_general_speed_x: {
            type: "f",
            value: document.getElementById("general-speed-x").value,
        },
        u_general_speed_y: {
            type: "f",
            value: document.getElementById("general-speed-y").value,
        },
        // CELL
        u_cell_show_color: {
            type: "bool",
            value: document.getElementById("cell-show-color").checked,
        },
        u_cell_r: {
            type: "f",
            value: document.getElementById("cell-color-r").value,
        },
        u_cell_g: {
            type: "f",
            value: document.getElementById("cell-color-g").value,
        },
        u_cell_b: {
            type: "f",
            value: document.getElementById("cell-color-b").value,
        },
        u_field_show_color: {
            type: "bool",
            value: document.getElementById("field-show-color").checked,
        },
        u_field_r: {
            type: "f",
            value: document.getElementById("field-color-r").value,
        },
        u_field_g: {
            type: "f",
            value: document.getElementById("field-color-g").value,
        },
        u_field_b: {
            type: "f",
            value: document.getElementById("field-color-b").value,
        },
        // ISOLINE
        u_isoline_show_color: {
            type: "bool",
            value: document.getElementById("isoline-show-color").checked,
        },
        u_isoline_size: {
            type: "f",
            value: document.getElementById("isoline-size").value,
        },
        u_isoline_opacity: {
            type: "f",
            value: document.getElementById("isoline-opacity").value,
        },
        // CELL CENTER
        u_point_active: {
            type: "bool",
            value: document.getElementById("show-point").checked,
        },
        u_point_size: {
            type: "f",
            value: document.getElementById("point-size").value,
        },
        u_point_r: {
            type: "f",
            value: document.getElementById("point-color-r").value,
        },
        u_point_g: {
            type: "f",
            value: document.getElementById("point-color-g").value,
        },
        u_point_b: {
            type: "f",
            value: document.getElementById("point-color-b").value,
        },
        u_point_a: {
            type: "f",
            value: document.getElementById("point-color-a").value,
        },
        u_point_gradient: {
            type: "f",
            value: document.getElementById("point-gradient").checked * 1,
        },
        u_point_additive: {
            type: "bool",
            value: document.getElementById("point-additive").checked,
        },
        // MOUSE
        u_mouse_as_point: {
            type: "bool",
            value: document.getElementById("mouse-as-point").checked,
        },
        u_mouse_hungry: {
            type: "bool",
            value: document.getElementById("mouse-hungry").checked,
        },
        u_mouse_hungry_radius: {
            type: "f",
            value: document.getElementById("mouse-hungry-radius").value,
        },
    };

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vsSource,
        fragmentShader: fsSource,
    });

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    container.onmousemove = (e) => {
        uniforms.u_mouse.value.x =
            e.pageX * (window.innerWidth / window.innerHeight);
        uniforms.u_mouse.value.y = -e.pageY + window.innerHeight;
    };
};

const onWindowResize = (event) => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
};

const animate = () => {
    requestAnimationFrame(animate);
    render();
};

const render = () => {
    uniforms.u_time.value +=
        clock.getDelta() * document.getElementById("general-speed").value;
    renderer.render(scene, camera);

    // GRILL
    uniforms.u_grill.value = document.getElementById("grill-division").value;
    uniforms.u_grill_active.value =
        !!document.getElementById("grill-eye").value;
    // GENERAL
    uniforms.u_general_speed_x.value =
        document.getElementById("general-speed-x").value;
    uniforms.u_general_speed_y.value =
        document.getElementById("general-speed-y").value;
    // CELL
    uniforms.u_cell_show_color.value =
        document.getElementById("cell-show-color").checked;
    uniforms.u_cell_r.value = document.getElementById("cell-color-r").value;
    uniforms.u_cell_g.value = document.getElementById("cell-color-g").value;
    uniforms.u_cell_b.value = document.getElementById("cell-color-b").value;
    uniforms.u_field_show_color.value =
        document.getElementById("field-show-color").checked;
    uniforms.u_field_r.value = document.getElementById("field-color-r").value;
    uniforms.u_field_g.value = document.getElementById("field-color-g").value;
    uniforms.u_field_b.value = document.getElementById("field-color-b").value;
    // ISOLINE
    uniforms.u_isoline_show_color.value =
        document.getElementById("isoline-show-color").checked;
    uniforms.u_isoline_size.value =
        document.getElementById("isoline-size").value;
    uniforms.u_isoline_opacity.value =
        document.getElementById("isoline-opacity").value;
    // CELL CENTER
    uniforms.u_point_active.value =
        document.getElementById("show-point").checked;
    uniforms.u_point_size.value = document.getElementById("point-size").value;
    uniforms.u_point_r.value = document.getElementById("point-color-r").value;
    uniforms.u_point_g.value = document.getElementById("point-color-g").value;
    uniforms.u_point_b.value = document.getElementById("point-color-b").value;
    uniforms.u_point_a.value = document.getElementById("point-color-a").value;
    uniforms.u_point_gradient.value =
        document.getElementById("point-gradient").checked * 1;
    uniforms.u_point_additive.value =
        document.getElementById("point-additive").checked;
    // MOUSE
    uniforms.u_mouse_as_point.value =
        document.getElementById("mouse-as-point").checked;
    uniforms.u_mouse_hungry.value =
        document.getElementById("mouse-hungry").checked;
    uniforms.u_mouse_hungry_radius.value = document.getElementById(
        "mouse-hungry-radius"
    ).value;
};

window.onload = init();
window.onload = animate();
