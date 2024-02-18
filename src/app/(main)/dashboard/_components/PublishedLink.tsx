"use client";

import { useOrigin } from "@/hooks/use-origin";

const PublishedLink = () => {
  const origin = useOrigin();

  console.log(origin);

  return <div>PublishedLink</div>;
};
export default PublishedLink;
