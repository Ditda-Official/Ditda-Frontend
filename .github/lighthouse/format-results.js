/**
 * Combines manifest.json + links.json from multiple Lighthouse CI result
 * folders (one per audited role) into a single markdown table for the PR
 * comment. Run after all `lhci` collect/upload steps have finished, once
 * each step's `.lighthouseci` output has been copied to its own folder
 * (collect wipes `.lighthouseci` on every invocation, so results can't be
 * read after the fact without preserving them first).
 */
const fs = require("fs");
const path = require("path");

const SECTIONS = [
  { dir: "lhci-public", title: "공개 페이지 (비로그인)" },
  { dir: "lhci-designer", title: "🎨 디자이너 페이지 (테스트 계정)" },
  { dir: "lhci-instructor", title: "🎓 강사 페이지 (테스트 계정)" },
];

const grade = score => (score >= 0.9 ? "🟢" : score >= 0.5 ? "🟠" : "🔴");
const pct = score => Math.round(score * 100);

const readJson = filePath => JSON.parse(fs.readFileSync(filePath, "utf8"));

const buildSection = ({ dir, title }) => {
  const manifestPath = path.join(dir, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    return `### ${title}\n\n_결과 없음 (수집 실패)_`;
  }

  const manifest = readJson(manifestPath);
  const linksPath = path.join(dir, "links.json");
  const links = fs.existsSync(linksPath) ? readJson(linksPath) : {};

  const rows = manifest
    .filter(run => run.isRepresentativeRun)
    .map(run => {
      const lhr = readJson(run.jsonPath);
      const audits = lhr.audits;
      const s = run.summary;
      const pathname = new URL(run.url).pathname || "/";
      const reportUrl = links[run.url];
      const detail = reportUrl ? `[리포트](${reportUrl})` : "-";

      return [
        `| ${pathname} `,
        `| ${grade(s.performance)} ${pct(s.performance)} `,
        `| ${audits["largest-contentful-paint"].displayValue} `,
        `| ${audits["first-contentful-paint"].displayValue} `,
        `| ${audits["speed-index"].displayValue} `,
        `| ${audits["total-blocking-time"].displayValue} `,
        `| ${audits["cumulative-layout-shift"].displayValue} `,
        `| ${detail} |`,
      ].join("");
    });

  if (rows.length === 0) {
    return `### ${title}\n\n_결과 없음 (수집 실패)_`;
  }

  return [
    `### ${title}`,
    "",
    "| 경로 | Performance | LCP | FCP | Speed Index | TBT | CLS | 상세 |",
    "|---|---|---|---|---|---|---|---|",
    ...rows,
  ].join("\n");
};

const body = [
  "### 🔦 Lighthouse 성능 리포트",
  "",
  ...SECTIONS.map(buildSection),
  "",
  "<sub>점수: 🟢 90+ 🟠 50-89 🔴 0-49 · 리포트는 임시 저장소에 7일간 보관됩니다.</sub>",
].join("\n");

fs.appendFileSync(
  process.env.GITHUB_OUTPUT,
  `comment<<LHCI_COMMENT_EOF\n${body}\nLHCI_COMMENT_EOF\n`,
);
