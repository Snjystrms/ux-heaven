import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createAppKit } from "@reown/appkit";
import {
  base,
  baseSepolia,
  mainnet,
  arbitrum,
  solana,
  solanaDevnet,
  bsc,
  tron,
  polygon,
  bitcoin,
} from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [
  base,
  baseSepolia,
  mainnet,
  arbitrum,
  solana,
  solanaDevnet,
  bsc,
  tron,
  polygon,
  bitcoin,
];

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;

// Metadata for the app (optional)
const metadata = {
  name: "My App",
  description: "Authenticate using Email or Social accounts",
  url: "https://myapp.example.com", // Replace with your app's URL
  icon: "https://myapp.example.com/icon.png", // Replace with your app's icon URL
};

// Configure AppKit with email & socials
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum, solana], // Define active networks

  features: {
    email: true, // Enable email authentication
    socials: [
      "google",
      "x",
      "github",
      "discord",
      "apple",
      "facebook",
      "farcaster",
    ], // Enabled social platforms
    emailShowWallets: true, // Show wallets on the first connect screen
  },
  allWallets: "SHOW", // Show all wallets by default
});
