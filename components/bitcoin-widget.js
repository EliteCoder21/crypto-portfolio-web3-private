import Script from "next/script";

export default function BitcoinWidget() {
    return (
        <div>
            {/* <Script defer src="https://www.livecoinwatch.com/static/lcw-widget.js" /> */}
            <div
                class="livecoinwatch-widget-6"
                lcw-coin="BTC"
                lcw-base="USD"
                lcw-secondary="BTC"
                lcw-period="d"
                lcw-color-tx="#ffffff"
                lcw-color-pr="#58c7c5"
                lcw-color-bg="#1f2434"
                lcw-border-w="1"
            >
            </div>
        </div>
    );
}