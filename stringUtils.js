// Function to capitalize first letter of string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to reverse a string
function reverseString(str) {
    return str.split("").reverse().join("");
}

// Function to count vowels in a string
function countVowels(str) {
    let count = 0;
    str = str.toLowerCase();

    for (let ch of str) {
        if (ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u') {
            count++;
        }
    }
    return count;
}

// Export functions
module.exports = {
    capitalize,
    reverseString,
    countVowels
};