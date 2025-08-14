harpa.pages.push({
    name: 'Início',
    icon: 'home',
    showInNavigation: true,
    main() {
        //m-header
        document.querySelector('#m-header #titulo h2').innerText = this.name
        //m-main
        const mMain = document.querySelector(`#m-main`)
        //inserir m-layout da pagina
        mMain.innerHTML = /*html*/`
            <section id="page-home" class="
                piece-surface
                background-color-auto-06
                webkit-scrollbar-display-0
                scrollbar-track-outline-color-auto-02
                scrollbar-thumb-background-color-auto-12
                scrollbar-thumb-border-color-auto-02
                "></section>
        `
        const mAside = document.querySelector(`#m-aside`)
        //inserir m-layout da pagina
        mAside.innerHTML = /*html*/`
            <style>
                #empty {
                    display: grid;
                    gap: 16px;
                    place-self: center;
                    place-items: center;
                    .piece-icon {
                        font-size: 48px;
                        width: 100px;
                        height: 100px;
                        aspect-ratio: 1 / 1;
                        border-radius: 100px;
                        display: grid;
                        place-content: center;
                    }
                }
            </style>
            <div id="empty">
                <span class="material-symbols-rounded piece-icon piece-surface background-color-auto-04" translate="no">fmd_bad</span>
                <span class="label">Nenhuma letra selecionada!</span>
            </div>
        `

        //fragmento das letras
        const fragment = document.createDocumentFragment()
        db.forEach(({nome, numero}) => {
            let card = `
                <button 
                    popovertarget="popover-modal"
                    name="hino"
                    value="${numero}"
                    class="
                        card-list
                        piece-surface
                        background-color-auto-02
                        background-color-auto-03-hover
                        background-color-auto-04-active
                        background-color-auto-05-hover-active
                        background-color-secondary-active
                        text-color-secondary-active
                    "
                >
                    <span class="
                        numero
                        piece-surface
                        piece-parent
                        background-color-auto-06
                        background-color-auto-11-active
                        text-color-auto-19
                        text-color-auto-00-active
                        piece-tertiary
                        piece-s-40
                    "">${numero}</span>
                    <span class="nome">${nome}</span>
                    <span class="piece-ripple"></span>
                </button>
            `
            fragment.appendChild(tools.create(card))
        })
        document.querySelector(`#page-home`).appendChild(fragment)

        //adicionar função de carregar letra ao clicar no botão
        document.querySelector('#page-home').addEventListener('click', e => {
            if (e.target.classList.contains('card-list')) {
                this.showLyric(e.target.value, true)
                mAside.classList.add('display-grid')
                document.querySelector('.card-list.piece-actived')?.classList.remove('piece-actived')
                e.target.classList.add('piece-actived')
                e.target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        })

    },
    showLyric(numero_do_hino, changelocation) {

        if(changelocation) window.location.href = window.location.pathname + "#";

        //obter dados da musica pelo numero
        let { nome, numero, letra } = db.filter(f=>f.numero==numero_do_hino)[0]

        let favorito = harpa.favoritos.get(+numero).includes(+numero) ? 'accent piece-actived' : ''

        //cria o m-layout da pagina de letras
        document.querySelector("#popover-modal")
        const mAside = document.querySelector(`#m-aside`)
        mAside.innerHTML = `
            <section id="popover-letra" class="piece-surface">
                <header>
                    <span class="
                        numero
                        piece-surface
                        piece-parent
                        background-color-auto-06
                        text-color-auto-19
                        piece-tertiary
                        piece-s-40
                    ">${numero}</span>
                    <span class="nome">${nome}</span>
                    <button id="close" popovertarget="popover-modal" class="
                        piece-icon-button
                        piece-small
                        piece-surface
                        background-color-auto-06
                        background-color-auto-07-hover
                        text-color-auto-19
                        piece-secondary
                        piece-s-40
                    ">
                        <span class="material-symbols-rounded piece-icon" translate="no">close</span>
                        <span class="piece-ripple"></span>
                    </button>
                </header>
                <main class="webkit-scrollbar-display-0"></main>
                <footer>
                    <button id="prev" class="
                        piece-icon-button
                        piece-small
                        piece-wide
                        piece-surface
                        background-color-auto-04
                        text-color-to-012
                        background-color-auto-05-hover
                        ripple-color-048
                    ">
                        <span class="material-symbols-rounded piece-icon" translate="no">arrow_left_alt</span>
                        <span class="piece-ripple"></span>
                    </button>
                    <button id="fav" class="
                        piece-icon-button
                        piece-medium
                        piece-surface
                        background-color-auto-06
                        background-color-auto-07-hover
                        background-color-auto-11-active
                        background-color-auto-12-hover-active
                        text-color-auto-19
                        text-color-dark-02-active
                        piece-s-40
                        ${favorito}
                    ">
                        <span class="material-symbols-rounded piece-icon" translate="no">favorite</span>
                        <span class="piece-ripple"></span>
                    </button>
                    <button id="next" class="piece-icon-button piece-small piece-wide piece-surface background-color-auto-04 text-color-to-012 background-color-auto-05-hover ripple-color-048">
                        <span class="material-symbols-rounded piece-icon" translate="no">arrow_right_alt</span>
                        <span class="piece-ripple"></span>
                    </button>
                </footer>
            </section>
        `

        document.querySelector('#popover-letra #close').addEventListener('click', ()=>document.querySelector('#m-aside').classList.remove('display-grid'))


        //back page
        window.addEventListener("popstate", () => document.querySelector("#popover-letra #close").click())

        //remover ultimo verso que contem informações desnecessarias
        let versos = letra.split("#").filter((verso) => !verso.includes("Autor ou Tradutor:"))

        const fragment = document.createDocumentFragment()
        for (let i = 0; i < versos.length; i++) {

            // Verificar se o verso não começa com número
            if (/^\d+/.test(versos[i])) {

                let surface = `piece-surface background-color-auto-04 background-color-auto-06-active text-color-auto-21`

                let template = `
                    <div>
                        <label class='${surface}'>${versos[i].replace(/^\d+/,"").replace("@","").split("@").join(`<input type="radio" name="letra" class="piece-controller"></label><label class='${surface}'>`)}<input type="radio" name="letra" class="piece-controller"></label>
                    </div>
                `

                //adiciona verso que repete
                if(versos.filter(v=>!/^\d+/.test(v))[0]) {
                    template += `
                        <div class="piece-s-40">
                            <label class='${surface} piece-tertiary'>${versos.filter(v=>!/^\d+/.test(v))[0].split("@").join(`<input type="radio" name="letra" class="piece-controller"></label><label class='${surface} piece-tertiary'>`)}<input type="radio" name="letra" class="piece-controller"></label>
                        </div>
                    `
                }
                fragment.appendChild(tools.create(template))
            }
        }
        document.querySelector("#popover-letra>main").appendChild(fragment)

        //BOTÃO PARA PASSAR MUSICA
        document.querySelector('#next').addEventListener('click', (event)=> {
            this.showLyric(parseInt(document.querySelector("#popover-letra .numero").innerText)+1, false)
        })
        //BOTÃO PARA VOLTAR MUSICA
        document.querySelector('#prev').addEventListener('click', (event)=> {
            this.showLyric(parseInt(document.querySelector("#popover-letra .numero").innerText)-1, false)
        })
        document.querySelector('#fav').addEventListener('click', (event)=> {
            harpa.favoritos.set(+document.querySelector("#popover-letra .numero").innerText)
            event.target.classList.toggle('toned')
            event.target.classList.toggle('accent')
            event.target.classList.toggle('piece-actived')
        })

    }
})