import { Server } from "http";
import app from "./app";
// import config from "./app/config";
import mongoose from "mongoose";
import http from "http";
import config from "./app/config";
// import createSuperAdmin from "./scripts/createSuperAdmin";
// import { initSocket } from "./socket/socket";
// import { findNearbyPlaces, geocodeAddress } from "./app/modules/property/geocodingService";
// import axios from "axios";
// import createBotAdmin from "./scripts/createBotAdmin";
// import { reviewReminderCron } from "./app/modules/rating/ratingReminder.cron";
// import { verifyMailConnection } from "./shared/mailTest";

let server: Server;

async function main() {
    try {
        await mongoose.connect(config.mongodb_url as string);
        server = http.createServer(app);

        // initSocket(server);

        // createSuperAdmin();
        // createBotAdmin();

        // reviewReminderCron.start();

        // await verifyMailConnection();

        server.listen(Number(config.port), () => {
            console.log(`✅ App listening on port ${config.port}`);
        });
    } catch (err) {
        console.log("❌ DB Connection Failed:", err);
    }
}

main();

process.on("unhandledRejection", (error) => {
    console.log("❌ Unhandled Rejection detected:", error);

    if (server) {
        server.close(() => {
            // reviewReminderCron.stop();
            process.exit(1);
        });
    } else {
        // reviewReminderCron.stop();
        process.exit(1);
    }
});

process.on("uncaughtException", (error) => {
    console.log("❌ Uncaught Exception detected:", error);

    if (server) {
        server.close(() => {
            // reviewReminderCron.stop();
            process.exit(1);
        });
    } else {
        // reviewReminderCron.stop();
        process.exit(1);
    }
});
