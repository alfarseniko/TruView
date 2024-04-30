import { create } from '@web3-storage/w3up-client';
import { UploadClient } from '@web3-storage/w3up-client/client';
import * as fs from 'node:fs';
import * as readline from 'node:readline';
// import { ThirdwebProvider } from "@thirdweb-dev/react";
import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';

// create a Helia node
const helia = await createHelia()

const client = await create();

const myAccount = await client.login('alfarseniko@gmail.com');

const did = "did:key:z6Mknpxjh9xC5nLhGdd8ZXBoYLpxE2SrDUUCgbbY7taToWsb";

// Use a specific space with the provided DID
client.setCurrentSpace(did);
const TruViewSpace = client.currentSpace();

const filePath = 'candy.js';

function readFile(_path) {
    return new Promise((resolve, reject) => {
        fs.readFile(_path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Usage
readFile(filePath)
    .then(data => {
        console.log('Data:', data);
        const uploadedCID = client.uploadFile(data);
        console.log(uploadedCID);
    })
    .catch(err => {
        console.error('Error:', err);
    });



export { readFile };