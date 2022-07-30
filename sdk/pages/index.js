import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import bunzz from "bunzz-sdk";
import { Contract } from "bunzz-sdk";
import env from "../env.json";

const DAPP_ID = env.DAPP_ID;
const API_KEY = env.API_KEY;

const init = async () => {
  const handler = await bunzz.initializeHandler({
    dappId: DAPP_ID,
    apiKey: API_KEY,
  });
  return handler;
};

export default function Home() {
  const [contract, setContract] = useState();
  const [value, setValue] = useState(0);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const setup = async () => {
      try {
        const handler = await init();

        const userAddress = await handler.getSignerAddress();
        const contract = await handler.getContract("Token (ERC20)");

        setUserAddress(userAddress);
        setContract(contract);
      } catch (error) {
        console.error(error);
      }
    };

    setup();
  }, []);

  const handleChange = (e) => setValue(e.target.value);

  const submit = async () => {
    await contract.mint(userAddress, value);
    alert("Hurray! Welcome to the New World! Transaction was successful!");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Juju Metaverse</title>
        <meta name="description" content="Truly African!" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>

      <div className={styles.header}>
        <h1 className={styles.h}>JujuCoin</h1>
        <input value={value} onChange={handleChange} type="text" />
        <button className={styles.button} onClick={submit}>
          Join Us
        </button>
      </div>

      <main className={styles.main}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <h1 className={styles.title}>
            Welcome to <a href="#">JujuCoin!</a>
          </h1>
        </motion.div>

        <p className={styles.description}>
          <code className={styles.code}>
            A river that forgets its source would soon dry up!
          </code>{" "}
          <em>- an African adage.</em>
        </p>

        <p className={styles.pp}>
          JujuCoin is the native and community token for the Juju Metaverse - a
          truly African Metaverse that focuses on promoting and celebrating the
          African cultures and roots.
          <br />
          <br />
          Juju Metaverse is a New World of all things African. The communities
          in this world are filled with enthusiasts from all walks of life. A
          quick glance at our roadmap will give you an idea of the world we are
          trying to create. Our desire is to transform Africa with blockchain
          technology and we invite you to join us on this journey to the future.
          Be part of something tangible, be a change today! Join us and
          together, we will make Africa <em> place of price</em>
          <br />
          <br />
          Click on <b>Join Us</b> to buy JujuCoin and become part of history!
          <br />
          <br />
          Input the amount you want to buy in the input form. The least you can
          buy is 1 JujuCoin and it will cost you 0.001 ETH (Goerli Testnet).
        </p>

        <div className={styles.grid}>
          <div className={styles.road}>Our Roadmap</div>
          <a href="#" className={styles.card}>
            <h2>Q4 2021 &rarr;</h2>
            <p>
              Idealization, Team Assembly, Whitepaper, Website, Communities and
              Social Media Presence,
            </p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Q2 2022 &rarr;</h2>
            <p>
              Tokenizaation, Security and Auditing, Initial Coin Offering (ICO),
              DEX Listing, Partnerships,
            </p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Q3 2022 &rarr;</h2>
            <p>
              NFT Minting, NFT DAO Governance, Local Partnerships, Arts & NFT
              Marketplace, African Fashion Marketplace, Communities and Social
              Charities
            </p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Q4 2022 &rarr;</h2>
            <p>
              DAO Growth and Restructuring, NGO Partnerships, Partnerships,
              African Food Produce Marketplace, More Growth Roadmap V2
            </p>
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://discordapp.com/users/#8825/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with 💖 by D. C.#8825
        </a>

        <a
          href="https://app.bunzz.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>
            <Image
              src="/favicon/bunzz.jpg"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
