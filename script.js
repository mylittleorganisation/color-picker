document.addEventListener('DOMContentLoaded', () => {
    // Get references to the necessary elements
    const colorPicker = document.getElementById('bgColorPicker');
    const bodyElement = document.body;

    /**
     * Updates the URL query string with the selected color
     * using history.replaceState to avoid page reload.
     */
    function updateQueryString() {
        const selectedColor = colorPicker.value;
        const colorWithoutHash = selectedColor.substring(1);;
        const newUrl = `${window.location.pathname}?color=${colorWithoutHash}`;
        // Replace current history entry instead of adding a new one
        history.replaceState(null, '', newUrl);
    }

    /**
     * Reads the 'color' parameter from the URL query string.
     * Returns the color value if valid, otherwise null.
     */
    function getColorFromQueryString() {
        const urlParams = new URLSearchParams(window.location.search);
        const colorParam = urlParams.get('color');
        // Basic validation: check if it looks like a hex code
        if (colorParam && /^[a-fA-F0-9]{6}$|^[a-fA-F0-9]{3}$/.test(colorParam)) {
            // It's a valid 3 or 6 digit hex string (without #)
            return '#' + colorParam; // Add '#' for internal use
        }
        return null;
    }
    
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
    
    
    // --- Initialization ---

    // 1. Determine the initial color: from URL or default
    const colorFromUrl = getColorFromQueryString();
    const initialColor = colorFromUrl || colorPicker.value; // Use URL color or picker's default

    // 2. Set the color picker to the initial color
    colorPicker.value = initialColor;

    // 3. Apply the initial color to the page visuals
    updateBackgroundColor();

    // 4. If the initial color came from the URL, ensure the query string is clean
    //    (e.g., adds '#' if missing, encodes correctly). Optional but good practice.
    if (colorFromUrl) {
        updateQueryString();
    }

    // --- Event Listener ---

    // Add an event listener to the color picker
    colorPicker.addEventListener('input', () => {
        updateBackgroundColor();      // Update background, text, text contrast
        updateQueryString(); // Update the URL query string
    });
});
