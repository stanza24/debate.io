import {createServer} from "./server";
import {config} from "config/app.config";

createServer()
    .then((app) => {
        app.listen(config.server.port, () => {
            console.log(`Server was started on port ${config.server.port}...`)
        })
    })
    .catch((error) => {
        console.log('Server error', error.message);
        process.exit(1);
    });
