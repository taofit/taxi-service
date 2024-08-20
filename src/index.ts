import { dbConnect } from "./db/dbconnect";
import service from "./server";

const port = 4000;

(async () => {
    await dbConnect();
})();

const apps = service;
apps.listen(port, () => console.log(`Server listening on port ${port}`));

export default apps;