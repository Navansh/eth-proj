import { ethers } from "ethers";
import { decryptPrivateKey } from "./enc-denc";

// Initialize provider using environment variable

export async function initTransaction(
  encryptedPrivateKey = "4265732c8d6221c947d24f72d7b41f71058d4a80da0922435c14ed296f653612",
  toAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  value = "0.0000001",
  password = "234234",
  decryptSalt = "",
  decryptIV = ""
) {
  try {
    const provider = new ethers.providers.InfuraProvider(
      "sepolia",
      import.meta.env.VITE_INFURA_API_KEY
    );
    const decryptedKey = decryptPrivateKey(
      encryptedPrivateKey,
      password,
      decryptIV,
      decryptSalt
    );
    const wallet = new ethers.Wallet(decryptedKey, provider);

    // Parse the transaction value
    const parsedValue = ethers.utils.parseEther(value);

    // Estimate gas for the transaction
    const estimatedGas = await wallet.estimateGas({
      to: toAddress,
      value: parsedValue,
    });

    // Construct the transaction object
    const tx = {
      to: toAddress,
      value: parsedValue,
      gasLimit: (estimatedGas * BigInt(110)) / BigInt(100), // Adjusted to 110% of the estimated gas
    };

    // Send transaction
    const signedTx = await wallet.sendTransaction(tx);
    console.log("Transaction hash:", signedTx.hash);
    await signedTx.wait(); // Wait for transaction confirmation
    console.log("Transaction confirmed");

    // Push Protocol integration for notification
  } catch (err) {
    console.error("Error:", err.message);
  }
}
