import { Web3 } from 'web3';
import { create } from '@web3-storage/w3up-client'
import ABI from './contract/ABI.json' assert { type: 'json' };

const client = await create();

// Connect to the Ethereum network using the HTTP provider
const alchemyUrl = 'https://eth-sepolia.g.alchemy.com/v2/Ioj1JKDvtfh88uXXpjw_gQijIRxiI35z';
const httpProvider = new Web3.providers.HttpProvider(alchemyUrl);
const web3 = new Web3(httpProvider);

const ADDRESS = '0xD7fe0f852EAF3781CF005786b975E3cb3700F7cF';

const PRIVATE_KEY = '0x13ecc10453330f2dc5a4a3fd8104e925df4bc0f435df572c01e37db54b856d9a';

const CONTRACT_ADDRESS = '0x16399Fd6e49acd39a1D1fAaA229044DF48Fe5a04';


const account = web3.eth.accounts.wallet.add(PRIVATE_KEY).get(0);

//instantiate the contract
const myContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
console.log(await web3.eth.getBalance(ADDRESS));
//interact with the contract
const txReceipt = await myContract.methods.getProject().call();

console.log('Transaction receipt:', txReceipt);
