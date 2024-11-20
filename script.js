// Play the dog bark sound effect on any click
document.addEventListener('click', () => {
    const dogBark = new Audio('assets/dog-bark.mp3');
    dogBark.play();
});

// Handle the video source update for responsiveness
function updateVideoSource() {
    const video = document.getElementById('backgroundVideo');
    const source = video.querySelector('source');

    if (window.innerWidth > 768) {
        source.src = 'assets/dog.mp4';
    } else {
        source.src = 'assets/dog-mob.mp4';
    }
    video.load();
}

window.addEventListener('resize', updateVideoSource);
updateVideoSource();

// Handle div visibility toggle
document.addEventListener('DOMContentLoaded', () => {
    const doggyDiv = document.getElementById('doggy'); // The main doggy div
    const factSection = document.getElementById('fact-section'); // The fact section div
    const backButton = document.getElementById('back-button'); // The "GO BACK TO THE DOGGY" button

    // Array of 7 predefined colors
    const colors = ['#F15757', '#F18557', '#F1D757', '#70F157', '#57F1E9', '#5761F1', '#D457F1'];

    // Function to change the background color to a random color from the array
    function changeBackgroundColor() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    }

    // Show the fact section, hide the doggy div, and change the background color on click
    doggyDiv.addEventListener('click', () => {
        changeBackgroundColor(); // Change the background color
        doggyDiv.style.display = 'none';
        factSection.style.display = 'grid';
    });

    // Show the doggy div and hide the fact section on button click
    backButton.addEventListener('click', () => {
        factSection.style.display = 'none';
        doggyDiv.style.display = 'block';
    });
});
