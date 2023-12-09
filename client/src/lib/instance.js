import { ethers } from "ethers";

// Initialize provider using environment variable
const provider = new ethers.InfuraProvider(
  "sepolia",
  import.meta.env.VITE_INFURA_API_KEY
);

// Decrypt function (if applicable)
function decrypt(privateKey) {
  // Implement decryption logic if necessary
  return privateKey;
}

export async function initTransaction(
  privateKey = "4265732c8d6221c947d24f72d7b41f71058d4a80da0922435c14ed296f653612",
  toAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  value = "0.0000001"
) {
  try {
    const decryptedKey = decrypt(privateKey);
    const wallet = new ethers.Wallet(decryptedKey, provider);

    // Validate input parameters
    if (!privateKey || !toAddress || !value) {
      throw new Error("Invalid input parameters");
    }

    // Validate the destination address
    if (!ethers.isAddress(toAddress)) {
      throw new Error("Invalid destination address");
    }

    // Parse the transaction value
    const parsedValue = ethers.parseEther(value);

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
