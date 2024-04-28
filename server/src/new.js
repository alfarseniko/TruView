//the new contract

import { Web3 } from 'web3';
import { create } from '@web3-storage/w3up-client'
import newABI from './contract/newABI.json' assert { type: 'json' };
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

const client = await create();

// Connect to the Ethereum network using the HTTP provider
const alchemyUrl = 'https://eth-sepolia.g.alchemy.com/v2/Ioj1JKDvtfh88uXXpjw_gQijIRxiI35z';
const httpProvider = new Web3.providers.HttpProvider(alchemyUrl);
const web3 = new Web3(httpProvider);

const ADDRESS = '0xD7fe0f852EAF3781CF005786b975E3cb3700F7cF';

const PRIVATE_KEY = '0x13ecc10453330f2dc5a4a3fd8104e925df4bc0f435df572c01e37db54b856d9a';

const CONTRACT_ADDRESS = '0xbA5091366a376327c54064A99ec83253FaEF9726';


const account = web3.eth.accounts.wallet.add(PRIVATE_KEY).get(0);

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

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
