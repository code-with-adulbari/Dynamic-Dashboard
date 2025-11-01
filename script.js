        // JAVASCRIPT LOGIC (Alert before navigation FIX)

        document.addEventListener('DOMContentLoaded', () => {
            const contactModalElement = document.getElementById('contactModal');
            if (contactModalElement) {
                const contactModal = new bootstrap.Modal(contactModalElement);
                contactModal.show();
            }

            const marksheetBtn = document.getElementById('marksheet-btn');
            const cricketBtn = document.getElementById('cricket-btn');
            const instituteBtn = document.getElementById('institute-btn');

            const handleClick = (buttonName, targetUrl) => {
                // Alert fires first, then navigation
                alert(`Navigating to: ${buttonName} Portal!`);
                console.log(`Button clicked: ${buttonName}`);
                document.location = targetUrl; 
            };

            marksheetBtn.addEventListener('click', () => {
                handleClick('Marksheet Generator', 'MARKSHEET/marksheet.html');
            });

            cricketBtn.addEventListener('click', () => {
                handleClick('Cricket Leagues', 'CIRCKET LEAGUES/leagues.html');
            });

            instituteBtn.addEventListener('click', () => {
                handleClick('Institute', 'INSTITUTES/insttitue.html');
            });
        });
    