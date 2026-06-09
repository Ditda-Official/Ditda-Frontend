"use client";

import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";

import { commissionDraftsData } from "@/features/instructor/choose";
import Button from "@/shared/ui/Button";
import { DraftCheckSection } from "@/widgets/instructor/choose";

interface PageProps {
  params: Promise<{ commissionId: string }>;
}

const Page = ({ params }: PageProps) => {
  const router = useRouter();
  const { commissionId } = use(params);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const commission = commissionDraftsData.find(c => c.commissionId === Number(commissionId));

  if (!commission) return notFound();

  return (
    <div className="mx-auto flex w-235 flex-col items-center gap-10 pt-16">
      <div>
        <h1 className="text-title2-sb mb-6.5 w-full py-4 text-left text-black">
          {commission.title}
        </h1>
        <DraftCheckSection
          drafts={commission.drafts}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </div>
      <Button
        variant={selectedIndex !== null ? "medium_primary" : "medium_disabled"}
        className="w-fit self-end"
        onClick={selectedIndex !== null ? () => router.push("/instructor") : undefined}
      >
        제출하기
      </Button>
    </div>
  );
};

export default Page;
