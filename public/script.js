const body = document.body;
//variables for dark mode
const btnDarkMode = document.getElementById("btn_dark_mode");
const divBtnDarkMode = document.getElementById("div_btn_dark");
const divInsideBtnDarkMode = document.getElementById("div_btn_dark_inside");
const containerSkills = document.getElementById("container_skills");
const linkNav = document.querySelectorAll(".link_nav");
const input = document.querySelectorAll("input");
const labelIcon = document.querySelectorAll("i");

//variable for back to top
const btnBackToTop = document.getElementById("btn_back_top");

//variables for toggle menu burger
const navBar = document.getElementById("nav_bar");
const btnBurgerMenu = document.getElementById("btn_burger_menu");

//variable for contact form
const contactForm = document.getElementById("contact_form");
let lastName = document.getElementById("last_name");
let firstName = document.getElementById("first_name");
let email = document.getElementById("email");
let subject = document.getElementById("subject");
let message = document.getElementById("message");

//toggle switch dark/light mode
btnDarkMode.addEventListener("click", () => {
    //style btn darkmode
    divBtnDarkMode.classList.toggle("div_dark_mode");
    divInsideBtnDarkMode.classList.toggle("div_inside_dark_mode");
    //style body
    body.classList.toggle("dark_mode_body");
    //style nav
    linkNav.forEach((element) => {
        element.classList.toggle("link_nav_dark_mode");
    });
    //style skills
    containerSkills.classList.toggle("container_skills_shadow_dark_mode");

    //style form
    input.forEach((e) => {
        e.classList.toggle("input_dark_mode");
    });
    labelIcon.forEach((icon) => {
        icon.classList.toggle("text_ligth_color_dark_mode");
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

    let formData = {
        lastName: lastName.value,
        firstName: firstName.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
    };
    console.log(formData);
    //AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    //JSON
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function () {
        if (xhr.responseText == "success!!!") {
            alert("Message envoyé");
            lastName.value = "";
            firstName.value = "";
            email.value = "";
            subject.value = "";
            message.value = "";
        }
        else if (xhr.responseText == 'error last name') {
            alert('Le champ \'Nom\' contient une erreur .')
        }
        else if (xhr.responseText == 'error first name') {
            alert('Le champ \'Prénom\' contient une erreur .')
        }
        else if (xhr.responseText == 'error sujet') {
            alert('Le champ \'Sujet\' contient une erreur .')
        }
        else if (xhr.responseText == 'error email') {
            alert('Le champ \'Email\' contient une erreur .')
        }
        else if (xhr.responseText == 'error message') {
            alert('Le champ \'Message\' contient une erreur .')
        }
        
        else {
            alert("Une erreur est survenue");
        }
    };
    //must be send as string format
    xhr.send(JSON.stringify(formData));
});
