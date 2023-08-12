export default function handler(req, res) {
    return new Promise((resolve, reject) => {
        try {
            console.log("Fetching Global Market Data...");

            let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", () => {
                if(xhr.readyState === XMLHttpRequest.DONE) {
                    if(validJSON(xhr.responseText)) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject("Invalid JSON.");
                    }
                }
            });

            xhr.open("GET", "https://api.coingecko.com/api/v3/global", true);
            xhr.send();
        } catch(e) {
            reject(e);
        }
    });
}