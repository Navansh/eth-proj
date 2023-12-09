import { useContext } from "react";
import Send from "./hero/Send";
import SendAction from "./hero/SendAction";
import Verify from "./hero/Verify";
import VerifyAction from "./hero/VerifyAction";
import { TransactionContext } from "../context/TransactionContext";

const Hero = () => {
  const { mode } = useContext(TransactionContext); // or verify

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between relative bottom-8 md:p-20 py-12 px-4">
        {mode === "receive" && (
          <>
            <Send />
            <SendAction />
          </>
        )}
        {mode === "verify" && (
          <>
            <VerifyAction />
            <Verify />
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
