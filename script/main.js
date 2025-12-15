// main.js
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("load").forEach(el => {
        const src = el.getAttribute("src");
        if (src) {
            fetch(src)
                .then(res => res.text())
                .then(html => {
                    el.outerHTML = html.replace(/\{\{titre\}\}/g, el.getAttribute("titre") || "");
                })
                .catch(err => console.error("Erreur chargement :", src, err));
        }
    });
});