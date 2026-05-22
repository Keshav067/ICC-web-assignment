/* ===========================================
   INSYNC WEBSITE - JAVASCRIPT
   Simple beginner-friendly code with comments
   =========================================== */


/* -------------------------------------------
   1. HERO "JOIN INSYNC" BUTTON
   When user clicks the button in the hero section,
   the page smoothly scrolls down to the Join form.
   ------------------------------------------- */

// Find the button inside the hero section
const heroButton = document.querySelector(".hero button");

// When the button is clicked, run this function
heroButton.addEventListener("click", function () {

    // Find the Join section using its id
    const joinSection = document.getElementById("join");

    // Smoothly scroll to that section
    joinSection.scrollIntoView({ behavior: "smooth" });

});


/* -------------------------------------------
   2. JOIN US FORM SUBMISSION + BACKEND
------------------------------------------- */

// Find the form inside the Join section
const joinForm = document.querySelector(".join form");


// When the form is submitted
joinForm.addEventListener("submit", async function(event){

    // Stop page refresh
    event.preventDefault();


    // Find inputs
    const nameInput =
        document.querySelector(".join input[type='text']");

    const emailInput =
        document.querySelector(".join input[type='email']");


    // Get typed values
    const name = nameInput.value.trim();

    const email = emailInput.value.trim();


    // Check empty fields
    if(name === "" || email === ""){

        alert("Please fill in both fields!");

        return;
    }


    // SEND DATA TO BACKEND
    try{

        const response = await fetch(
            "http://localhost:5000/join",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    name: name,

                    email: email

                })

            }
        );


        // Convert server response into JSON
        const data = await response.json();


        // Show success message
        alert(data.message);


        // Clear form
        nameInput.value = "";

        emailInput.value = "";

    }

    catch(error){
    console.log(error);
    alert("Thanks for your interest! Form submission is currently disabled in the demo version.");
}

});
/* -------------------------------------------
   3. NAVBAR LINKS - SMOOTH SCROLL
   When user clicks a navbar link (Home, Events, etc.),
   the page smoothly scrolls to that section
   instead of jumping suddenly.
   ------------------------------------------- */

// Find all the links inside the navbar
const navLinks = document.querySelectorAll(".nav-links a");

// Loop through each link and add a click event
navLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        // Stop the default jump behaviour
        event.preventDefault();

        // Get the link's target (e.g. "#events")
        const targetId = link.getAttribute("href");

        // Find that section on the page
        const targetSection = document.querySelector(targetId);

        // Smoothly scroll to it
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }

    });

});
/* ===================================
   CLUB CALENDAR
=================================== */

const currentDate = document.querySelector(".current-date");

const daysTag = document.querySelector(".days");

const prevNextIcon = document.querySelectorAll(".icons span");


// Current date
let date = new Date();

let currYear = date.getFullYear();

let currMonth = date.getMonth();


// Month names
const months = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


// Render calendar
const renderCalendar = () => {

    // First day of month
    let firstDayofMonth =
        new Date(currYear, currMonth, 1).getDay();

    // Last date of month
    let lastDateofMonth =
        new Date(currYear, currMonth + 1, 0).getDate();

    // Last day of month
    let lastDayofMonth =
        new Date(currYear, currMonth, lastDateofMonth).getDay();

    // Last date of previous month
    let lastDateofLastMonth =
        new Date(currYear, currMonth, 0).getDate();

    let liTag = "";


    /* PREVIOUS MONTH DATES */

    for(let i = firstDayofMonth; i > 0; i--){

        liTag +=
        `<li class="inactive">
            ${lastDateofLastMonth - i + 1}
        </li>`;
    }


    /* CURRENT MONTH DATES */

    for(let i = 1; i <= lastDateofMonth; i++){

        // Highlight today's real date
        let isToday =
            i === new Date().getDate()
            && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear()
            ? "active"
            : "";


        // Event names
        let event = "";


        // MAY EVENTS
        if(i === 26 && currMonth === 4){

            event = "AIDS";
        }

        if(i === 12 && currMonth === 4){

            event = "Workshop";
        }

        if(i === 18 && currMonth === 4){

            event = "Battlegrid";
        }

        if(i === 5 && currMonth === 4){

            event = "Practice";
        }


        liTag +=
        `<li class="${isToday}">

            ${i}

            <span class="event-text">
                ${event}
            </span>

        </li>`;
    }


    /* NEXT MONTH DATES */

    for(let i = lastDayofMonth; i < 6; i++){

        liTag +=
        `<li class="inactive">
            ${i - lastDayofMonth + 1}
        </li>`;
    }


    // Show current month and year
    currentDate.innerText =
        `${months[currMonth]} ${currYear}`;


    // Add dates into calendar
    daysTag.innerHTML = liTag;
};


// Initial render
renderCalendar();


// Previous / Next buttons
prevNextIcon.forEach(icon => {

    icon.addEventListener("click", () => {

        // Move month
        currMonth =
            icon.id === "prev"
            ? currMonth - 1
            : currMonth + 1;


        // Fix year change
        if(currMonth < 0 || currMonth > 11){

            date = new Date(currYear, currMonth);

            currYear = date.getFullYear();

            currMonth = date.getMonth();
        }

        renderCalendar();
    });

});


/* CLICK EVENT */

daysTag.addEventListener("click", function(e){

    if(e.target.tagName === "LI"){

        alert(
            "INSYNC Event on " + e.target.innerText
        );
    }

});