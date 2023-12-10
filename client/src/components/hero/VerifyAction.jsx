import React, { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import OtpInput from "react-otp-input";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MuiOtpInput } from "mui-one-time-password-input";
import axios from "axios";
import Circler from "../Circler";
import { TransactionContext } from "../../context/TransactionContext";
import { shortenAddress } from "../../utils/shortenAddress";
import Loader from "../Loader";
import { initTransaction } from "../../lib/instance";
import success from "../../success.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

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
  const {
    currentAccount,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
    nfcResponse,
    setNfcResponse,
    modalLoading,
    setModalLoading,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { amount, message } = formData;

    e.preventDefault();

    // if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [otp, setOtp] = useState("");

  const handleOtpChange = (newValue) => {
    setOtp(newValue);
  };

  const startTransaction = async () => {
    setModalLoading(true);
    try {
      // add timeout
      //   const response = await axios.get("http://localhost:4000/retrieve");
      //   setNfcResponse(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleModal = (e) => {
    e.preventDefault();
    setOpen(true);
    startTransaction();
  };
  const [th, setTh] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  console.log(
    nfcResponse.encryptedPrivateKey,
    currentAccount,
    formData.amount,
    otp,
    nfcResponse.decryptIV,
    nfcResponse.decryptSalt
  );
  async function submitPin() {
    // start loading
    // start transaction
    // wait for transaction to complete
    // if wron
    setPinLoading(true);
    setSuccessful(false);
    try {
      console.log(
        nfcResponse.encryptedPrivateKey,
        currentAccount,
        formData.amount,
        otp,
        nfcResponse.decryptIV,
        nfcResponse.decryptSalt
      );
      const x = await initTransaction(
        nfcResponse.encryptedPrivateKey,
        currentAccount,
        formData.amount,
        otp,
        nfcResponse.decryptIV,
        nfcResponse.decryptSalt
      );
      setTh(x);
      setSuccessful(true);
    } catch (err) {
      setOtp("");
    } finally {
      setPinLoading(false);
    }
  }
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
        <Dropdown />

        {isLoading ? (
          <Loader />
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="text-white w-full mt-4 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
          >
            Verify now
          </button>
        )}
      </div>
    </div>
  );
};
export default VerifyAction;
