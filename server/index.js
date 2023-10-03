// Deps
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Web3 = require('web3');
require('dotenv').config({ path: '../.env'})



// Globals
const app = express()
const port = 3001
const router = express.Router()
const controller = express.Router()
const WEB3_PROVIDER = process.env.WEB3_PROVIDER
const ContractAddress = process.env.CONTRACT_ADDRESS
console.log(WEB3_PROVIDER)
const web3 = new Web3(Web3.givenProvider || WEB3_PROVIDER);
var Contract = require('web3-eth-contract');
const {ABI} = require('./abi')
Contract.setProvider(WEB3_PROVIDER);
let contract = new web3.eth.Contract(ABI, ContractAddress)

// Config
app.set('query parser', true);

/////////////////////////////////////////////////////////////////////
// Middleware 
/////////////////////////////////////////////////////////////////////

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

///////////////////////////////////k//////////////////////////////////
// Routers 
/////////////////////////////////////////////////////////////////////

app.use('/', router)

/////////////////////////////////////////////////////////////////////
// controllers
/////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  // /ping (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/ping').get(async (req, res) => {
          res.send("pong")
      })

  /////////////////////////////////////////////////////////////////////
  // /nodes (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/nodes').get(async (req, res) => {
            const buyer = await contract.methods.buyer().call().catch(err => console.log(err))
            const seller = await contract.methods.seller().call().catch(err => console.log(err))
            const distributor = await contract.methods.distributor().call().catch(err => console.log(err))
            res.send({buyer: buyer, seller: seller, distributor: distributor})
      })


  /////////////////////////////////////////////////////////////////////
  // /confirmBuyer (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/confirmBuyer').get(async (req, res) => {
            const r = await contract.methods.confirmBuyer().send(req.query).catch(err => console.log(err))
            res.send(r)
      })

  /////////////////////////////////////////////////////////////////////
  // /confirmSeller (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/confirmSeller').get(async (req, res) => {
            const r = await contract.methods.confirmSeller().send(req.query).catch(err => console.log(err))
            res.send(r)
      })

  /////////////////////////////////////////////////////////////////////
  // /confirmDistributor (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/confirmDistributor').get(async (req, res) => {
            const r = await contract.methods.confirmDistributor().send(req.query).catch(err => console.log(err))
            res.send(r)
      })
  /////////////////////////////////////////////////////////////////////
  // /confirmTransfer (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/confirmTransfer').get(async (req, res) => {
            const r = await contract.methods.confirmTransfer().send(req.query).catch(err => console.log(err))
            res.send(r)
      })
  /////////////////////////////////////////////////////////////////////
  // /deposit (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/deposit').get(async (req, res) => {
            const r = await contract.methods.deposit().send(req.query).catch(err => console.log(err))
            console.log(r)
            res.send(r)
      })
  /////////////////////////////////////////////////////////////////////
  // /setDistributor (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/setDistributor').post(async (req, res) => {
            const r = await contract.methods.setDistributor(req.body.params).send(req.query).catch(err => console.log(err))
            res.send(r)
      })
  /////////////////////////////////////////////////////////////////////
  // /setItemValue (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/setItemValue').post(async (req, res) => {
            const r = await contract.methods.setItemValue(req.body.params).send(req.query).catch(err => console.log(err))
            res.send(r)
      })
  /////////////////////////////////////////////////////////////////////
  // /setRewardValue (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/setRewardValue').post(async (req, res) => {
            const r = await contract.methods.setRewardValue(req.body.params).send(req.query).catch(err => console.log(err))
            res.send(r)
      })
  /////////////////////////////////////////////////////////////////////
  // /setStakeValue (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/setStakeValue').post(async (req, res) => {
            const r = await contract.methods.setStakeValue(req.body.params).send(req.query).catch(err => console.log(err))
            res.send(r)
      })
  /////////////////////////////////////////////////////////////////////
  // /setTransferState (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/setTransferState').post(async (req, res) => {
            const r = await contract.methods.setTransferState(req.body.params).send(req.query).catch(err => console.log(err))
            res.send(r)
      })
  /////////////////////////////////////////////////////////////////////
  // /setValid (send)
  /////////////////////////////////////////////////////////////////////
      router.route('/setValid').get(async (req, res) => {
            var valid = false
            if(req.query.valid === "true") valid = true
            const r = await contract.methods.setValid(valid).send({from: req.query.from}).catch(err => console.log(err))
            res.send(r)
      })
  /////////////////////////////////////////////////////////////////////
  // /getTokens (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/getTokens').get(async (req, res) => {
            const r = await contract.methods.getBalance().call({from: req.query.from}).catch(err => console.log(err))
            res.send({status: "success", result: {address: req.query.from, tokens: r}})
      })
  /////////////////////////////////////////////////////////////////////
  // /getBalance (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/getBalance').get(async (req, res) => {
            const r = await web3.eth.getBalance(req.query.address).catch(err => console.log(err))
            const ether = await web3.utils.fromWei(r, 'ether')
            res.send({status: "success", result: {address: req.query.from, balance: ether}})
      })
  /////////////////////////////////////////////////////////////////////
  // /getBalanceOf (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/getBalanceOf').get(async (req, res) => {
            const r = await contract.methods.getBalanceOf(req.query.from).call().catch(err => console.log(err))
            res.send({status: "success", result: {address: req.query.from, balance: r}})
      })
  /////////////////////////////////////////////////////////////////////
  // /getCustodian (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/getCustodian').get(async (req, res) => {
            const r = await contract.methods.getCustodian().call({from: req.query.from}).catch(err => console.log(err))
            res.send({status: "success", result: {custodian: r}})
      })
  /////////////////////////////////////////////////////////////////////
  // /getDistributor (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/getDistributor').get(async (req, res) => {
            const r = await contract.methods.getDistributor().call({from: req.query.from}).catch(err => console.log(err))
            res.send({status: "success", result: {distributor: r}})
      })
  /////////////////////////////////////////////////////////////////////
  // /getItemValue (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/getItemValue').get(async (req, res) => {
            const r = await contract.methods.getItemValue().call({from: req.query.from}).catch(err => console.log(err))
            res.send({status: "success", result: {itemValue: r}})
      })
  /////////////////////////////////////////////////////////////////////
  // /getRewardValue (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/getRewardValue').get(async (req, res) => {
            const r = await contract.methods.getRewardValue().call({from: req.query.from}).catch(err => console.log(err))
            res.send({status: "success", result: {rewardValue: r}})
      })
  /////////////////////////////////////////////////////////////////////
  // /getStakeValue (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/getStakeValue').get(async (req, res) => {
            const r = await contract.methods.getStakeValue().call({from: req.query.from}).catch(err => console.log(err))
            res.send({status: "success", result: {stakeValue: r}})
      })
  /////////////////////////////////////////////////////////////////////
  // /getTransferState (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/getTransferState').get(async (req, res) => {
            const r = await contract.methods.getTransferState().call({from: req.query.from}).catch(err => console.log(err))
            res.send({status: "success", result: {transferState: r}})
      })
  /////////////////////////////////////////////////////////////////////
  // /getValid (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/getValid').get(async (req, res) => {
            const r = await contract.methods.getValid().call().catch(err => console.log(err))
            res.send({status: "success", result: r})
      })
  /////////////////////////////////////////////////////////////////////
  // /getValues (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/getValues').get(async (req, res) => {
            const rv = await contract.methods.getRewardValue().call().catch(err => console.log(err))
            const iv = await contract.methods.getItemValue().call().catch(err => console.log(err))
            const sv = await contract.methods.getStakeValue().call().catch(err => console.log(err))
            res.send({status: "success", result: {rv: rv, iv: iv, sv: sv}})
      })

  /////////////////////////////////////////////////////////////////////
  // /start (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/start').get(async (req, res) => {
            const r = await contract.methods.start().send({from: req.query.from}).catch(err => console.log(err))
            res.send({status: "success", result: r})
      })
  /////////////////////////////////////////////////////////////////////
  // /initTransfer (call)
  /////////////////////////////////////////////////////////////////////
      router.route('/initTransfer').get(async (req, res) => {
            const r = await contract.methods.initTransfer().send({from: req.query.from}).catch(err => console.log(err))
            res.send({status: "success", result: r})
      })
//////////////////////////////////////////////////////////////////////
// Express server listener
//////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

//////////////////////////////////////////////////////////////////////
// WebSockets
//////////////////////////////////////////////////////////////////////

// const wss = new WebSocketServer({ port:3003 });
// const clients = {}

// const getUniqueID = () => {
//     const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
//     return s4() + s4() + '-' + s4();
//   };

// const sendMessage = (json) => {
//     // We are sending the current data to all connected clients
//     Object.keys(clients).map((client) => {
//       clients[client].send(json);
//     });
//   }

// wss.on('connection', connection)

// function connection(ws){
//     let userID = getUniqueID()
//     ws.on('message', message)
//     clients[userID] = ws

// }

// function message(data){
//     console.log("received: " + data.toString())
//     sendMessage("copy that")
// }

