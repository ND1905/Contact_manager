const scriptTag = document.querySelector('script[data-token]');
const token = scriptTag.getAttribute('data-token');

document.querySelector('#auth').addEventListener("click", async function () {
    console.log("got here:"+token);
    const response = await fetch('current', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const user = await response.json();
        populateUserInfo(user);
    } else {
        console.error('Error fetching user data:', response.statusText);
    }
})

function populateUserInfo(user) {
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = `
            <div class="cur">
                <h2>Current User Info:</h2>
                <h3>Username: </h3><p>${user.username}</p>
                <h3>Email: </h3><p>${user.email}</p>
            </div>
        `;
}

// fetchUser();