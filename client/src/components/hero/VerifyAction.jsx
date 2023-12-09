import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../../context/TransactionContext";
import { shortenAddress } from "../../utils/shortenAddress";
import Loader from "../Loader";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    min={0}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-md py-2 px-4 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const VerifyAction = () => {
  const { currentAccount, handleChange, sendTransaction, formData, isLoading } =
    useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { amount, message } = formData;

    e.preventDefault();

    // if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 lg:bottom-8 relative">
      <div className="p-3 px-5 flex justify-end items-start flex-col rounded-xl h-40 sm:w-96 w-full my-5 eth-card .white-glassmorphism ">
        <div className="flex justify-between flex-col w-full h-full">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
              <SiEthereum fontSize={21} color="#fff" />
            </div>
            <BsInfoCircle
              fontSize={17}
              color="#fff"
              className="relative top-2"
            />
          </div>
          <div>
            <p className="text-white font-light text-sm">
              {shortenAddress(currentAccount)}
            </p>
            <p className="text-white font-semibold text-lg mt-1">Ethereum</p>
          </div>
        </div>
      </div>
      <div className="p-4 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
        <Input
          placeholder="Amount (ETH)"
          name="amount"
          type="number"
          handleChange={handleChange}
        />
        <Input
          placeholder="Enter Message"
          name="message"
          type="text"
          handleChange={handleChange}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
          >
            Receive now
          </button>
        )}
      </div>
    </div>
  );
};
export default VerifyAction;
