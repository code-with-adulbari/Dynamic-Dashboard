
    function showGlobalMessage(message, type = 'info') {
        const msgElement = document.getElementById('globalMessage');
        msgElement.textContent = message;
        msgElement.className = 'text-center small mt-3'; // Reset classes
        if (type === 'success') {
            msgElement.classList.add('text-success');
        } else if (type === 'error') {
            msgElement.classList.add('text-danger');
        } else {
            msgElement.classList.add('text-primary');
        }
    }

    
    function copyToClipboard(elementId) {
        const input = document.getElementById(elementId);
        if (input) {
            input.select();
            input.setSelectionRange(0, 99999); // For mobile devices
            try {
              
                document.execCommand('copy');
                showGlobalMessage('CNIC copied to clipboard!', 'success');
            } catch (err) {
                showGlobalMessage('Failed to copy text. Please try again.', 'error');
            }
        }
    }


    // --- Validation Logic ---

    /**
     * Generic function to validate a field and update its UI state.
     * @param {string} fieldId - The ID of the input field.
     * @param {function} validator - The validation function to run.
     * @param {boolean} showVisualFeedback - Controls whether is-valid/is-invalid classes are added.
     */
    function validateField(fieldId, validator, showVisualFeedback = true) {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        const isValid = validator(input.value.trim());

        // Always check form validity to update the submit button
        checkFormValidity();

        // Update visual feedback only if requested (i.e., on blur or if field is already touched)
        if (showVisualFeedback) {
            input.classList.remove('is-valid', 'is-invalid');
            if (isValid === true) {
                errorElement.textContent = '';
                // Only add green border if the value is not empty (otherwise it's empty but 'valid')
                if (input.value.trim().length > 0) {
                     input.classList.add('is-valid');
                }
            } else {
                errorElement.textContent = isValid; // Display the error message
                input.classList.add('is-invalid');
            }
        } else {
             // If not showing visual feedback (i.e., on rapid input):
             // Clear the error text instantly if the value becomes correct.
             if (isValid === true) {
                 errorElement.textContent = '';
                 input.classList.remove('is-invalid'); // Optionally remove red instantly too
             } else {
                 // Show error text instantly if invalid
                 errorElement.textContent = isValid;
             }
        }
        
        return isValid === true; // Return boolean for form submission check
    }

    // Individual Validation Functions
    const validateName = (name) => {
        if (name.length === 0) {
            return 'Full Name is required.';
        }
        if (name.length < 5) {
            return 'Name must be at least 5 characters.';
        }
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return 'Name must contain letters and spaces only.';
        }
        return true;
    };

    const validateAge = (age) => {
        const trimmedAge = age.trim();

        if (trimmedAge.length === 0) {
            return 'Age is required.';
        }
        
        // Ensure it contains only non-negative digits (fixes negative input issue)
        if (!/^\d+$/.test(trimmedAge)) {
             return 'Age must be a whole, non-negative number.';
        }

        const numAge = parseInt(trimmedAge, 10);
        
        if (isNaN(numAge)) {
            return 'Age must be a valid number.';
        }

        if (numAge < 18) {
            return 'The system requires you to be at least 18.';
        }
        
        return true;
    };

    const validateContact = (contact) => {
        if (contact.length === 0) {
            return 'Contact Number is required.';
        }
        // Ensure it contains exactly 11 digits
        if (!/^\d{11}$/.test(contact)) {
            return 'Contact must be exactly 11 digits (numbers only).';
        }
        return true;
    };

    const validateEmail = (email) => {
        if (email.length === 0) {
            return 'Email is required.';
        }
        if (!email.endsWith('@gmail.com')) {
            return 'Email must end with @gmail.com.';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return 'Invalid email format.';
        }
        return true;
    };

    const validatePassword = (password) => {
        if (password.length === 0) {
            return 'Password is required.';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters.';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Must contain an uppercase letter.';
        }
        if (!/[a-z]/.test(password)) {
            return 'Must contain a lowercase letter.';
        }
        if (!/[0-9]/.test(password)) {
            return 'Must contain a number.';
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            return 'Must contain a special character.';
        }
        return true;
    };


    // --- Form Validity and Submission ---

    const inputFields = ['name', 'age', 'contact', 'email', 'password'];
    let validationFunctions = {
        name: validateName,
        age: validateAge,
        contact: validateContact,
        email: validateEmail,
        password: validatePassword
    };

    /**
     * Checks all fields and updates the submit button state.
     */
    function checkFormValidity() {
        const submitBtn = document.getElementById('submitBtn');
        let allValid = true;

        for (const fieldId of inputFields) {
            const input = document.getElementById(fieldId);
            // We check validity without relying on visual feedback state
            const isValid = validationFunctions[fieldId](input.value.trim()) === true; 
            if (!isValid) {
                allValid = false;
                break;
            }
        }

        if (allValid) {
            submitBtn.disabled = false;
            submitBtn.classList.add('btn-primary');
            submitBtn.classList.remove('btn-secondary'); 
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-secondary');
        }
    }
    
    /**
     * Generates a realistic-looking 13-digit CNIC number.
     * Format: XXXXX-XXXXXXX-X (5-7-1)
     */
    function generateCNIC() {
        // First 5 digits (Area/District Code - e.g., 35201)
        const areaCode = String(Math.floor(10000 + Math.random() * 89999));
        
        // Middle 7 digits (Family/Identity Number)
        const familyNumber = String(Math.floor(1000000 + Math.random() * 8999999));
        
        // Last 1 digit (Gender Code - Odd for Male, Even for Female/Trans)
        // Since the user is "Abdul Bari Khan" (implied male), we ensure an odd number (1, 3, 5, 7, 9)
        const genderCode = String(2 * Math.floor(Math.random() * 5) + 1);

        return `${areaCode}-${familyNumber}-${genderCode}`;
    }


    document.addEventListener('DOMContentLoaded', () => {
        // Set current year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        
        const form = document.getElementById('registrationForm');
        
        // Initial check to disable button
        checkFormValidity(); 
        
        inputFields.forEach(fieldId => {
            const input = document.getElementById(fieldId);
            
            // 1. Blur Listener: When the user moves out of the field, mark as touched and validate fully.
            input.addEventListener('blur', () => {
                input.setAttribute('data-touched', 'true'); // Mark as touched
                validateField(fieldId, validationFunctions[fieldId], true); 
            });
            
            // 2. Input Listener: Check validity and update button status. 
            //    If already touched, show full visual feedback instantly (green/red borders).
            //    If not touched, only update the submit button state and error text.
            input.addEventListener('input', () => {
                const hasBeenTouched = input.getAttribute('data-touched') === 'true';
                validateField(fieldId, validationFunctions[fieldId], hasBeenTouched); 
            });
        });


        // Handle form submission
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Re-validate all fields on final submission, forcing visual feedback (true)
            let formIsValid = true;
            for (const fieldId of inputFields) {
                // Ensure all fields are marked as touched before final check
                document.getElementById(fieldId).setAttribute('data-touched', 'true');
                if (!validateField(fieldId, validationFunctions[fieldId], true)) {
                    formIsValid = false;
                }
            }

            if (formIsValid) {
                const cnic = generateCNIC();
                
                // Display the CNIC
                document.getElementById('cnic').value = cnic;
                document.getElementById('cnicContainer').classList.remove('hidden');
                
                // Show success message
                showGlobalMessage('Registration successful! CNIC generated.', 'success');
                
                // Disable the form after submission
                inputFields.forEach(fieldId => {
                    document.getElementById(fieldId).disabled = true;
                });
                document.getElementById('submitBtn').disabled = true;
                document.getElementById('submitBtn').textContent = 'Registration Completed';
                document.getElementById('submitBtn').classList.replace('btn-primary', 'btn-success');


            } else {
                showGlobalMessage('Please fix the errors before submitting.', 'error');
            }
        });
    });