document.addEventListener('DOMContentLoaded', () => {
    // Get references to the necessary elements
    const colorPicker = document.getElementById('bgColorPicker');
    const bodyElement = document.body;

    // Function to update the background color
    function updateBackgroundColor() {
        bodyElement.style.backgroundColor = colorPicker.value;
        // Update the text content of the span
        colorValueDisplay.textContent = colorPicker.value;
    }

    // Set the initial background color when the page loads
    // to match the default value of the color picker
    updateBackgroundColor();

    // Add an event listener to the color picker
    // 'input' event triggers continuously as the color changes (live preview)
    colorPicker.addEventListener('input', updateBackgroundColor);

    // Optional: You could use the 'change' event instead, which only
    // triggers after the user closes the color picker pop-up.
    // colorPicker.addEventListener('change', updateBackgroundColor);
});
