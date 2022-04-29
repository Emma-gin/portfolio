const body = document.body;
//variables for dark mode
const btnDarkMode = document.getElementById("btn_dark_mode");
const divBtnDarkMode = document.getElementById("div_btn_dark");
const divInsideBtnDarkMode = document.getElementById("div_btn_dark_inside");
const containerSkills = document.getElementById("container_skills");
const linkNav = document.querySelectorAll(".link_nav");

//variable for back to top
const btnBackToTop = document.getElementById("btn_back_top");

//variables for toggle menu burger
const navBar = document.getElementById("nav_bar");
const btnBurgerMenu = document.getElementById("btn_burger_menu");

//variable for contact form
const contactForm = document.getElementById("contact_form");
let lastName = document.getElementById('last_name');
let firstName = document.getElementById('first_name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

//toggle switch dark/light mode
btnDarkMode.addEventListener("click", () => {
    body.classList.toggle("dark_mode_body");
    // svg.classList.toggle('svg_dark_mode');
    divBtnDarkMode.classList.toggle("div_dark_mode");
    divInsideBtnDarkMode.classList.toggle("div_inside_dark_mode");
    containerSkills.classList.toggle("container_skills_shadow_dark_mode");
    linkNav.forEach((element) => {
        console.log(element);
        element.style.color = "white";
    });
});

//back to top

window.onscroll = function () {
    scrollFunction();
};

// btn appear after some scrolling
function scrollFunction() {
    if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
    ) {
        btnBackToTop.style.display = "block";
    } else {
        btnBackToTop.style.display = "none";
    }
}

function topFunction() {
    body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

btnBackToTop.addEventListener("click", () => {
    topFunction();
});

//toggle menu burger

btnBurgerMenu.addEventListener("click", () => {
    btnBurgerMenu.classList.toggle("close_burger");
    navBar.classList.toggle("nav_block");
});

//form contact

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("submit clicked");

    let formData = {
        lastName: lastName.value,
        firstName: firstName.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }
    console.log(formData)
    //AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    //JSON
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.responseText == 'success') {
            alert('Email sent');
            lastName.value = '';
            firstName.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        } else {
            alert('Une erreur est survenue')
        }
    }
    //must be send as string format
    xhr.send(JSON.stringify(formData))
});
