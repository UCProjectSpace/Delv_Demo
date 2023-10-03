const path = require('path');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
require('dotenv').config({ path: '../.env'})
const BUYER_ADDRESS = process.env.BUYER_ADDRESS
const SELLER_ADDRESS = process.env.SELLER_ADDRESS
const DISTRIBUTOR_ADDRESS = process.env.DISTRIBUTOR_ADDRESS
const CONTRACT_NAME = process.env.CONTRACT_NAME
const CONTRACT_FILE_NAME = `${CONTRACT_NAME}.sol`
const web3 = new Web3(Web3.givenProvider || process.env.WEB3_PROVIDER);

console.log("Web3 Provider: ", process.env.WEB3_PROVIDER)
console.log("Contract Name: ", CONTRACT_NAME)
console.log("BUYER_ADDRESS: ", BUYER_ADDRESS)
console.log("SELLER_ADDRESS: ", SELLER_ADDRESS)
console.log("DISTRIBUTOR_ADDRESS: ", DISTRIBUTOR_ADDRESS)

async function Deploy(){
  /* 1. Get Ethereum Account */
  const account = SELLER_ADDRESS;

  console.log("Deploying contract with this account: ", account)
  /* 2. Compile Smart Contract */
    const contractPath = path.resolve(__dirname, 'contracts',CONTRACT_FILE_NAME);
    let source = fs.readFileSync(contractPath, 'UTF-8');

    // Inject environment variables
    source = source.replace('$BUYER_ADDRESS', BUYER_ADDRESS)
    source = source.replace('$SELLER_ADDRESS', SELLER_ADDRESS)
    source = source.replace('$DISTRIBUTOR_ADDRESS', DISTRIBUTOR_ADDRESS)

    var input = {
        language: 'Solidity',
        sources: {
          [CONTRACT_FILE_NAME]: {
            content: `${source}`
          }
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['*']
            }
          }
        }
      };
  var output = JSON.parse(solc.compile(JSON.stringify(input)));
  const contract = output.contracts[CONTRACT_FILE_NAME][CONTRACT_NAME]
  console.log("Compiled contract successfully")

  /* 2. Extract Abi And Bytecode From Contract */
  const abi = contract.abi;
  const bytecode = contract.evm.bytecode.object;
  console.log("Extracted abi and bytecode")

  /* 3. Send Smart Contract To Blockchain */
    const { _address } = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({from: account, gas: 1500000 }).catch(err => console.error("Error deploying smart contract: ", err))
    console.log("Contract address: ", _address)

    return await _address
};
Deploy()

module.exports = { Deploy }