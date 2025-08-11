//Define o tema claro ou escuro
if(localStorage.harpa) {
    if(harpa.darkMode.get()) document.body.classList.add("piece-dark")
    else document.body.classList.add("piece-light")
}

//Define o Hue
// document.querySelector("html").style.setProperty('--main-color', harpa.HUEMainColor.get())
//Define o paleta
// document.body.classList.add(harpa.paleta.get())
//define font size
document.querySelector("html").style.setProperty('--font-size', harpa.fontSize.get())

// Fill m-nav
harpa.pages
.filter(page=>page.showInNavigation)
.forEach((page, i)=>{
    const template = /*html*/`
        <label class="piece-item piece-surface">
            <span class="
                piece-indicator
                piece-surface
                piece-parent

                background-color-auto-02
                background-color-auto-04-hover

                

                background-color-auto-11-active
                background-color-auto-13-hover-active
                piece-s-40
                piece-secondary
            "></span>
            <span class="material-symbols-rounded piece-icon" translate="no">${page.icon}</span>
            <span class="piece-label">${page.name}</span>
            <input id="nav-btn-${i}" type="radio" name="nav" value="${page.name}" class="piece-controller">
        </label>
    `
    document.querySelector(`#m-nav .piece-items`).appendChild(tools.create(template))
})
document.querySelectorAll("#m-nav .piece-item input").forEach(input=>{
    input.addEventListener('click', ()=> {
        harpa.pages.filter(page=>page.name==input.value)[0].main()
    })
})
document.querySelector('#m-nav .piece-item').click()