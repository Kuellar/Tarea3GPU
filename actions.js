document
    .getElementById("apply")
    .addEventListener("click", () => console.log("Apply"));

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
