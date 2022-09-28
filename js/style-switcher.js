
// toggle style

const styleToggler = document.querySelector(".style-toggler");

styleToggler.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})

window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switcher").classList.contains("open")){
        document.querySelector(".style-switcher").classList.remove("open")
    }
})

// theme colors

function setActiveStyle(color){
    const styles = document.querySelectorAll(".alternate-style");

    styles.forEach(style =>{
        if(color === style.getAttribute("title")){
            style.removeAttribute("disabled")
        }
        else{
            style.setAttribute("disabled","true")
        }
    })
}

// theme dark and light mode

const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    console.log(document.body.classList)
    dayNight.querySelector("i").classList.toggle("fa-sun")
    dayNight.querySelector("i").classList.toggle("fa-moon")
    document.body.classList.toggle("dark")
})

window.addEventListener("load", () => {
    if(document.body.classList.contains("dark")){
        dayNight.querySelector("i").classList.add("fa-sun")
    }
    else {
        dayNight.querySelector("i").classList.add("fa-moon")
    }
})