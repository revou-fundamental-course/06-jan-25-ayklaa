// Replace the existing name prompt code with this
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('welcome-modal');
    const nameInput = document.getElementById('modal-name-input');
    const submitButton = document.getElementById('modal-submit');
    const userNameSpan = document.getElementById('userName');

    function setUserName() {
        const name = nameInput.value.trim();
        if (name) {
            userNameSpan.textContent = name;
            modal.style.display = 'none';
            // Optional: Save to localStorage to persist the name
            localStorage.setItem('userName', name);
        } else {
            nameInput.classList.add('shake');
            setTimeout(() => nameInput.classList.remove('shake'), 500);
        }
    }

    // Check if we already have a saved name
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        userNameSpan.textContent = savedName;
        modal.style.display = 'none';
    }

    // Submit when clicking the button
    submitButton.addEventListener('click', setUserName);

    // Submit when pressing Enter
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            setUserName();
        }
    });
});

// function to validation form
function formValidation() {
    let nameInput = document.getElementById('name-input').value;
    let dateInput = document.getElementById('tanggal').value;
    let genderInputs = document.getElementsByName('gender');
    let notesInput = document.getElementById('pesan').value;

    let gender = '';
    for (let input of genderInputs) {
        if (input.checked) {
            gender = input.value;
            break;
        }
    }

    // condition for validation form
    console.log(nameInput);
    if (!nameInput) {
        Swal.fire({
            title: 'Error!',
            text: 'Name must be filled out',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    if (!dateInput) {
        Swal.fire({
            title: 'Error!',
            text: 'Date of birth must be filled out',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }
    
    if (!gender) {
        Swal.fire({
            title: 'Error!',
            text: 'Please select your gender',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }
    
    if (!notesInput) {
        Swal.fire({
            title: 'Error!',
            text: 'Notes must be filled out',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    // get current time
    const currentTime = new Date().toLocaleString('id-ID', {
        weekday: 'short',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });

    // display result form
    const resultHtml = `
        <h3>Message Submission Result:</h3>
        <p><strong>Submission Time:</strong> ${currentTime}</p>
        <p><strong>Name:</strong> ${nameInput}</p>
        <p><strong>Date of Birth:</strong> ${dateInput}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Notes:</strong> ${notesInput}</p>
    `;
    
    document.getElementById('result-form').innerHTML = resultHtml;
    
    Swal.fire({
        title: 'Success!',
        text: 'Form submitted successfully',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

document.getElementById('submit-btn').addEventListener('click', formValidation);

let indexBanner = 0;

changeBackground();

// function to change background banner
function nextBanner() {
    indexBanner += 1;

    changeBackground();
}

// function to change background banner
function changeBackground() {
    let banner = document.getElementsByClassName('banner-img');

    if (indexBanner >= banner.length) {
        indexBanner = 0;

    }
    
    // loop for change background banner
    for (let i = 0; i < banner.length; i++) {
        banner[i].style.display = 'none';
    }

    banner[indexBanner].style.display = 'block';
}

setInterval(nextBanner, 3000);

// function to show/hide header on scroll
let lastScrollTop = 0;
let headerTimeout;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    clearTimeout(headerTimeout); // Clear existing timeout
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show header when scrolling up
    if (scrollTop < lastScrollTop) {
        header.classList.remove('hide');
    }
    
    // Set timeout to hide header after 5 seconds of no scrolling
    headerTimeout = setTimeout(() => {
        if (scrollTop > 100) { // Only hide if scrolled down more than 100px
            header.classList.add('hide');
        }
    }, 5000);
    
    lastScrollTop = scrollTop;
});

// Show header when mouse moves to top of screen
document.addEventListener('mousemove', (e) => {
    if (e.clientY <= 10) { // If mouse is within 10px of top
        header.classList.remove('hide');
        clearTimeout(headerTimeout);
        
        // Set timeout to hide header again after 5 seconds
        headerTimeout = setTimeout(() => {
            if (window.pageYOffset > 100) {
                header.classList.add('hide');
            }
        }, 5000);
    }
});