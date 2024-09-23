


function toggleAccordion(id, header) {
    const item = document.getElementById(id);
    const arrow = header.querySelector('[data-accordion="arrow"]');

    if (item.style.display === "block") {
        item.style.display = "none";
        arrow.classList.remove("fa-chevron-up");
        arrow.classList.add("fa-chevron-down");
    } else {
        item.style.display = "block";
        arrow.classList.remove("fa-chevron-down");
        arrow.classList.add("fa-chevron-up");
    }
}