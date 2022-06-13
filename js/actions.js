/**
 * Action taken by pressing toggler button.
 */
const change_menu = () => {
    const menu = document.getElementById("menu-section");
    const alternatorButton = document.getElementById("alternator");
    const alternatorIcon = document.getElementById("alternator-icon");
    if (menu.classList.contains("menu-section-init")) {
        menu.classList.remove("menu-section-init");
        menu.classList.add("menu-section-close");
        alternatorIcon.classList.add("alternator-icon-left");
        alternatorButton.classList.add("alternator-left");
    } else {
        menu.classList.toggle("menu-section-open");
        menu.classList.toggle("menu-section-close");
        alternatorIcon.classList.toggle("alternator-icon-right");
        alternatorIcon.classList.toggle("alternator-icon-left");
        alternatorButton.classList.toggle("alternator-right");
        alternatorButton.classList.toggle("alternator-left");
    }
};
document.getElementById("alternator").addEventListener("click", change_menu);

/**
 * Action taken by eye button.
 */
const change_eye = () => {
    document.getElementById("grill-eye").value = !!document.getElementById(
        "grill-eye"
    ).value
        ? ""
        : "1";
    const onIcon = document.getElementById("eye-icon-on");
    const offIcon = document.getElementById("eye-icon-off");
    onIcon.classList.toggle("eye-hide-icon");
    offIcon.classList.toggle("eye-hide-icon");
};
document.getElementById("eye-button").addEventListener("click", change_eye);

/**
 * Action taken by changin colors.
 */
const change_demo_color = () => {
    const r = document.getElementById("point-color-r").value * 255;
    const g = document.getElementById("point-color-g").value * 255;
    const b = document.getElementById("point-color-b").value * 255;
    const a = document.getElementById("point-color-a").value;
    document.getElementById("color-demo").style.backgroundColor =
        "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

document
    .getElementById("point-color-r")
    .addEventListener("click", change_demo_color);
document
    .getElementById("point-color-g")
    .addEventListener("click", change_demo_color);
document
    .getElementById("point-color-b")
    .addEventListener("click", change_demo_color);

document
    .getElementById("point-color-a")
    .addEventListener("click", change_demo_color);

/**
 * Action taken by changin colors.
 */
const change_demo_cell_color = () => {
    const r = document.getElementById("cell-color-r").value * 255;
    const g = document.getElementById("cell-color-g").value * 255;
    const b = document.getElementById("cell-color-b").value * 255;
    document.getElementById("cell-color-demo").style.backgroundColor =
        "rgb(" + r + "," + g + "," + b + ")";
};

document
    .getElementById("cell-color-r")
    .addEventListener("click", change_demo_cell_color);
document
    .getElementById("cell-color-g")
    .addEventListener("click", change_demo_cell_color);
document
    .getElementById("cell-color-b")
    .addEventListener("click", change_demo_cell_color);

/**
 * Action taken by changin colors.
 */
const change_demo_field_color = () => {
    const r = document.getElementById("field-color-r").value * 255;
    const g = document.getElementById("field-color-g").value * 255;
    const b = document.getElementById("field-color-b").value * 255;
    document.getElementById("field-color-demo").style.backgroundColor =
        "rgb(" + r + "," + g + "," + b + ")";
};

document
    .getElementById("field-color-r")
    .addEventListener("click", change_demo_field_color);
document
    .getElementById("field-color-g")
    .addEventListener("click", change_demo_field_color);
document
    .getElementById("field-color-b")
    .addEventListener("click", change_demo_field_color);
