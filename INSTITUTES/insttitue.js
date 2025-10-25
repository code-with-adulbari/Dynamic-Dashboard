// --- Global Variables ---
let instituteName = "Default Institute";
let courseName = "Default Course";
let students = []; // Array to hold student objects

// Helper function to check if a string is likely a number
function isLikelyNumeric(str) {
    if (str === null || str.trim() === '') return false; // Treat null/empty as non-numeric for validation purposes
    // Check if the string consists mostly of digits and potentially a decimal point
    // This uses a stricter check to identify numbers that shouldn't be names
    return !isNaN(parseFloat(str)) && isFinite(str);
}

// --- Initial Prompt Function ---
function getInitialInfo() {
    let institutePrompt;
    let coursePrompt;

    // 1. Get Institute Name with Validation
    do {
        institutePrompt = prompt("Enter Institute Name (e.g., SMIT, APTECH, HIAST):", instituteName);
        if (institutePrompt && isLikelyNumeric(institutePrompt)) {
            alert("❌ Please enter a **TEXT** Institute Name (e.g., SMIT, APTECH, HIAST). Numbers are not allowed here.");
            institutePrompt = null; // Re-prompt in next loop iteration
        }
    } while (institutePrompt === null); // Keep looping if user cancels (returns null) or fails validation

    if (institutePrompt) {
        instituteName = institutePrompt;
    }

    // 2. Get Course Name with Validation
    do {
        coursePrompt = prompt("Enter Course Name (e.g., WMA, DM, UI & UX):", courseName);
        if (coursePrompt && isLikelyNumeric(coursePrompt)) {
            alert("❌ Please enter a **TEXT** Course Name (e.g., WMA, UI & UX, DM). Numbers are not allowed here.");
            coursePrompt = null; // Re-prompt in next loop iteration
        }
    } while (coursePrompt === null); // Keep looping if user cancels (returns null) or fails validation

    if (coursePrompt) {
        courseName = coursePrompt;
    }

    // Update the display elements
    // Note: These IDs must exist in your HTML
    document.getElementById('instituteDisplay').textContent = instituteName;
    document.getElementById('courseDisplay').textContent = 'Course: ' + courseName;
}

// --- Student Management Functions ---

function calculateAttendance(present, absent) {
    const total = present + absent;
    if (total === 0) return 'N/A';
    const percentage = (present / total) * 100;
    return percentage.toFixed(2) + '%';
}

function addStudent() {
    const nameInput = document.getElementById('studentName');
    const presentInput = document.getElementById('presentCount');
    const absentInput = document.getElementById('absentCount');

    const name = nameInput.value.trim();
    const presentValue = presentInput.value;
    const absentValue = absentInput.value;

    const present = parseInt(presentValue);
    const absent = parseInt(absentValue);

    // 1. Validation for Student Name (Must not be a number)
    if (isLikelyNumeric(name)) {
        alert("❌ Enter a **TEXT** Student Name (e.g., ABDUL BARI, BEN STOKES). Numbers are not allowed.");
        return;
    }

    // 2. Validation for Present/Absent (Must not be text/name)
    if (isNaN(present) || isNaN(absent) || presentValue.trim() === '' || absentValue.trim() === '') {
        alert("❌ Present and Absent counts must be **NUMBERS**. Please do not enter a name or text.");
        return;
    }
    
    // 3. General Validation (Name entered and counts are non-negative)
    if (!name || present < 0 || absent < 0) {
        alert("Please enter a valid Student Name and non-negative counts.");
        return;
    }

    const newStudent = {
        id: students.length + 1,
        name: name,
        present: present,
        absent: absent
    };

    students.push(newStudent);
    renderTable();

    // Clear inputs after adding
    nameInput.value = '';
    presentInput.value = '0';
    absentInput.value = '0';
}

function renderTable() {
    const tableBody = document.getElementById('studentTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    students.forEach((student, index) => {
        const row = tableBody.insertRow();
        const attendance = calculateAttendance(student.present, student.absent);

        row.insertCell().textContent = index + 1; // #
        row.insertCell().textContent = student.name;
        row.insertCell().textContent = student.present;
        row.insertCell().textContent = student.absent;
        row.insertCell().textContent = attendance;
    });
}

// Run the initial prompts when the page loads
window.onload = getInitialInfo;