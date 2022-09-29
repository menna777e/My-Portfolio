// navbar

(() =>{

    document.addEventListener("click", (event) =>{
        if(event.target.classList.contains("link")){
            if(event.target.hash !== ""){
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate active section
                document.querySelector(".section.active").classList.add("hide")
                document.querySelector(".section.active").classList.remove("active")
                // activate new section
                document.getElementById(hash).classList.add("active")
                document.getElementById(hash).classList.remove("hide")
            document.querySelector(".link.active").classList.add("outer-shadow")
            document.querySelector(".link.active").classList.remove("active", "inner-shadow") 
            event.target.classList.add("active","inner-shadow")
            window.location.hash = hash;
        }
    }   
    })

})();
// navigation menu

(() => {

    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = document.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", () =>{
        navMenu.classList.toggle("open");
        bodyScrollingToggle();
    });
    closeNavBtn.addEventListener("click", () =>{
        navMenu.classList.remove("open");
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() =>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)

    });



    document.addEventListener("click", (event) =>{
        console.log(event.target.classList)
        if(event.target.classList.contains("link-item")){
            if(event.target.hash !== ""){
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate active section
                document.querySelector(".section.active").classList.add("hide")
                document.querySelector(".section.active").classList.remove("active")
                // activate new section
                document.getElementById(hash).classList.add("active")
                document.getElementById(hash).classList.remove("hide")
                // deactivate active link-item navigation
                document.querySelector(".link-item.active").classList.add("outer-shadow")
                document.querySelector(".link-item.active").classList.remove("active", "inner-shadow")

                 // activate new link-item navigation
                if(navMenu.classList.contains("open")){
                    event.target.classList.remove("outer-shadow","hover-in-shadow")
                    event.target.classList.add("active","inner-shadow")
                    navMenu.classList.remove("open");
                    document.querySelector(".fade-out-effect").classList.add("active");
                    setTimeout(() =>{
                        document.querySelector(".fade-out-effect").classList.remove("active");
                    },300)
                }
                else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach(item => {
                        if( hash === item.hash){
                            console.log(item)
                            item.classList.remove("outer-shadow","hover-in-shadow")
                            item.classList.add("active","inner-shadow")
                        }
                    })
                    // document.querySelector(".fade-out-effect").classList.add("active");
                    // setTimeout(() =>{
                    //     document.querySelector(".fade-out-effect").classList.remove("active");
                    // },300)
                }
                window.location.hash = hash;
            }
        }
    })
})();


// about tabs

(() =>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) =>{

        if (!event.target.classList.contains("active")){
            tabsContainer.querySelector(".active").classList.remove("active","outer-shadow");
            event.target.classList.add("active","outer-shadow")

            const target = event.target.getAttribute("data-target");
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
        
    })
})();

// portfolio popup

(() =>{
    const projectDetailsContainer = document.querySelector(".pp-details"),
    projectDetailsBtn = document.getElementById("pp-details-btn"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelector(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close");

    let screenshoots, itemIndex, slideIndex;

    portfolioItemsContainer.addEventListener("click", (event) =>{

        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;

            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            
            screenshoots = portfolioItemsContainer.children[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            screenshoots = screenshoots.split(",");
            if(screenshoots.length === 1){
                prevBtn.style.display = "none";
                nextBtn.style.display="none";
            }
            else {
                prevBtn.style.display = "block";
                nextBtn.style.display="block";
            }

            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        } 
    })

    closeBtn.addEventListener("click", () =>{
        popupToggle();
    })

    function popupToggle() {
        popup.classList.toggle("open")
        document.body.classList.toggle("stop-scrolling")
    }

    function popupSlideshow (){
        const imgSrc = screenshoots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        // activate loader
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () =>{
            popup.querySelector(".pp-loader").classList.remove("active")
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshoots.length;
    }

    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshoots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow()
    })
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0){
            slideIndex = screenshoots.length-1;
        }
        else{
            slideIndex--;
        }
        popupSlideshow()
    })

    function popupDetails() {

        const details = portfolioItemsContainer.children[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;

        const title = portfolioItemsContainer.children[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h3").innerHTML = title;

    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle() {
        console.log( projectDetailsBtn.querySelector("i"));
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus")
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 ;
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus")
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTop(0,projectDetailsContainer.offset().top)
        }

    }
})();

// Hide all sections except home

(() =>{

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) =>{
        if(!section.classList.contains("active")){
            section.classList.add("hide")
        }
    })
    console.log(sections)
})();
