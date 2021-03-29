import React, { useState, useEffect } from "react";

import { OpenTrade } from "./OpenTrade";

export function Contract({contract, account}) {
  const [classifiedAddress, setClassifiedAddress] = useState();
  const [tokenAddress, setTokenAddress] = useState();
  const [tradeCounter, setTradeCounter] = useState();

  useEffect(() => {
    const init = async () => {
      setClassifiedAddress(contract.address);
      let _tokenAddress = await contract.itemToken();
      _tokenAddress && setTokenAddress(_tokenAddress);
      let _tradeCounter = await contract.tradeCounter();
      setTradeCounter(parseInt(_tradeCounter));
    }
    init();
    window.addEventListener("tradeCounterChanged", init);
    
    return function cleanup() {
      window.removeEventListener("tradeCounterChanged");
    }
  }, [contract, account]);

  return (
    <>
    <div className="p-4">
      {classifiedAddress && <div>Classified Address : <b>{classifiedAddress}</b></div>}
      {tokenAddress && <div>Token Address : <b>{tokenAddress}</b></div>}
      {tradeCounter > -1 && <div>Trades : <b>{tradeCounter}</b></div>}
      <div>Account : <b>{account}</b></div>
    </div>
    <OpenTrade contract={contract} />
    </>
  );
}