let nav = 0;
let clicked = null;
let events = localStorage.getItem("events")
    ? JSON.parse(localStorage.getItem("events"))
    : [];

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const animal = document.getElementById("animal");
const hora = document.getElementById("hora");
const descricao = document.getElementById("descricao");
const weekdays = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
];

function openModal(date) {
    clicked = date;

    const eventForDay = events.find((e) => e.date === clicked);

    if (eventForDay) {
        document.getElementById("eventText").innerText = eventForDay.title;
        deleteEventModal.style.display = "block";
    } else {
        newEventModal.style.display = "block";
    }

    backDrop.style.display = "block";
}

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString("pt-pt", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    document.getElementById(
        "monthDisplay"
    ).innerText = `${dt.toLocaleDateString("pt-pt", {
        month: "long",
    })} ${year}`;

    calendar.innerHTML = "";

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find((e) => e.date === dayString);

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = "currentDay";
            }

            if (eventForDay) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener("click", () => openModal(dayString));
        } else {
            daySquare.classList.add("padding");
        }

        calendar.appendChild(daySquare);
    }
}

function closeModal() {
    newEventModal.style.display = "none";
    deleteEventModal.style.display = "none";
    backDrop.style.display = "none";
    clicked = null;
    load();
}

function saveEvent() {
    if (animal.value && hora.value && descricao.value) {
        animal.classList.remove("error");
        hora.classList.remove("error");
        descricao.classList.remove("error");

        events.push({
            date: clicked,
            title: animal.value + " " + hora.value,
        });

        localStorage.setItem("events", JSON.stringify(events));
        closeModal();
    } else {
        animal.classList.add("error");
        hora.classList.add("error");
        descricao.classList.add("error");
    }
}

function deleteEvent() {
    events = events.filter((e) => e.date !== clicked);
    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
}

function initButtons() {
    document.getElementById("nextButton").addEventListener("click", () => {
        nav++;
        load();
    });

    document.getElementById("backButton").addEventListener("click", () => {
        nav--;
        load();
    });

    document.getElementById("saveButton").addEventListener("click", saveEvent);
    document.getElementById("cancelButton").addEventListener("click", closeModal);
    document.getElementById("deleteButton").addEventListener("click", deleteEvent);
    document.getElementById("closeButton").addEventListener("click", closeModal);
}

initButtons();
load();
