import Utils from "../utils";
//import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
  try {
    let data = req.body;
    const { username, password } = data;

    const helper = new Utils(username);
    await helper.fetchCoins();

    //const supabase = createServerComponentClient({ cookies });
    //const { data: accounts } = await supabase.from("accounts").select();

    console.log(accounts);

    if (!password) {
      res.status(400).json({ error: "Password is required." });
      return;
    }

    if (helper.verifyPassword(password)) {
      const token = helper.generateToken("web");
      res.json({
        message: "You are now being logged in...",
        token,
        valid: true,
        username: helper.username,
      });
    } else {
      res.json({ error: "Invalid password.", valid: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
