/**
 * It's taking a username, splitting it into an array of characters, looping through the array,
 * checking if the current character is a number, pushing the current character to a new array if it's
 * not a number, joining the new array into a string, and returning the string
 * @param username - The username of the user
 * @returns The name
 */
const generateNameFromUsername = (username) => {
    // It's splitting the username into an array of characters
    const usernameArray = username.split('');
    // It's creating a new array
    const nameArray = [];
    // It's looping through the usernameArray
    for (let i = 0; i < usernameArray.length; i++) {
        // It's checking if the current character is a number
        if (isNaN(usernameArray[i])) {
            // It's pushing the current character to the nameArray
            nameArray.push(usernameArray[i]);
        }
    }
    // It's joining the nameArray into a string
    const name = nameArray.join('');
    // It's returning the name
    return name;
}

module.exports = {
    generateNameFromUsername,
}