const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames */
const paths = [
    "images/pic1.png", "images/pic2.png","images/pic3.png","images/pic4.png", "images/pic5.png"
]

/* Declaring the alternative text for each image file */

const alts = {
    "images/pic1.png": "It Works!",
    "images/pic2.png": "Framework",
    "images/pic3.png": "Type:Null",
    "images/pic4.png": "Conversion",
    "images/pic5.png": "I like numbers!"
}

/* Looping through images */

paths.forEach((path) => {
    const newImage = document.createElement("img");
    newImage.setAttribute("src", path);
    newImage.setAttribute("alt", alts[path]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener("click", (event) => {
        displayedImage.src = event.target.src;
        displayedImage.alt = event.target.alt;
        if (event.target.src.substring(event.target.src.length - 15) === paths[0]) {
            displayedImage.style.marginTop = "60px";
            overlay.style.marginTop = "60px";
            overlay.style.height = "450px";
        }
        else {
            displayedImage.style.marginTop = "0px";
            overlay.style.marginTop = "0px";
            overlay.style.height = "600px";
        }
    });
});



/* Wiring up the Darken/Lighten button */

var isDark = false;
btn.addEventListener("click", () => {
    if (displayedImage.src.substring(displayedImage.src.length - 15) === paths[0]) {
        overlay.style.marginTop = "60px";
        overlay.style.height = "450px";
    } else {
        overlay.style.marginTop = "0px";
        overlay.style.height = "600px";
    }
    if (!isDark) {
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
        btn.textContent = "Lighten";
        isDark = true;
    } else {
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
        btn.textContent = "Darken";
        isDark = false;
    }
    
});