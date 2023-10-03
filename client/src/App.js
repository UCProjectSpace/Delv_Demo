import { useEffect, useState } from "react";
import AccountCard from "./components/AccountCard";
import NavBar from "./components/NavBar";
import State from "./components/State";
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

function App() {

  const baseurl = process.env.REACT_APP_BASEURL
  const BUYER_ADDRESS = process.env.REACT_APP_BUYER_ADDRESS
  const SELLER_ADDRESS = process.env.REACT_APP_SELLER_ADDRESS
  const DISTRIBUTOR_ADDRESS = process.env.REACT_APP_DISTRIBUTOR_ADDRESS
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS


  const [tp, setTp] = useState(0)
  const [valid, setValid] = useState("False")
  const [rv, setRv] = useState(0)
  const [sv, setSv] = useState(0)
  const [iv, setIv] = useState(0)
  const [contractBalance, setContractBalance] = useState(0)
  const [buyer, setBuyer] = useState(BUYER_ADDRESS)
  const [seller, setSeller] = useState(SELLER_ADDRESS)
  const [distributor, setDistributor] = useState(DISTRIBUTOR_ADDRESS)
  // const contract = "0x44b1e3C1E6d200d510a4D997E3818CE374eB10F1"
  const contract = CONTRACT_ADDRESS

  const cardContainerStyles = {
    margin: "5rem auto",
    justifyContent: "space-around",
    display: "flex", 
    alignItems: "space-between"
  }


  const [sellerBalance, setSellerBalance] = useState(0)
  const [sellerTokens, setSellerTokens] = useState(0)

  const [distributorBalance, setDistributorBalance] = useState(0)
  const [distributorTokens, setDistributorTokens] = useState(0)

  const [buyerBalance, setBuyerBalance] = useState(0)
  const [buyerTokens, setBuyerTokens] = useState(0)

  const [custodian, setCustodian] = useState(seller)

  function getNodes() {
    fetch(baseurl + "/nodes")
    .then(response => response.json())
    .then(result => {
      setBuyer(result.buyer)
      setSeller(result.seller)
      setDistributor(result.distributor)
    })
    .catch(error => console.log('error', error));
  }

  function getCustodian() {
    fetch(baseurl + "/getCustodian?from=" + seller)
    .then(response => response.json())
    .then(result => {
      setCustodian(result.result.custodian)
    })
    .catch(error => console.log('error', error));
  }

  function getBalances() {
    fetch(baseurl + "/getBalance?address=" + buyer)
    .then(response => response.json())
    .then(result => setBuyerBalance(result.result.balance))
    .catch(error => console.log('error', error));

    fetch(baseurl + "/getBalance?address=" + seller)
    .then(response => response.json())
    .then(result => setSellerBalance(result.result.balance))
    .catch(error => console.log('error', error));

    fetch(baseurl + "/getBalance?address=" + distributor)
    .then(response => response.json())
    .then(result => setDistributorBalance(result.result.balance))
    .catch(error => console.log('error', error));

    fetch(baseurl + "/getBalance?address=" + contract)
    .then(response => response.json())
    .then(result => setContractBalance(result.result.balance))
    .catch(error => console.log('error', error));
  }

  function getTokens() {
    fetch(baseurl + "/getTokens?from=" + buyer)
    .then(response => response.json())
    .then(result => setBuyerTokens(result.result.tokens))
    .catch(error => console.log('error', error));

    fetch(baseurl + "/getTokens?from=" + seller)
    .then(response => response.json())
    .then(result => setSellerTokens(result.result.tokens))
    .catch(error => console.log('error', error));

    fetch(baseurl + "/getTokens?from=" + distributor)
    .then(response => response.json())
    .then(result => setDistributorTokens(result.result.tokens))
    .catch(error => console.log('error', error));

    fetch(baseurl + "/getBalanceOf?from=" + contract)
    .then(response => response.json())
    .then(result => {
      setTp(result.result.balance)
    })
    .catch(error => console.log('error', error));
  }

  function getValid() {
    fetch(baseurl + "/getValid")
    .then(response => response.json())
    .then(result => {
      if(result.result)setValid("True")
      else setValid("False")
    })
    .catch(error => console.log('error', error));
  }

  function getValues() {
    fetch(baseurl + "/getValues")
    .then(response => response.json())
    .then(result => {
      setRv(result.result.rv)
      setIv(result.result.iv)
      setSv(result.result.sv)
    })
    .catch(error => console.log('error', error));
  }

  useEffect(() => {
    const interval = setInterval(() => {
    getNodes()
    getBalances()
    getTokens()
    getCustodian()
    getValid()
    getValues()
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   getNodes()
  //   getBalances()
  //   getTokens()
  //   getCustodian()
  // }, [])

  function confirmSeller() {
    fetch(baseurl + "/confirmSeller?from=" + seller)
    .catch(error => console.log('error', error));
  }

  function confirmBuyer() {
    fetch(baseurl + "/confirmBuyer?from=" + buyer)
    .catch(error => console.log('error', error));
  }
  
  function confirmDistributor() {
    fetch(baseurl + "/confirmDistributor?from=" + distributor)
    .catch(error => console.log('error', error));
  }

  function start() {
    fetch(baseurl + "/start?from=" + seller)
    .catch(error => console.log('error', error));
  }

  function initTransfer() {
    fetch(baseurl + "/initTransfer?from=" + distributor)
    .catch(error => console.log('error', error));
  }

  function confirmTransfer() {
    fetch(baseurl + "/confirmTransfer?from=" + buyer)
    .catch(error => console.log('error', error));
  }

  return (
  <div>
    <NavBar />
    <div style={cardContainerStyles}>
      <div>
        <AccountCard name="Seller" address={seller} balance={sellerBalance} tokens={sellerTokens} custodian={custodian} />
        <div style={{justifyContent: "center", margin: "0 auto", display: "flex"}}>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={confirmSeller}>Confirm</Button>
            <Button variant="secondary" onClick={start}>Start</Button>
          </ButtonGroup>
        </div>
      </div>
      <div>
        <AccountCard name="Distributor" address={distributor} balance={distributorBalance} tokens={distributorTokens} custodian={custodian} />
        <div style={{justifyContent: "center", margin: "0 auto", display: "flex"}}>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={confirmDistributor}>Confirm</Button>
            <Button variant="secondary" onClick={initTransfer}>Initiate Transfer</Button>
          </ButtonGroup>
        </div>
      </div>
      <div>
        <AccountCard name="Buyer" address={buyer} balance={buyerBalance} tokens={buyerTokens} custodian={custodian} />
        <div style={{justifyContent: "center", margin: "0 auto", display: "flex"}}>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={confirmBuyer}>Confirm</Button>
            <Button variant="secondary" onClick={confirmTransfer}>Confirm Transfer</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "30%"}}>
      <h1>Contract State</h1>
      <div style={{width: "60%"}}>
        <State 
          contract={contract} 
          contractBalance={contractBalance} 
          tp={tp} 
          valid={valid} 
          rv={rv} 
          sv={sv} 
          iv={iv} 
        />
      </div> 
    </div>
  </div>
  );
}

export default App;
