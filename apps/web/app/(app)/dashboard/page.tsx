export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-foreground">
          Bảng điều khiển
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Chào mừng quay trở lại
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Streak", value: "--" },
          { title: "XP", value: "--" },
          { title: "Bài học hoàn thành", value: "--" },
        ].map((stat) => (
          <div
            key={stat.title}
            className="rounded-[4px] border border-border bg-card p-6"
          >
            <p className="text-xs text-muted-foreground">{stat.title}</p>
            <p className="mt-1 text-2xl font-medium text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[4px] border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Dashboard đầy đủ sẽ hoạt động ở Phase 11
        </p>
      </div>
    </div>
  );
}
