import * as dotenv from "dotenv"
import { createDfuseClient } from "@dfuse/client";

;(global as any).fetch = require("node-fetch")
;(global as any).WebSocket = require("ws")

dotenv.config();

if (!process.env.DFUSE_TOKEN) throw new Error("[DFUSE_TOKEN] is required");
if (process.env.DFUSE_TOKEN.includes("PRIVATE")) throw new Error("[DFUSE_TOKEN] invalid token")

export const apiKey = process.env.DFUSE_TOKEN || '';

export const client = createDfuseClient({ apiKey, network: 'mainnet' })
