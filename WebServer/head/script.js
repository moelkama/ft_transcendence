document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');

            sections.forEach(section => {
                if (section.id === targetId) {
                    section.style.display = 'flex';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    // Show the home section by default
    document.getElementById('home').style.display = 'flex';
    document.getElementById('chat').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
});
