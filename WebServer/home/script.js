document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("showMenu").addEventListener('click', showMenu);
    document.getElementById("pro").addEventListener('click', show);
    document.getElementById('logoutButton').addEventListener('click', logout);
    function showMenu() {
        window.location.href = "/game/";
    }

    function show() {
        window.location.href = "/profile/";
    }

    function logout() {
        window.location.href = "/logout/";
    }
    getSessionData();
});


function getSessionData() {
    fetch('/api/get_session/')
        .then(response => {
            if (!response.ok) {
                window.location.href = "/login/";
            }
            return response.json();
        })
        .then(data => {
            const userId = data.user_id;
            const token = data.token;
            const url = `https://127.0.0.1/api/tasks/${userId}/`;
            return fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const userData = JSON.parse(JSON.stringify(data));
            console.log(userData);
            document.getElementById('login').textContent =  userData.username;
            document.getElementById('pro').src = userData.photo_profile;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
