export default function MarketingPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-medium leading-tight text-foreground">
            Nền tảng học tiếng Anh thế hệ mới
          </h1>
          <p className="text-base text-muted-foreground">
            Kết hợp 6 kỹ năng (Đọc — Nghe — Nói — Viết — Ngữ pháp — Từ vựng) với
            AI chấm điểm và SRS.
          </p>
        </div>

        <div className="rounded-[4px] border border-border bg-card px-8 py-6">
          <p className="text-lg font-medium text-foreground">Coming Soon</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Chúng tôi đang xây dựng nền tảng học tiếng Anh thế hệ mới. Hãy quay
            lại sớm!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-left sm:grid-cols-3">
          {[
            { label: "Đọc", en: "Reading" },
            { label: "Nghe", en: "Listening" },
            { label: "Nói", en: "Speaking" },
            { label: "Viết", en: "Writing" },
            { label: "Ngữ pháp", en: "Grammar" },
            { label: "Từ vựng", en: "Vocabulary" },
          ].map((skill) => (
            <div
              key={skill.en}
              className="rounded-[4px] border border-border p-4 text-center"
            >
              <p className="text-sm font-medium text-foreground">
                {skill.label}
              </p>
              <p className="text-xs text-muted-foreground">{skill.en}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
