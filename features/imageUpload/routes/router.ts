import { t } from "@/server/trpc";
import { addNewImage } from "./addNewImage";

export const router = t.router({
  add: addNewImage
});
