
        // --- 1. CORE DATA AND SETUP ---
        const contacts = [];
        let contactCountElement = document.getElementById('contact-count');

        // --- 2. CORE INPUT/VALIDATION FUNCTIONS (Logic unchanged, uses prompts) ---
        
        // Added 'currentIndex' for editing, so it ignores the contact being edited when checking for duplicates
        function validateName(initialValue = '', currentIndex = -1) {
            let name;
            while (true) {
                name = prompt("Please enter the contact's NAME:", initialValue);
                if (name === null) return null;
                const trimmedName = name.trim();

                if (trimmedName === '' || !isNaN(trimmedName)) {
                    alert("⚠️ Please enter a **NAME**, not a number or empty text.");
                    continue;
                }
                
                const isDuplicate = contacts.some((contact, index) => 
                    index !== currentIndex && contact.name.toLowerCase() === trimmedName.toLowerCase()
                );

                if (isDuplicate) {
                    alert(`❌ The name "${trimmedName}" is already taken. Please enter a unique name.`);
                    continue;
                }

                return trimmedName;
            }
        }

        function validateNumber(initialValue = '', currentIndex = -1) {
            let number;
            while (true) {
                number = prompt("Please enter the contact NUMBER (min 10 digits):", initialValue);
                if (number === null) return null;

                const trimmedNumber = number.trim();
                const cleanNumber = trimmedNumber.replace(/[\s()-]/g, ''); 
                
                if (trimmedNumber === '' || isNaN(cleanNumber)) {
                    alert("❌ Please enter a valid **NUMBER**, not a text or empty input.");
                    continue;
                }
                
                if (cleanNumber.length < 10) {
                    alert("⚠️ The contact number must be at least 10 digits long.");
                    continue;
                }
                
                const isDuplicate = contacts.some((contact, index) => 
                    index !== currentIndex && contact.number.replace(/[\s()-]/g, '') === cleanNumber
                );

                if (isDuplicate) {
                    alert(`❌ The number "${trimmedNumber}" is already in use. Please enter a unique number.`);
                    continue;
                }

                return trimmedNumber;
            }
        }

        function validateRelation(initialValue = '') {
            let relation;
            while (true) {
                relation = prompt("Please enter the RELATION (e.g., father, friend, brother):", initialValue);
                if (relation === null) return null;
                const trimmedRelation = relation.trim();

                if (trimmedRelation === '' || !isNaN(trimmedRelation)) {
                    alert("🚨 Please enter a NAME of **RELATION** (text), not a number or empty input.");
                    continue;
                }
                return trimmedRelation;
            }
        }

        // --- 3. CREATE, EDIT, REMOVE FUNCTIONS (Unchanged) ---
        function getContactDetails() {
            const name = validateName();
            if (name === null) return; 
            const number = validateNumber();
            if (number === null) return; 
            const relation = validateRelation();
            if (relation === null) return; 

            const newContact = { name, number, relation };
            contacts.push(newContact);
            displayAllContacts();

            alert(`✅ Contact for ${name} created successfully!`);
        }

        function editContact(index) {
            const contactToEdit = contacts[index];

            const newName = validateName(contactToEdit.name, index);
            if (newName === null) return; 
            const newNumber = validateNumber(contactToEdit.number, index);
            if (newNumber === null) return; 
            const newRelation = validateRelation(contactToEdit.relation);
            if (newRelation === null) return; 

            contactToEdit.name = newName;
            contactToEdit.number = newNumber;
            contactToEdit.relation = newRelation;

            displayAllContacts();
            alert(`📝 Contact for ${newName} updated successfully!`);
        }

        function removeContact(index) {
            const contactToRemove = contacts[index];

            if (confirm(`Are you sure you want to remove contact: ${contactToRemove.name}?`)) {
                contacts.splice(index, 1);
                displayAllContacts();
                alert(`🗑️ Contact for ${contactToRemove.name} has been removed.`);
            }
        }


        // --- 4. DISPLAY ALL CONTACTS (REDRAW) FUNCTION (MODIFIED FOR RESPONSIVENESS) ---
        function displayAllContacts() {
            const ul = document.getElementById('contact-ul');
            
            contactCountElement.textContent = contacts.length;
            ul.innerHTML = ''; 

            if (contacts.length === 0) {
                 ul.innerHTML = '<li id="empty-message" class="list-group-item text-muted text-center">No contacts added yet. Click \'Create New Contact\' to begin.</li>';
                 return;
            }

            contacts.forEach((contact, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center p-2';

                // Uses custom CSS classes that adjust column widths based on screen size (sm, md, lg)
                li.innerHTML = `
                    <div class="contact-row">
                        <div class="text-start">
                            <h5 class="mb-0">${contact.name}</h5>
                        </div>
                        <div class="text-start">
                            <small class="text-muted">${contact.relation}</small>
                        </div>
                        <div class="text-start">
                            <span class="text-primary fw-bold">${contact.number}</span>
                        </div>
                        <div class="contact-actions">
                            <button class="btn btn-sm btn-info" onclick="editContact(${index})">
                                <i class="bi bi-pencil-square"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="removeContact(${index})">
                                <i class="bi bi-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                `;

                ul.appendChild(li);
            });
        }
        
        displayAllContacts();