Scan 2 Braille by Kampilation

 HTML code that captures an image using the mobile camera, performs OCR with Tesseract.js, and converts the extracted text to braille characters. The braille conversion is done using a basic character-to-braille mapping.

 1. Image Capture: The <input> element is used to allow users to capture an image from their camera or upload one from their gallery.
 2. Tesseract.js Integration: The script tag includes Tesseract.js to perform OCR on the uploaded image.
 3. Processing the Image: When an image is uploaded, the JavaScript code triggers Tesseract.js to recognize the text within the image.
    - Once OCR is complete, the extracted text is displayed in the outputText div.
    - The text is then passed through the textToBraille() function, which converts it to braille characters using a basic character-to-braille mapping.
 4. Braille Mapping: The brailleMap object contains the mapping from regular characters to braille Unicode symbols. The textToBraille() function performs the conversion by mapping each character in the extracted text to its corresponding braille symbol.
 5. Loading Message: A simple loading message (loadingMessage div) is shown while Tesseract.js processes the image.

Output:
Extracted Text: Displays the text extracted from the image.
Braille Conversion: Displays the Braille equivalent of the extracted text using Unicode braille characters.

Feel free to reuse the code for your custom development and in your projects.

You can see a live demo at: https://kampilation.github.io/Snap2Braille/snap2braille.html
