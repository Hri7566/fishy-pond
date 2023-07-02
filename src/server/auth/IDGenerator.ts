import crypto from "crypto";
import { env } from "../../env.mjs";

export class IDGenerator {
    public static generateID(ip: string) {
        const hash = crypto.createHash("md5");

        // Hash the user's IP address
        // Salt the data
        hash.update("::ffff:")
            .update(ip)
            .update(env.ID_SALT as unknown as string);

        return hash.digest().toString("hex").substring(0, 24);
    }

    public static generateRandomID() {
        return crypto.randomBytes(12).toString("hex").substring(0, 24);
    }

    public static getColor(userId: string) {
        const hash = crypto.createHash("sha256");
        hash.update(userId + "color");
        return "#" + hash.digest().toString("hex").substring(0, 6);
    }
}
