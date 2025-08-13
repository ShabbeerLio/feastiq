import React, { useEffect, useState } from 'react';
import "./Loading.css";
import logo from "../../Assets/Logo/logo-sadaqah-app-blue.png";

const quotes = [
    'قال رسول الله ﷺ: "السَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ" (رواه الترمذي)',
    'The Messenger of Allah ﷺ said:“Sadaqah extinguishes sins just as water extinguishes fire.” (Source: Tirmidh)',
    'अल्लाह के रसूल ﷺ ने फ़रमाया:"सदक़ा गुनाहों को ऐसे बुझा देता है जैसे पानी आग को बुझा देता है।" (तिर्मिज़)',
    'ول اللہ ﷺ نے فرمایا:"صدقہ گناہوں کو ایسے بجھا دیتا ہے جیسے پانی آگ کو بجھا دیتا ہے۔"(ترمذی)'
];

const Loading = () => {
    const [randomQuote, setRandomQuote] = useState("");

    useEffect(() => {
        const index = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[index]);
    }, []);

    return (
        <div className="loading-screen">
            <img src={logo} alt="App Logo" />
            <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="loader-quote">
                <p>{randomQuote}</p>
            </div>
        </div>
    );
};

export default Loading;