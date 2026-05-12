/* GESTION DES ONGLETS
function openTab(tabId) {
    let contents = document.querySelectorAll('.tab-content');
    contents.forEach(c => c.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
}

// GESTION DU SOUS-MENU
function toggleSub(id) {
    let sub = document.getElementById(id);
    sub.classList.toggle('show');
}

// OUVRIR MENU PRINCIPAL
function toggleMenu(event) {
    event.preventDefault();
    let submenu = event.target.nextElementSibling;
    submenu.classList.toggle("show");
}

// OUVRIR SOUS-MENU NIVEAU 2
function toggleSubMenu(event) {
    event.preventDefault();
    let submenu = event.target.nextElementSibling;
    submenu.classList.toggle("show");
}*/

function toggleMobileMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}