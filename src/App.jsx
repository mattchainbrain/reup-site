
import React, { useEffect, useState } from "react";

export default function ReupLanding() {
  const [price, setPrice] = useState(null);
  const [supply, setSupply] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const res = await fetch("https://public-api.solscan.io/token/2geeJjsesr4ktB6VNmA1K4enjsvnJxNtmkCqihfxmdDi", {
          headers: {
            accept: "application/json"
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Unexpected content type");
        }

        const data = await res.json();

        const priceData = data?.data?.market_data?.price_usd ?? "n/a";
        const supplyData = data?.data?.token_info?.supply ?? "n/a";

        setPrice(priceData);
        setSupply(supplyData);
      } catch (err) {
        console.error("Error fetching token data", err);
        setError("Failed to load token data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTokenData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-900 via-black to-amber-900 text-white p-8 font-mono animate-pulse">
      <div className="max-w-5xl mx-auto text-center">
        <img src="/logo.png" alt="REUP logo" className="mx-auto w-48 mb-8 drop-shadow-[0_0_25px_gold] animate-bounce" />
        <h1 className="text-6xl font-extrabold mb-4 uppercase tracking-widest neon-text">REUP</h1>
        <p className="text-xl mb-10 italic text-fuchsia-300 bg-black bg-opacity-20 p-4 rounded-xl">
          🚨 Pump.fun is back — and so are we. After the X ban, REUP rose like a phoenix on acid. Unstoppable. Unhinged. Undeniably degen.
        </p>
        {loading ? (
          <p className="text-yellow-400 text-2xl animate-pulse">Fetching chaos metrics...</p>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 text-xl font-bold mb-4">{error}</p>
            <img src="/token-not-found.png" alt="Token Not Found" className="mx-auto w-64 mt-4 rounded-lg border-4 border-red-600 shadow-xl" />
          </div>
        ) : (
          <div className="space-y-4 text-xl bg-black bg-opacity-30 p-6 rounded-2xl shadow-2xl">
            <p><span className="text-lime-400">Price (USD):</span> {price}</p>
            <p><span className="text-lime-400">Token Supply:</span> {supply}</p>
            <p><span className="text-lime-400">Mint Address:</span> <code className="break-all">2geeJjsesr4ktB6VNmA1K4enjsvnJxNtmkCqihfxmdDi</code></p>
          </div>
        )}
        <div className="mt-12">
          <a
            href="https://pump.fun/2geeJjsesr4ktB6VNmA1K4enjsvnJxNtmkCqihfxmdDi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-lime-400 text-black px-8 py-4 rounded-full font-extrabold text-xl shadow-black shadow-lg hover:scale-110 hover:rotate-1 transition-transform duration-300"
          >
            🧨 BUY ON PUMP.FUN 🧨
          </a>
        </div>
        <div className="mt-20 animate-pulse text-sm opacity-70">
          <p>Warning: REUP may cause irrational optimism, extreme gains, and unsolicited DMs. Viewer discretion is advised.</p>
        </div>
      </div>
    </div>
  );
}
