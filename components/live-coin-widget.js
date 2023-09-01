import { useEffect } from 'react';

const LiveCoinWatchWidget = ({coin}) => {
  useEffect(() => {
    // Create a script element for the LiveCoinWatch script
    const script = document.createElement('script');
    script.src = 'https://www.livecoinwatch.com/static/lcw-widget.js';
    script.defer = true;

    // Add the script to the document's head
    document.head.appendChild(script);

    // Initialize the widget when the script is loaded
    script.onload = () => {
      if (window.LiveCoinWatch) {
        window.LiveCoinWatch.init({
          lcwCoin: coin,
          lcwBase: 'USD',
          lcwSecondary: coin,
          lcwPeriod: 'd',
          lcwColorTx: '#ffffff',
          lcwColorPr: '#4b83f9',
          lcwColorBg: '#202334',
          lcwBorderW: 1,
        });
      }
    };

    return () => {
      // Remove the script when the component unmounts
      script.remove();
    };
  }, []);

  return <div class="livecoinwatch-widget-1" lcw-coin={coin} lcw-base="USD" lcw-secondary={coin} lcw-period="d" lcw-color-tx="#ffffff" lcw-color-pr="#4b83f9" lcw-color-bg="#202334" lcw-border-w="1" ></div>;
};

export default LiveCoinWatchWidget;
