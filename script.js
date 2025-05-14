document.addEventListener('DOMContentLoaded', () => {
    const birthdayBtn = document.getElementById('birthdayBtn');
    const showCakeBtn = document.getElementById('showCakeBtn');
    const welcomeScreen = document.querySelector('.welcome-screen');
    const birthdayContent = document.querySelector('.birthday-content');
    const cakeContainer = document.getElementById('cakeContainer');
    const feedbackForm = document.querySelector('.feedback-form');
    const cakeVideo = document.getElementById('cakeVideo');
    const slides = document.querySelectorAll('.slide');
    const envelope = document.getElementById("envelope");
    const flap = envelope.querySelector(".flap");
    const letter = document.getElementById("letter");
    let currentSlide = 0;

    // Hide all elements initially except welcome screen
    showCakeBtn.style.display = 'none';
    cakeContainer.classList.add('hidden');
    feedbackForm.classList.add('hidden');
    letter.classList.add('hidden');
    envelope.style.display = 'none';

    // Handle birthday button click
    birthdayBtn.addEventListener('click', () => {
        welcomeScreen.style.animation = 'fadeIn 1s ease-in reverse';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            birthdayContent.classList.remove('hidden');
            // Show only the quotes first
            startSlideshow();
            // Show cake button immediately
            showCakeBtn.style.display = 'block';
            showCakeBtn.scrollIntoView({ behavior: 'smooth' });
            
            // Initial confetti
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 1000);
    });

    // Handle cake button click
    showCakeBtn.addEventListener('click', () => {
        showCakeBtn.style.display = 'none';
        cakeContainer.classList.remove('hidden');
        cakeContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Play the video
        cakeVideo.play().catch(error => {
            console.log("Video autoplay failed:", error);
        });
        
        // Show envelope immediately
        envelope.style.display = 'block';
        envelope.scrollIntoView({ behavior: 'smooth' });
        
        // Trigger confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    });

    // Handle envelope click
    envelope.addEventListener("click", () => {
        flap.style.transform = "rotateX(-180deg)";
        setTimeout(() => {
            letter.classList.remove("hidden");
            letter.scrollIntoView({ behavior: "smooth" });
            
            // Show feedback form immediately after letter
            feedbackForm.classList.remove('hidden');
            feedbackForm.scrollIntoView({ behavior: 'smooth' });
            
            // Final confetti
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });
        }, 800);
    });

    // Slideshow functionality
    function startSlideshow() {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // Add floating elements dynamically
    function createFloatingElement() {
        const elements = ['❤️', '⭐', '✨', '🎀', '🎈'];
        const element = document.createElement('div');
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.position = 'absolute';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        element.style.animation = `float ${Math.random() * 4 + 4}s infinite ease-in-out`;
        element.style.opacity = '0.7';
        
        document.querySelector('.floating-elements').appendChild(element);
        
        // Remove element after animation
        setTimeout(() => {
            element.remove();
        }, 8000);
    }

    // Create floating elements periodically
    setInterval(createFloatingElement, 2000);
});
