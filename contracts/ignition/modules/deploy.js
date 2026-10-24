const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Hardhat standard test account #1 as default mock oracle signer
const DEFAULT_MOCK_ORACLE = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const DEFAULT_BASE_URI = "https://ipfs.io/ipfs/{id}.json";

module.exports = buildModule("TerraProofDeployModule", (m) => {
  const oracleSigner = m.getParameter("oracleSigner", DEFAULT_MOCK_ORACLE);
  const baseUri = m.getParameter("baseUri", DEFAULT_BASE_URI);

  const terraProofRegistry = m.contract("TerraProofRegistry", [
    baseUri,
    oracleSigner,
  ]);

  return { terraProofRegistry };
});
