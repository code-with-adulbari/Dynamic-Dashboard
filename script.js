    document.addEventListener('DOMContentLoaded', () => {
      const marksheetBtn = document.getElementById('marksheet-btn');
      const cricketBtn = document.getElementById('cricket-btn');
      const instituteBtn = document.getElementById('institute-btn');
      const contactGenBtn = document.getElementById('contactgen-btn');
      const simpleQuizBtn = document.getElementById('simplequiz-btn');
     const cnicBtn = document.getElementById('cnic-btn');

      const handleClick = (buttonName, targetUrl) => {
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

      contactGenBtn.addEventListener('click', () => {
        handleClick('Contact Generator', 'CONTACT ASSIGNEMENT/contactassig.html');
      });
simpleQuizBtn.addEventListener('click', () => {
        handleClick('Simple Quiz', 'SIMPLE QUIZ OF HTML,CSS,JS/simple(mcqs).html');
      });
cnicBtn.addEventListener('click', () => {
        handleClick('Cnic Generater', 'CNIC GENERATER/cnic.html');
      });

      // NEW: Auto-open the contact modal on page load
      const contactModalElement = document.getElementById('contactModal');
      if (contactModalElement) {
        const contactModal = new bootstrap.Modal(contactModalElement);
        contactModal.show();
      }
    });