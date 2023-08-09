// Retrieve the token from the data-token attribute
const scriptTag = document.querySelector('script[data-token]');
const token = scriptTag.getAttribute('data-token');
console.log("ok:"+token);
// Create Contact
const createContactForm = document.getElementById('createContactForm');
createContactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    try {
        const response = await fetch('/api/contacts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone })
        });

        if (response.ok) {
            console.log('Contact created successfully');
            // Update UI as needed
        } else {
            console.error('Error creating contact:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

// Read Contact
const readContactForm = document.getElementById('readContactForm');
const readResult = document.getElementById('readResult');
readContactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const contactId = document.getElementById('contactIdRead').value;

    try {
        const response = await fetch(`/api/contacts/${contactId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const contact = await response.json();
            readResult.innerHTML = `<p>Name: ${contact.name}</p><p>Email: ${contact.email}</p>`;
        } else {
            readResult.innerHTML = 'Contact not found';
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

// Read All Contacts
const readAllContactsButton = document.getElementById('readAllContacts');
const readAllResult = document.getElementById('readAllResult');
readAllContactsButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/contacts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const contacts = await response.json();
            let html = '<ul>';
            contacts.forEach(contact => {
                html += `<li>Name: ${contact._id}</li> <li>Name: ${contact.name}</li> <li>Email: ${contact.email}</li>`;
            });
            html += '</ul>';
            readAllResult.innerHTML = html;
        } else {
            console.error('Error fetching contacts:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

// Update Contact
const updateContactForm = document.getElementById('updateContactForm');
updateContactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const contactId = document.getElementById('contactIdUpdate').value;
    const newName = document.getElementById('newName').value;
    const newEmail = document.getElementById('newEmail').value;

    try {
        const response = await fetch(`/api/contacts/${contactId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName, email: newEmail })
        });

        if (response.ok) {
            console.log('Contact updated successfully');
            // Update UI as needed
        } else {
            console.error('Error updating contact:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

// Delete Contact
const deleteContactForm = document.getElementById('deleteContactForm');
deleteContactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const contactId = document.getElementById('contactIdDelete').value;

    try {
        const response = await fetch(`/api/contacts/${contactId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log('Contact deleted successfully');
            // Update UI as needed
        } else {
            console.error('Error deleting contact:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
