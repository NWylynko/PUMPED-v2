import { createMethods } from "../createMethods";
import { getSdk } from "./methods.generated";

export const getMethods = async () => createMethods(getSdk);