import { promises as fsPromises } from "fs";

export default class Utils {
  constructor(username) {
    this.username = username;
    this.dataFolder = "../data/users/" + username + "/";
    this.accountFile = this.dataFolder + "account.json";
    this.holdingsFile = this.dataFolder + "holdings.json";
    this.activityFile = this.dataFolder + "activity.json";
    this.settingsFile = this.dataFolder + "settings.json";
    this.watchlistFile = this.dataFolder + "watchlist.json";
    this.coinsFile = this.dataFolder + "coins.json";

    if (this.userExists(username)) {
      this.username = username;
      this.dataFolder = "../data/users/" + username + "/";
      this.accountFile = this.dataFolder + "account.json";
      this.holdingsFile = this.dataFolder + "holdings.json";
      this.activityFile = this.dataFolder + "activity.json";
      this.settingsFile = this.dataFolder + "settings.json";
      this.watchlistFile = this.dataFolder + "watchlist.json";
      this.coinsFile = this.dataFolder + "coins.json";
    } else {
      this.username = "admin";
      this.dataFolder = "../data/users/admin/";
      this.accountFile = this.dataFolder + "account.json";
      this.holdingsFile = this.dataFolder + "holdings.json";
      this.activityFile = this.dataFolder + "activity.json";
      this.settingsFile = this.dataFolder + "settings.json";
      this.watchlistFile = this.dataFolder + "watchlist.json";
      this.coinsFile = this.dataFolder + "coins.json";
      this.generateAccount();
    }
  }

  verifyPassword(password) {
    const account = JSON.parse(fs.readFileSync(this.accountFile, "utf8"));
    const hash = account["password"];
    return bcrypt.compareSync(password, hash);
  }
  verifySession(token) {
    const platform = token.split("$")[0];
    const account = JSON.parse(fs.readFileSync(this.accountFile, "utf8"));
    const valid = account[platform];
    if (token === valid) {
      return true;
    }
    return false;
  }
  verifyPIN(pin) {
    const settings = JSON.parse(fs.readFileSync(this.settingsFile, "utf8"));
    const valid = settings["pin"];
    if (settings["shareHoldings"] === "enabled" && pin === valid) {
      return true;
    }
    return false;
  }

  validUsername(username) {
    if (username === "" || /[^a-z_\-0-9]/i.test(username)) {
      return false;
    }
    return true;
  }

  async userExists(username) {
    try {
      await fsPromises.access("../data/users/" + username);
      return true;
    } catch (error) {
      return false;
    }
  }

  generateAccount() {
    if (!fs.existsSync("../data/users/")) {
      fs.mkdirSync("../data/users/");
    }
    if (!fs.existsSync("../data/users/admin/")) {
      fs.mkdirSync("../data/users/admin/");
    }
    let content = fs.readFileSync(this.accountFile, "utf8");
    let current = JSON.parse(content);
    if (
      !fs.existsSync(this.accountFile) ||
      !current.hasOwnProperty("password") ||
      content.length === 0
    ) {
      let password = bcrypt.hashSync("admin", 10);
      let account = JSON.stringify({
        username: "admin",
        password: password,
        web: this.generateToken("web"),
        app: this.generateToken("app"),
        desktop: this.generateToken("desktop"),
      });
      fs.writeFileSync(this.accountFile, account);
    }
    if (fs.readFileSync(this.settingsFile, "utf8").length === 0) {
      let settings = JSON.stringify({
        shareHoldings: "disabled",
        pin: "0000",
        css: "",
        refetchTime: 86400,
      });
      fs.writeFileSync(this.settingsFile, settings);
    }
    if (!fs.existsSync(this.holdingsFile)) {
      fs.writeFileSync(this.holdingsFile, "{}");
    }
    if (!fs.existsSync(this.activityFile)) {
      fs.writeFileSync(this.activityFile, "{}");
    }
    if (!fs.existsSync(this.watchlistFile)) {
      fs.writeFileSync(this.watchlistFile, "{}");
    }
  }

  fetchCoins() {
    if (
      !fs.existsSync(this.coinsFile) ||
      fs.readFileSync(this.coinsFile).toString().trim() === "" ||
      Date.now() - 3600000 > fs.statSync(this.coinsFile).mtimeMs
    ) {
      var pairs = [];
      var coins = JSON.parse(
        httpGet("https://api.coingecko.com/api/v3/coins/list")
      );
      coins.forEach(function (coin) {
        var symbol = coin.symbol.toLowerCase();
        var pair = {};
        pair[symbol] = coin.id;
        pairs.push(pair);
      });
      fs.writeFileSync(this.coinsFile, JSON.stringify(pairs));
    }
  }

  async fetchHistoricalData(id, currency, from, to) {
    if (!fs.existsSync("../data/historical/")) {
      fs.mkdirSync("../data/historical/", { recursive: true });
    }
    const historicalFile = "../data/historical/" + id + "-" + currency;
    if (!this.historicalDataExists(id, currency)) {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/" +
          id +
          "/market_chart/range?vs_currency=" +
          currency +
          "&from=" +
          from +
          "&to=" +
          to
      );
      const json = await response.json();
      fs.writeFileSync(historicalFile, JSON.stringify(json));
      return json;
    } else {
      const json = fs.readFileSync(historicalFile, "utf-8");
      return JSON.parse(json);
    }
  }

  historicalDataExists(id, currency) {
    const historicalFile = "../data/historical/" + id + "-" + currency;
    const settings = JSON.parse(fs.readFileSync(this.settingsFile, "utf-8"));
    let refetchTime = 86400;
    if (settings["refetchTime"]) {
      refetchTime = settings["refetchTime"];
    }
    if (
      !fs.existsSync(historicalFile) ||
      fs.readFileSync(historicalFile, "utf-8") === "" ||
      Date.now() / 1000 - refetchTime >
        fs.statSync(historicalFile).mtimeMs / 1000
    ) {
      return false;
    }
    return true;
  }

  rrmdir(directory) {
    if (typeof directory === "string" && directory.trim() !== "") {
      if (typeof is_dir === "function" && is_dir(directory)) {
        var files = scandir(directory);
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (file !== "." && file !== "..") {
            if (
              typeof filetype === "function" &&
              filetype(directory + "/" + file) === "dir"
            ) {
              rrmdir(directory + "/" + file);
            } else {
              unlink(directory + "/" + file);
            }
          }
        }
        rmdir(directory);
      }
      if (typeof file_exists === "function" && file_exists(directory)) {
        return false;
      }
      return true;
    }
  }

  rglob(pattern, flags = 0) {
    if (typeof pattern === "string" && pattern.trim() !== "") {
      var files = glob(pattern, flags);
      var dirnamePattern = dirname(pattern);
      var directories = glob(dirnamePattern + "/*", GLOB_ONLYDIR | GLOB_NOSORT);
      for (var i = 0; i < directories.length; i++) {
        var directory = directories[i];
        files = files.concat(rglob(directory + "/" + basename(pattern), flags));
      }
      return files;
    }
  }
}
