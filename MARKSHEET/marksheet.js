// Function to check if a string contains letters and is not just empty or numbers
function isValidText(input) {
    // Check if the input is null, empty, or only whitespace
    if (!input || input.trim() === "") {
        return false;
    }
    // Check if the string contains at least one alphabetical character (a-z, A-Z)
    return /[a-zA-Z]/.test(input);
}

// Function to check if a string looks like a date (contains at least one number and a separator)
function isValidDateString(input) {
    if (!input || input.trim() === "") {
        return false;
    }
    // Simple check: Must contain at least one digit AND one common date separator
    var containsDigit = /[0-9]/.test(input);
    var containsSeparator = /[\-\/\.]/.test(input);
    
    // Allow if it contains numbers and separators OR just looks like a year (e.g., 2005)
    return containsDigit && (containsSeparator || input.trim().length >= 4);
}

// Function to collect a required text value with validation
function getValidatedText(promptMessage) {
    var input;
    while (true) {
        input = prompt(promptMessage);
        
        if (input === null) {
            // User cancelled
            return "N/A (Cancelled)";
        }
        
        if (isValidText(input)) {
            return input.trim();
        }
        
        alert("Invalid input. Please enter valid .");
    }
}

// Function to collect a required numeric value within a range
function getValidatedNumber(promptMessage, min, max) {
    var input;
    var num;
    while (true) {
        input = prompt(promptMessage);
        if (input === null) {
            // User cancelled
            return 0; 
        }
        
        num = parseInt(input);
        
        // Validation checks
        if (!isNaN(num) && num >= min && num <= max) {
            return num;
        }
        
        alert("Invalid input. Please enter a number between " + min + " and " + max + ".");
    }
}


