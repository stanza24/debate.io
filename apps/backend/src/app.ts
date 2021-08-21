import dotenv from "dotenv";
import {createServer} from "./server";

dotenv.config();

const PORT = process.env.PORT || 4200;

createServer()
    .then((app) => {
        app.listen(PORT, () => {
            console.log(`Server was started on port ${PORT}...`)
        })
    })
    .catch((error) => {
        console.log('Server error', error.message);
        process.exit(1);
    });
