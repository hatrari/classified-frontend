import React, { useState, useEffect } from "react";

import { OpenTrade } from "./OpenTrade";

export function Contract({contract, account}) {
  const [tokenAddress, setTokenAddress] = useState();
  const [tradeCounter, setTradeCounter] = useState();

  useEffect(() => {
    const init = async () => {
      let _tokenAddress = await contract.itemToken();
      setTokenAddress(_tokenAddress);
      let _tradeCounter = await contract.tradeCounter();
      setTradeCounter(parseInt(_tradeCounter));
    }
    init();
    window.addEventListener("tradeCounterChanged", init)
  }, [contract, account]);

  return (
    <>
    <div className="p-4">
      {tokenAddress && <div>Token Address : <b>{tokenAddress}</b></div>}
      {tradeCounter > -1 && <div>Trades : <b>{tradeCounter}</b></div>}
      <div>Account : <b>{account}</b></div>
    </div>
    <OpenTrade contract={contract} />
    </>
  );
}