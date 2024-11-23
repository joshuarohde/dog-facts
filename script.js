// Play the dog bark sound effect on any click
document.addEventListener('click', () => {
    // Create a new audio object for the bark sound
    const dogBark = new Audio('assets/dog-bark.mp3');
    // Play the bark sound
    dogBark.play();
});

// Change the video source based on the screen size
function updateVideoSource() {
    // Get the video and source elements
    const video = document.getElementById('backgroundVideo');
    const source = video.querySelector('source');

    // Check the window width and update the video source
    if (window.innerWidth > 590) {
        source.src = 'assets/dog.mp4'; // Desktop version of the video
    } else {
        source.src = 'assets/dog-mob.mp4'; // Mobile version of the video
    }
    // Reload the video to apply the new source
    video.load();
}

// Run the video update function when the page is resized
window.addEventListener('resize', updateVideoSource);
// Run the function immediately when the page loads
updateVideoSource();

// Fetch and display a random dog fact and image
async function fetchDogData() {
    // API URLs for dog facts and images
    const factUrl = 'https://dog-api.kinduff.com/api/facts';
    const imgUrl = 'https://dog.ceo/api/breeds/image/random';

    // Get the elements where the fact and image will be displayed
    const dogFactElement = document.getElementById('dog-fact');
    const imgElement = document.getElementById('img');

    try {
        // Fetch the dog fact and image at the same time
        const [factResponse, imgResponse] = await Promise.all([
            fetch(factUrl),
            fetch(imgUrl)
        ]);

        // Check if the API requests were successful
        if (!factResponse.ok || !imgResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        // Parse the JSON data from the APIs
        const factData = await factResponse.json();
        const imgData = await imgResponse.json();

        // Display the dog fact
        dogFactElement.textContent = factData.facts[0];
        // Display the dog image
        imgElement.innerHTML = `<img src="${imgData.message}" alt="Cute Dog" style="max-width: 100%; border-radius: 10px;">`;
    } catch (error) {
        // Show error messages if the APIs fail
        dogFactElement.textContent = 'Failed to load a dog fact. Please try again later.';
        imgElement.innerHTML = `<p style="color: red;">Failed to load a dog image.</p>`;
        // Log the error for debugging
        console.error(error);
    }
}

// Toggle between the video section and the fact section
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the main elements
    const doggyDiv = document.getElementById('doggy'); // Video section
    const factSection = document.getElementById('fact-section'); // Fact section
    const backButton = document.getElementById('back-button'); // Back button

    // Predefined list of background colors
    const colors = ['#F15757', '#F18557', '#F1D757', '#70F157', '#57F1E9', '#5761F1', '#D457F1'];

    // Function to change the background color to a random one
    const changeBackgroundColor = () => {
        // Pick a random color from the list
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        // Apply the color to the body background
        document.body.style.backgroundColor = randomColor;
    };

    // When the video section is clicked, show the fact section
    doggyDiv.addEventListener('click', () => {
        changeBackgroundColor(); // Change the background color
        doggyDiv.style.display = 'none'; // Hide the video section
        factSection.style.display = 'grid'; // Show the fact section
        fetchDogData(); // Fetch and display the dog data
    });

    // When the back button is clicked, show the video section
    backButton.addEventListener('click', () => {
        factSection.style.display = 'none'; // Hide the fact section
        doggyDiv.style.display = 'block'; // Show the video section
    });
});
