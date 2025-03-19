function generate() {
    // Adds letters/numbers/special characters to blank dictionary depending on
    // user input
    let dictionary = '';
    if (document.getElementById('lowercaseCb').checked) {
        dictionary += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (document.getElementById('uppercaseCb').checked) {
        dictionary += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (document.getElementById('digitsCb').checked) {
        dictionary += '1234567890';
    }
    if (document.getElementById('specialsCb').checked) {
        dictionary += '~!@#$%^&*()_+{}|:"<>?';
    }
    // Changes slider value depending on user input
    const length = document.querySelector('input[type="range"]').value;

    if (length < 1 || dictionary.length === 0) {
        return;
    }

    // Generates random password of selected length
    let password = '';
    for (let i = 0; i < length; i++) {
        const pos = Math.floor(Math.random() * dictionary.length);
        password += dictionary[pos];
    }
    
    // Animations for 'Generate' button
    document.querySelector('input[type="text"]').value = password;
    const generateButton = document.querySelector('button.generate');
    generateButton.classList.add('animate');
    generateButton.addEventListener('animationend', () => {
        generateButton.classList.remove('animate');
    }, { once: true });
}

// Adds generated password when user clicks
[...document.querySelectorAll('input[type="checkbox"], button.generate')].forEach(elem => {
    elem.addEventListener('click', generate);
});

document.querySelector('input[type="range"]').addEventListener('input', function () {
    // Update the span element inside div.range to display the current range value
    document.querySelector('div.range span').innerHTML = this.value;
    generate();
});

// Listen for clicks on the copy button inside div.password
document.querySelector('div.password button').addEventListener('click', function () {
    const pass = document.querySelector('input[type="text"]').value;
    // Copies the password to the clipboard
    navigator.clipboard.writeText(pass).then(() => {
        document.querySelector('div.password button').innerHTML = 'copied!';
        // Reset button text back to 'copy' after 150ms
        setTimeout(() => {
            document.querySelector('div.password button').innerHTML = 'copy';
        }, 150);
    });
});

generate();
