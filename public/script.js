const body = document.body;
//variables for dark mode
const btnDarkMode = document.getElementById("btn_dark_mode");
const sunIcon = document.querySelector(".container_icon_sun");
const moonIcon = document.querySelector(".container_icon_moon");
const containerSkills = document.getElementById("container_skills");
const linkNav = document.querySelectorAll(".link_nav");
const input = document.querySelectorAll("input");
const labelIcon = document.querySelectorAll("i");
const titleBorder = document.querySelector(".title_text_top");
const burger = document.querySelector(".bar_burger_menu");
const containerBackgroundImg = document.querySelector(".container_bg");

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

//functions for dark mode
function changeIconBtnDarkMode() {
    if (body.classList.contains("dark_mode_body")) {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
    } else {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
    }
}

//set background image for header
containerBackgroundImg.style.backgroundImage = "url('assets/images/fond1.jpg')";
function changeImgBackground() {
    if (body.classList.contains("dark_mode_body")) {
        containerBackgroundImg.style.backgroundImage =
            "url('assets/images/fond2.jpg')";
    } else {
        containerBackgroundImg.style.backgroundImage =
            "url('assets/images/fond1.jpg')";
    }
}

function changeNavBarColorBackground() {
    if (body.classList.contains("dark_mode_body")) {
        document.documentElement.style.setProperty(
            "--bg-color-nav-bar",
            "#343333"
        );
    } else {
        document.documentElement.style.setProperty(
            "--bg-color-nav-bar",
            "#8ebfea"
        );
    }
}

function changeColorNavBurger() {
    if (body.classList.contains("dark_mode_body")) {
        document.documentElement.style.setProperty("--burger-color", "#e6e6e6");
    } else {
        document.documentElement.style.setProperty("--burger-color", "#323232");
    }
}

function changeFormDarkMode() {
    input.forEach((e) => {
        e.classList.toggle("input_dark_mode");
        e.classList.toggle("border_dark_mode");
    });
    labelIcon.forEach((icon) => {
        icon.classList.toggle("text_ligth_color_dark_mode");
    });
}

function changeColorInsideInput() {
    if (body.classList.contains("dark_mode_body")) {
        document.documentElement.style.setProperty(
            "--input-placeholder",
            "#e6e6e6"
        );
    } else {
        document.documentElement.style.setProperty(
            "--input-placeholder",
            "#323232"
        );
    }
}

//toggle switch dark/light mode
btnDarkMode.addEventListener("click", () => {
    //style body
    body.classList.toggle("dark_mode_body");
    changeImgBackground();

    //style btn darkmode
    changeIconBtnDarkMode();

    //style border title
    titleBorder.classList.toggle("border_dark_mode");

    //style nav
    changeColorNavBurger();
    changeNavBarColorBackground();
    linkNav.forEach((element) => {
        element.classList.toggle("link_nav_dark_mode");
    });

    //style skills
    containerSkills.classList.toggle("container_skills_shadow_dark_mode");

    //style form
    changeFormDarkMode();
    changeColorInsideInput();
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
        } else if (xhr.responseText == "error last name") {
            alert("Le champ 'Nom' contient une erreur .");
        } else if (xhr.responseText == "error first name") {
            alert("Le champ 'Prénom' contient une erreur .");
        } else if (xhr.responseText == "error sujet") {
            alert("Le champ 'Sujet' contient une erreur .");
        } else if (xhr.responseText == "error email") {
            alert("Le champ 'Email' contient une erreur .");
        } else if (xhr.responseText == "error message") {
            alert("Le champ 'Message' contient une erreur .");
        } else {
            alert("Une erreur est survenue");
        }
    };
    //must be send as string format
    xhr.send(JSON.stringify(formData));
});
