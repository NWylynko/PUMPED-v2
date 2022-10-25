import { useRouter } from "next/router";
import { useState } from "react";
import { createQuerySchema } from "./createQuerySchema";

// react hook to simplify parsing and validating query items
export const useQuery = <QueryItems extends Readonly<string[]>>(...queryItems: QueryItems) => {
  const [schema] = useState(createQuerySchema(...queryItems));
  const router = useRouter();

  return schema.parse(router.query);

};
