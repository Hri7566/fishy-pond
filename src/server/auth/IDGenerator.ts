import crypto from "crypto";
import { env } from "../util/env";

export class IDGenerator {
    public static generateID(ip: string) {
        const hash = crypto.createHash("sha256");

        // Hash the user's IP address
        // Salt the data
        hash.update("::ffff:").update(ip).update(env.ID_SALT);

        return hash.digest().toString("hex").substring(0, 24);
    }
}
