"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { ClipboardCheck, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { useCopy } from "@/hooks/use-copy";

const PublishedLink = () => {
  const accounts = useQuery(api.synchubAccount.accounts);
  const account = accounts !== undefined && accounts !== null;
  const [currentAccount, setCurrentAccount] = useState<Doc<"synchubAccount">>();
  const origin = useOrigin();

  const url = `${origin}/sync.hub/${currentAccount?.username}`;

  const { copied, copyToClipboard } = useCopy(url);

  useEffect(() => {
    if (account && accounts.length > 0) {
      setCurrentAccount(accounts[0]);
    }
  }, [account, accounts]);

  return (
    <div className="text-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "tween" }}
        onClick={copyToClipboard}
        className="px-4 py-1 rounded-full flex items-center mx-auto gap-x-2 bg-transparent border text-gray-500 font-medium text-sm"
      >
        <motion.span className="inline-block">
          {copied ? (
            <ClipboardCheck className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </motion.span>
        Copy Link
      </motion.button>
    </div>
  );
};
export default PublishedLink;
