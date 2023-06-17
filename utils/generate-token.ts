import crypto from "node:crypto";

/**
 * Used to generated random string
 */
export default function generateToken(length: number = 20): string {
  return crypto.randomBytes(length).toString("hex").toUpperCase();
}