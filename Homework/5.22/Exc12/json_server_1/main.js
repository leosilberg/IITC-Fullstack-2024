const fs = require('fs');

function randomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateUsers() {
    const users = [];
    for (let i = 1; i <= 500; i++) {
        const user = {
            id: i,
            firstName: randomString(6),
            lastName: randomString(8)
        };
        users.push(user);
    }
    return users;
}

function generateBooks() {
    const books = [];
    for (let i = 1; i <= 500; i++) {
        const book = {
            id: i,
            name: `Book Title ${i}`,
            author: `Author ${randomString(5)}`,
            numPages: Math.floor(Math.random() * 901) + 100  // Random pages between 100 and 1000
        };
        books.push(book);
    }
    return books;
}

const data = {
    users: generateUsers(),
    books: generateBooks()
};

fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
    if (err) throw err;
    console.log("JSON file 'data.json' created with 500 users and 500 books.");
});
