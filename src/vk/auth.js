import vkIO from "vk-io";
import { VK_TOKEN as token } from "../config.js";

const { VK } = vkIO;

export const vk = new VK({ token });
