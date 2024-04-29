//the new contract

import { Web3 } from 'web3';
// import { create } from '@web3-storage/w3up-client'
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// either this
// import newABI from './contract/newABI.json' assert { type: 'json' }
// or this
const newABI = JSON.parse(fs.readFileSync('./contract/newABI.json', 'utf8'));

const app = express();

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// const client = await create();

// Connect to the Ethereum network using the HTTP provider
const alchemyUrl = 'https://eth-sepolia.g.alchemy.com/v2/Ioj1JKDvtfh88uXXpjw_gQijIRxiI35z';
const httpProvider = new Web3.providers.HttpProvider(alchemyUrl);
const web3 = new Web3(httpProvider);

const ADDRESS = '0xD7fe0f852EAF3781CF005786b975E3cb3700F7cF';

const PRIVATE_KEY = '0x13ecc10453330f2dc5a4a3fd8104e925df4bc0f435df572c01e37db54b856d9a';

const CONTRACT_ADDRESS = '0xbA5091366a376327c54064A99ec83253FaEF9726';


const account = web3.eth.accounts.wallet.add(PRIVATE_KEY).get(0);

const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));

//instantiate the contract
const myContract = new web3.eth.Contract(newABI, CONTRACT_ADDRESS);
console.log(await web3.eth.getBalance(ADDRESS));
//interact with the contract

app.get('/api/stakeholder', async (req, res) => {
    const txReceipt0 = await myContract.methods.getStakeHolderArray().call();
    txReceipt0[0].id = 1;
    txReceipt0[1].id = 2;
    txReceipt0[2].id = 3;
    txReceipt0[3].id = 4;
    //const txArray = Object.entries(txReceipt0).map(([name, userRole, userAddress, id]) => ({ name, userRole, userAddress, id }));
    res.send(txReceipt0);
})

var formData = {
    stakeholder: "",
    blockchainAddress: "",
    documentType: "",
    message: ""
}

var ClaimData = {
    stakeholder: "",
    typeOfClaim: "",
    fidicClauses: "",
    claimTitle: "",
    details: ""
}

app.post('/api/submitForm', jsonParser, (req, res) => {
    // getting form data from frontend here
    // save it to blockchain (.send())
    formData.stakeholder = req.body.stakeholder;
    formData.blockchainAddress = req.body.blockchainAddress;
    formData.documentType = req.body.documentType;
    formData.message = req.body.message;
    console.log("Form data received:", formData);
    res.send("Form submitted successfully");
})

app.post('/api/submitClaim', jsonParser, (req, res) => {
    // getting form data from frontend here
    // save it to blockchain (.send())
    ClaimData.stakeholder = req.body.stakeholder;
    ClaimData.typeOfClaim = req.body.typeOfClaim;
    ClaimData.fidicClauses = req.body.fidicClauses;
    ClaimData.claimTitle = req.body.claimTitle;
    ClaimData.details = req.body.details;
    console.log("Form data received:", ClaimData);
    res.send("Form submitted successfully");
})

app.get('/api/getForm', (req, res) => {
    // get form data from blockchain here
    // send it to frontend (.call())
    res.send(formData);
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
