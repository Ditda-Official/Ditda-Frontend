"use client";

import { useState } from "react";

import Button from "@/shared/ui/Button";
import { DraftCheckSection } from "@/widgets/instructor/choose";

const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto flex w-235 flex-col items-center gap-10 pt-16">
      <div>
        <h1 className="text-title2-sb mb-6.5 w-full py-4 text-left text-black">YBM 영어 교재</h1>
        <DraftCheckSection selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
      </div>
      <Button
        variant={selectedIndex !== null ? "medium_primary" : "medium_disabled"}
        className="w-fit self-end"
      >
        제출하기
      </Button>
    </div>
  );
};

export default Page;
