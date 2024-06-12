// document.addEventListener('DOMContentLoaded', () => {
//     const signUpButton = document.getElementById('signup-button');
//     const targetElement = document.getElementById('ball');
//     const parentElement = document.getElementById('container');
//     const lineElement = document.getElementById('line');


//     signUpButton.addEventListener('click', () => {
//         // Pause the animation

//         targetElement.className = "centered";
//         targetElement.style.animationPlayState = 'none';
//         lineElement.className = "nline";

//         // Get the dimensions of the parent container and the ball
//         const parentWidth = parentElement.offsetWidth;
//         const parentHeight = parentElement.offsetHeight;
//         const ballWidth = targetElement.offsetWidth;
//         const ballHeight = targetElement.offsetHeight;

//         // Calculate the position to center the ball
//         const leftPosition = (parentWidth - ballWidth) / 2;
//         const topPosition = (parentHeight - ballHeight) / 2;

//         // Set the new position of the ball
//         targetElement.style.left = `${leftPosition}px`;
//         targetElement.style.top = `${topPosition}px`;


//         targetElement.style.animationPlayState = 'paused';
//         // Print information about the target element
//         console.log(`Element resized to ${ballWidth}px by ${ballHeight}px and centered at (${leftPosition}px, ${topPosition}px)`);
//     });
// });


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
