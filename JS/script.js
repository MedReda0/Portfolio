let nav = document.querySelector("nav")
let nav_eles = document.querySelectorAll("nav li a")
let menu_btn = document.querySelector(".burger")
let filter = document.querySelector(".filter")
let scrollPosition = 0

function menu_toggle() {
    nav.classList.toggle("max-lg:-left-full")
    nav.classList.toggle("max-lg:left-0")
    menu_btn.classList.toggle("text-main-color")
    filter.classList.toggle("blur-xl")
    if (nav.classList.contains("max-lg:left-0")) {
        scrollPosition = window.scrollY || window.pageYOffset
        document.body.classList.add("overflow-hidden", "fixed", "inset-0")
        document.body.style.top = `-${scrollPosition}px`
    } else {
        document.body.classList.remove("overflow-hidden", "fixed", "inset-0")
        document.body.style.top = ""
        window.scrollTo(0, scrollPosition)
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
window.addEventListener("resize", () => {
    if (nav.classList.contains("max-lg:left-0")) {
        menu_toggle()
    }
})

// GSAP Animations Scripts


document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    document.querySelectorAll(".title").forEach(title => {
        const title_split = SplitText.create(title, { type: "words", mask: "words" })
        const sub = title.parentElement?.querySelector('.sub') || null;
        const title_tl = gsap.timeline({ scrollTrigger: { trigger: title, start: "top 80%" } })
        if(sub){
            const sub_split = SplitText.create(sub, { type: "lines", mask: "lines" })
            title_tl.from(title_split.words, { x: -100, opacity: 0, duration: 1, stagger: .4, ease: "power4.out" })
                .from(sub_split.lines, { y: -200, opacity: 0, duration: .8, stagger: .3, ease: "power4.out"},"-=.5")
        }else{
            title_tl.from(title_split.words, { x: -100, opacity: 0, duration: 1, stagger: .4, ease: "power4.out" })
        }
    })
    
    const main_tl = gsap.timeline({})
    const name_split = SplitText.create("main h1",{type:"lines",mask:"lines"})
    const role_split = SplitText.create("main h2",{type:"words",mask:"words"})
    main_tl.from(name_split.lines, { y: -200, opacity: 0, duration: 1.2, stagger:.3, ease: "power4.out" })
        .from("main .pic", { x: 300, opacity: 0, filter: "blur(10px)" , duration: 1.7, ease: "power4.out" },"<")
        .from(role_split.words, { opacity: 0, duration: 1, stagger: .3, ease: "power3.out" },"-=.7")
        .from("main .links a", { opacity: 0, filter: "blur(7px)" , duration: .3, stagger: .2, ease: "power3.out" }, "-=.7");
    
    const about_tl = gsap.timeline({ scrollTrigger: { trigger: "#about", start: "top 80%" } })
    const about_spilt = SplitText.create("#about h3", { type: "lines", mask: "lines" })
    about_tl.from(about_spilt.lines, { opacity: 0, duration: 1.2, stagger: .3, ease: "power4.out" },"+=.5")
        .from("#about p", { opacity: 0, filter: "blur(10px)", duration: .7, ease: "power4.out" },"-=1")
        .from("#about .pic", { x: -300, opacity: 0, filter: "blur(10px)", duration: 1.7, ease: "power4.out", scrollTrigger: { trigger: "#about .pic", start: "top 90%" } }, "-=1.9")

    const skills_tl = gsap.timeline({ scrollTrigger: { trigger: "#skills .rows", start: "top 80%" } })
    document.querySelectorAll("#skills .rows").forEach((row,i) => {
        skills_tl.from(row.querySelector(".category"), { x: -100, opacity: 0, filter: "blur(10px)", duration: .8, ease: "power4.out" })
            .from(row.querySelectorAll(".card"), { x: -100, opacity: 0, filter: "blur(10px)", duration: .6, stagger: .5, ease: "power3.out" }, "-=.2")
    })
});