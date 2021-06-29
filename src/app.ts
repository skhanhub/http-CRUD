import { startServer } from "./server";

// Port on which incoming requests will arrive
const port = process.env.PORT || "3001";
startServer(port);