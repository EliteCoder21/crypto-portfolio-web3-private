import Time from "./time.js";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./webContextProvider.js";

export default function Bar() {
    const [totalSupply, setTotalSupply] = useState(0);
    /* const { OZTCoin } = useContext(AppContext); */
    const { OZTCoin } = 0;

    useEffect(() => {
        const init = async () => {
        if (OZTCoin) {
            const resTotalSupply = await OZTCoin.methods.totalSupply().call();
            setTotalSupply(resTotalSupply / 1e18);
        }
        };
        init();
    }, [OZTCoin]);

    var currentdate = new Date();
    var min = currentdate.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var datetime =
        "as of " +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getDate() +
        "/" +
        currentdate.getFullYear() +
        " at ";
        
    return (
        <>
            <div
                align="center"
                style={{
                background: "linear-gradient(45deg, #ac50ef, #7059fb 50%, #2ecff6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "19px",
                fontFamily: "Helvetica",
                }}
                width="100%"
            >
                <div
                style={{
                    fontSize: "14px",
                    verticalAlign: "center",
                    textAlign: "center",
                    color: "white",
                    lineHeight: "19px",
                    fontFamily: "Helvetica",
                    whiteSpace: "pre",
                }}
                >
                {"Total Supply: " + totalSupply + " OZT "}
                {datetime}
                </div>
                <div style={{ color: "white", fontSize: "14px" }}>
                <Time
                    style={{
                    fontSize: "15px",
                    verticalAlign: "center",
                    lineHeight: "19px",
                    margin: "0px",
                    padding: "0px",
                    }}
                ></Time>
                </div>
            </div>
            <br />
        </>
    );
}