document
    .getElementById("apply")
    .addEventListener("click", () => console.log("Apply"));

/**
 * Action taken by pressing toggler button.
 */
const change_menu = () => {
    const menu = document.getElementById("menu-section");
    const menuIcon = document.getElementById("alternator-icon");
    if (menu.classList.contains("menu-section-init")) {
        menu.classList.remove("menu-section-init");
        menu.classList.add("menu-section-close");
        menuIcon.classList.add("alternator-left");
    } else {
        menu.classList.toggle("menu-section-open");
        menu.classList.toggle("menu-section-close");
        menuIcon.classList.toggle("alternator-right");
        menuIcon.classList.toggle("alternator-left");
    }
};
document.getElementById("alternator").addEventListener("click", change_menu);
