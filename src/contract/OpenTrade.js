import React, { useState } from "react";
import { ethers } from "ethers";

export function OpenTrade({contract}) {
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");

  const handleClick = async () => {
    let priceInWei = ethers.utils.parseEther(price);
    console.log(parseInt(tokenId), parseInt(priceInWei))
    const tx = await contract.openTrade(
      parseInt(tokenId), parseInt(priceInWei));
    const receipt = await tx.wait();
    receipt.status === 0 && console.log("Transaction failed");
    window.dispatchEvent(new CustomEvent("tradeCounterChanged"));
    setTokenId("");
    setPrice("");
  }

  return (
    <div className="p-4">
      <div className="form-group">
        <input className="form-control" type="text"
          onChange={e => setTokenId(e.target.value)}
          value={tokenId} placeholder="Token ID..." required />
      </div>
      <div className="form-group">
        <input className="form-control" type="text"
          onChange={e => setPrice(e.target.value)}
          value={price} placeholder="Price..." required />
      </div>
      <button className="btn btn-primary" onClick={handleClick}>
        Create
      </button>
    </div>
  );
}