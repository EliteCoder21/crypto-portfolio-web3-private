import Script from "next/script";

export default function EthereumWidget() {
    return (
        <div>
            {/* <Script defer src="https://www.livecoinwatch.com/static/lcw-widget.js" /> */}
            <div
                class="livecoinwatch-widget-6"
                lcw-coin="ETH"
                lcw-base="USD"
                lcw-secondary="ETH"
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