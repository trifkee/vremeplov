const copyrightYear = document.querySelector('.futer-p')

const submenu = document.querySelector('.submenu')
    const navToggle = document.getElementById('meni')

    navToggle.addEventListener("click", () => {
        submenu.classList.toggle('active')
    })

const year = new Date()
let currentYear = year.getFullYear()

copyrightYear.innerText = 'Copyright © vremeplov ' + currentYear