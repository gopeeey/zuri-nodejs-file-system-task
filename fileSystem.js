const axios = require('axios');
const fs = require('fs');

// fetches and writes the file
const fetchAndWrite = async () => {
    const result = await axios.get('http://jsonplaceholder.typicode.com/posts');
    if (result) {

        // checks if folder already exists
        if (fs.existsSync('./result')) {
            writeFile(result.data);
        } else {
            fs.mkdir('./result', (error) => {
                if (!error) {
                    writeFile(result.data);
                } else {
                    throw Error("Omooo x 1000")
                }
            })
        }
    } else {
        throw Error("Probably network problem")
    }
}

// Writes the file to post.json
const writeFile = (data) => {
    const finalObject = {};
    data.forEach(obj => {
        finalObject[obj.id] = obj
    });
    fs.writeFile('./result/posts.json', JSON.stringify(finalObject), (error) => {
        if (error) {
            throw Error("Omooooo")
        }
    })
    console.log('All done');

}

fetchAndWrite();