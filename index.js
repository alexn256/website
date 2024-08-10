document.addEventListener("DOMContentLoaded", () => {
    let visitCount = 0;
    if (localStorage.getItem("visitCount")) {
        visitCount = parseInt(localStorage.getItem("visitCount"));
    }
    visitCount++;
    localStorage.setItem("visitCount", visitCount);
});