const brailleMap = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓',
    'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
    'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
    'y': '⠽', 'z': '⠵', ' ': ' ', '.': '⠲', ',': '⠂', '!': '⠖', '?': '⠦', '-': '⠤',
    '0': '⠴', '1': '⠂', '2': '⠆', '3': '⠒', '4': '⠲', '5': '⠢', '6': '⠖', '7': '⠶', 
    '8': '⠦', '9': '⠔'
};

function textToBraille(text) {
    return text.split('').map(char => brailleMap[char.toLowerCase()] || char).join('');
}

function resizeImage(file, maxWidth, maxHeight, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(function(blob) {
                const imageFile = new File([blob], "resized_image.jpg", { type: 'image/jpeg' });
                callback(imageFile);
            }, 'image/jpeg', 0.8);
        }
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

document.getElementById('cameraInput').addEventListener('change', function(event) {
    const imageFile = event.target.files[0];

    if (!imageFile) {
        alert("No file selected!");
        return;
    }

    if (!imageFile.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
    }

    document.getElementById('loadingMessage').style.display = 'block';

    resizeImage(imageFile, 1000, 1000, function(resizedImageFile) {
        Tesseract.recognize(
            resizedImageFile,
            'eng',
            {
                logger: info => console.log(info)
            }
        ).then(({ data: { text } }) => {
            document.getElementById('loadingMessage').style.display = 'none';
            document.getElementById('outputText').innerText = text || 'No text detected.';

            const braille = textToBraille(text);
            document.getElementById('brailleText').innerText = braille || 'No Braille conversion.';
        }).catch(err => {
            console.error(err);
            document.getElementById('loadingMessage').style.display = 'none';
            document.getElementById('outputText').innerText = 'Error performing OCR.';
        });
    });
});
