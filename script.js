let attendees = JSON.parse(localStorage.getItem('attendees')) || [];
let eventDate = localStorage.getItem('eventDate') || 'August 10, 2023';
let launchSpot = localStorage.getItem('launchSpot') || 'Marina Bay';
const MAX_ATTENDEES = 15;
const AUTHENTICATION_PASSWORD = "let'sgetweird";

function addAttendee() {
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '') {
        alert('Please enter your name.');
        return;
    }

    if (attendees.length >= MAX_ATTENDEES) {
        alert('Sorry, signups are limited to 15 attendees.');
        return;
    }

    attendees.push({ name, message });
    updateAttendeesList();
    saveAttendees();
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
}

function updateEventDetails() {
    const password = prompt('Enter the password to update event details:');
    if (password === AUTHENTICATION_PASSWORD) {
        const newDate = prompt('Enter the new date (e.g., August 10, 2023):');
        const newLaunchSpot = prompt('Enter the new launch spot:');

        if (newDate) {
            eventDate = newDate;
            document.getElementById('event-date').textContent = eventDate;
            localStorage.setItem('eventDate', eventDate);
        }

        if (newLaunchSpot) {
            launchSpot = newLaunchSpot;
            document.getElementById('event-launch-spot').textContent = launchSpot;
            localStorage.setItem('launchSpot', launchSpot);
        }
    } else {
        alert('Incorrect password. Event details were not updated.');
    }
}


function updateAttendeesList() {
    const attendeesList = document.getElementById('attendees');
    attendeesList.innerHTML = '';

    attendees.forEach((attendee, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${attendee.name}${attendee.message ? `: ${attendee.message}` : ''}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeAttendee(index);
        listItem.appendChild(removeButton);
        attendeesList.appendChild(listItem);
    });

    document.getElementById('total-attendees').textContent = attendees.length;
}

function saveAttendees() {
    localStorage.setItem('attendees', JSON.stringify(attendees));
}

function clearAttendees() {
    const password = prompt('Enter the password to clear attendees:');
    if (password === AUTHENTICATION_PASSWORD) {
        attendees = [];
        updateAttendeesList();
        saveAttendees();
    } else {
        alert('Incorrect password. Attendees were not cleared.');
    }
}

function removeAttendee(index) {
    attendees.splice(index, 1);
    updateAttendeesList();
    saveAttendees();
}

function loadEventDetails() {
    document.getElementById('event-date').textContent = eventDate;
    document.getElementById('event-launch-spot').textContent = launchSpot;
}

loadEventDetails();
updateAttendeesList();