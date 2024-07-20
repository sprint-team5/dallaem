"use client";

import { queryOptions } from "@tanstack/react-query";

const getData = queryOptions({
  queryKey: ["posts"],
  queryFn: async () => {
    const response = await fetch("경로");

    return response.json();
  },
});

export default getData;
