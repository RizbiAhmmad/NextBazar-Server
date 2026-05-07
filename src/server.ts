import app from "./app";
import config from "./config";

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`NextBazar server is listening on port 5000`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
