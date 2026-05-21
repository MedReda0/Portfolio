let nav = document.querySelector("nav")
let nav_eles = document.querySelectorAll("nav li a")
let menu_btn = document.querySelector(".burger")
let filter = document.querySelector(".filter")
let scrollPosition = 0

function menu_toggle(){
    nav.classList.toggle("max-lg:-left-full")
    nav.classList.toggle("max-lg:left-0")
    menu_btn.classList.toggle("text-main-color")
    filter.classList.toggle("blur-xl")
    if (nav.classList.contains("max-lg:left-0")){
        scrollPosition = window.scrollY || window.pageYOffset
        document.body.classList.add("overflow-hidden", "fixed", "inset-0")
        document.body.style.top=`-${scrollPosition}px`
        console.log(scrollPosition)
    }else{
        document.body.classList.remove("overflow-hidden", "fixed", "inset-0")
        document.body.style.top = ""
        window.scrollTo(0,scrollPosition)
    }
    
}

nav_eles.forEach(ele => {
    ele.addEventListener("click", () => {
        [...nav_eles].map(a => {
            a.classList.remove("active")
        })
        ele.classList.add("active")
        // Only toggle menu if it's open (mobile view)
        if (nav.classList.contains("max-lg:left-0")) {
            menu_toggle()
        }
    })
})

menu_btn.addEventListener("click", menu_toggle)
window.addEventListener("resize", ()=>{
    if (nav.classList.contains("max-lg:left-0")) {
        menu_toggle()
    }
})