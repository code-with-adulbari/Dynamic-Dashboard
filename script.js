// Filename: contactAlert.js

// Define the contact information
const github = "https://github.com/code-with-adulbari";
const email = "sunnykhank245@gmail.com";
const linkedIn = "https://www.linkedin.com/in/abdul-bari-261a1737a/";
const contactNumber = "03282813105";

// Construct the message for the alert box
const alertMessage = `
My Contact Information:

GitHub: ${github}
Email: ${email}
Linkedin: ${linkedIn}
Contact: ${contactNumber}

To open the links, please copy and paste the full URL or email address into your browser/email program.
`;

// Display the alert box
alert(alertMessage);
      // JAVASCRIPT LOGIC (Unchanged)
        document.addEventListener('DOMContentLoaded', () => {
            const marksheetBtn = document.getElementById('marksheet-btn');
            const cricketBtn = document.getElementById('cricket-btn');
            const instituteBtn = document.getElementById('institute-btn');

            const handleClick = (buttonName) => {
                // In a real application, you would use window.location.href = 'new_page.html'
                alert(`Navigating to: ${buttonName} Portal!`);
                console.log(`Button clicked: ${buttonName}`);
            };

            marksheetBtn.addEventListener('click', () => {
                handleClick('Marksheet Generator');
            });

            cricketBtn.addEventListener('click', () => {
                handleClick('Cricket Leagues');
            });

            instituteBtn.addEventListener('click', () => {
                handleClick('Institute');
            });
        });
  