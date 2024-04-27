import { create, globSource } from 'kubo-rpc-client';
import sharp from 'sharp';

const client = create();

//UPLOADS FILE AND RETURNS CID TO BE SAVED TO SMART CONTRACT
async function uploadFile(path) {
    console.log('Starting file upload...');
    try {
        const result = await client.add(globSource(path, '/*'));
        console.log('Uploaded file CID:', result.cid.toString());
        return result.cid.toString();
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

//DOWNLOADS JPEG TO A FOLDER NAMED ASSETS IN SRC FOR USE
async function downloadFile(cid, filename, extension) {
    let fileData = []
    let file;
    try {
        const fileDataGenerator = client.get(cid);
        for await (const chunk of fileDataGenerator) {
            fileData.push(chunk);
        }
        file = Buffer.concat(fileData);
        console.log(file);
        console.log("size is ", file.length);
    } catch (error) {
        console.error('Error fetching file data:', error);
    }

    sharp(file)
        .jpeg()
        .toFile(__dirname + filename + '.' + extension)
        .then(() => {
            console.log('Image created successfully.');
        })
        .catch(error => {
            console.error('Error creating image:', error);
        });
}

uploadFile('views/error.pug');