function generateMarksheetFromPrompt() {
    
    // --- 1. Collect Personal Information with Validation ---
    
    // Roll Number (Numeric)
    var rollNum = getValidatedNumber("Enter Roll Number (e.g., 1001):", 1, 99999);
    
    // Student Name (Text)
    var studentName = getValidatedText("Enter Student Name:");
    
    // Father Name (Text)
    var fatherName = getValidatedText("Enter Father Name:");

    // Class (Validation for 9, 10, 11, 12 only)
    var className;
    var validClasses = ['9', '10', '11', '12'];
    var classInputPrompt = "Enter Class (must be 9, 10, 11, or 12):";
    
    className = prompt(classInputPrompt);
    
    while (validClasses.indexOf(className) === -1) {
        alert("Please enter a valid class: 9, 10, 11, or 12 only.");
        className = prompt(classInputPrompt);
        if (className === null) {
            className = "N/A (Cancelled)";
            break; 
        }
    }

    // District Name (Text Validation)
    var district = getValidatedText("Enter District Name:");

    // Date of Birth (Date Validation)
    var dob;
    while (true) {
        dob = prompt("Enter Date of Birth (e.g., DD-MM-YYYY):");
        
        if (dob === null || dob.trim() === "") {
             dob = "N/A (No Entry)";
             break;
        }
        
        if (isValidDateString(dob)) {
            break;
        }
        
        alert("Invalid Date of Birth format. Please enter a date using numbers and separators (e.g., 15-08-2005).");
    }
    

    // --- 2. Collect Subject Marks (Numeric Validation) ---
    var subjects = [
        "English", "Urdu", "Math", "Physics", "Chemistry", "Islamiyat"
    ];
    
    var totalMarksObtained = 0;
    var maxMarksPerSubject = 100;
    var totalMaxMarks = subjects.length * maxMarksPerSubject;
    var passingMarks = 40; 
    var subjectDataHtml = '';
    var isFailed = false;
    
    for (var i = 0; i < subjects.length; i++) {
        var subjectName = subjects[i];
        
        // Get marks using the validated number function (0-100 range)
        var marks = getValidatedNumber("Enter marks for " + subjectName + " (out of 100):", 0, 100);

        totalMarksObtained += marks;

        var isPass = marks >= passingMarks;
        if (!isPass) {
            isFailed = true;
        }
        
        var status = isPass ? '<span class="badge bg-success">PASS</span>' : '<span class="badge bg-danger">FAIL</span>';

        subjectDataHtml += 
            '<tr>' +
                '<td>' + subjectName + '</td>' +
                '<td class="text-center">' + maxMarksPerSubject + '</td>' +
                '<td class="text-center">' + marks + '</td>' +
                '<td class="text-center">' + status + '</td>' +
            '</tr>';
    }

    // --- 3. Calculate Results ---
    var percentage = ((totalMarksObtained / totalMaxMarks) * 100).toFixed(2);
    var overallResult = isFailed ? 'FAIL' : 'PASS';
    var resultColor = overallResult === 'PASS' ? 'text-success' : 'text-danger';

    // --- 4. Generate Marksheet HTML Output ---
    var outputDiv = document.getElementById('marksheetOutput');
    
    outputDiv.innerHTML = 

        '<h3 class="text-center mb-4 text-primary fw-bold">BOARD OF INTERMEDIATE AND SECONDARY EDUCATION</h3>' +
        '<p class="text-center text-muted mb-4">MARKS SHEET - ' + className + ' CLASS EXAMINATION</p>' +
        
        // Personal Info Table
        '<table class="table table-bordered table-sm mb-4">' +
            '<tbody>' +
                '<tr><th>Roll No:</th><td>' + rollNum + '</td><th>Class:</th><td>' + className + '</td></tr>' +
                '<tr><th>Student Name:</th><td>' + studentName + '</td><th>Date of Birth:</th><td>' + dob + '</td></tr>' +
                '<tr><th>Father Name:</th><td>' + fatherName + '</td><th>District:</th><td>' + district + '</td></tr>' +
            '</tbody>' +
        '</table>' +
        
        // Subject Marks Table
        '<h5 class="mt-4 mb-2 text-primary">Subject Performance Details</h5>' +
        '<table class="table table-striped table-bordered table-sm">' +
            '<thead class="table-dark">' +
                '<tr>' +
                    '<th>Subject</th>' +
                    '<th class="text-center">Max. Marks</th>' +
                    '<th class="text-center">Obtained Marks</th>' +
                    '<th class="text-center">Remarks</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody>' +
                subjectDataHtml +
            '</tbody>' +
        '</table>' +

        // Summary
        '<div class="row mt-4 p-3 bg-light border rounded">' +
            '<div class="col-md-6">' +
                '<p class="h6 mb-1">Total Max Marks: <strong class="text-dark">' + totalMaxMarks + '</strong></p>' +
                '<p class="h6 mb-1">Total Marks Obtained: <strong class="text-dark">' + totalMarksObtained + '</strong></p>' +
            '</div>' +
            '<div class="col-md-6 text-end">' +
                '<p class="h6 mb-1">Percentage: <strong class="text-primary">' + percentage + '%</strong></p>' +
                '<p class="h5">OVERALL RESULT: <strong class="' + resultColor + ' fw-bold">' + overallResult + '</strong></p>' +
            '</div>' +
        '</div>' +
        
        // --- Signature and Barcode Section (Updated with Images) ---
        '<div class="row mt-5">' +
            // Registrar/Controller
            '<div class="col-6 text-start">' +
             '<img src="sig.png" alt="Controller Signature" style="width: 150px; height: 50px; display: block; margin-left: 0px; margin-bottom: -15px;">' +
                 '<p class="mb-0 pt-2">Registrar/Controller of Examinations</p>' +
            '</div>' +
            // Principal Signature (with Image)
            '<div class="col-6 text-end">' +
                // Signature image added above the line
                '<img src="sign.jpg" alt="Principal Signature" style="width: 150px; height: 50px; display: block; margin-left: auto; margin-bottom: -15px;">' +
                '<p class="mb-0 pt-2">Principal Signature</p>' +
            '</div>' +
        '</div>' +
        
        '<div class="row mt-4">' +
            '<div class="col-12 text-center">' +
                // Barcode Image
                '<img src="qr code.png" alt="Generated Qr code" style="width: 180px; height: 100px; margin-bottom: 5px;">' +
                '<p class="mb-0 border-top pt-2">Qr code Generatder</p>'
            '</div>' +
        '</div>'
}

// Execute the function when the page loads
generateMarksheetFromPrompt();