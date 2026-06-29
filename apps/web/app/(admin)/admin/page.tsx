export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-foreground">Quản trị</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tổng quan hệ thống</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Tổng người dùng", value: "--" },
          { label: "Khóa học", value: "--" },
          { label: "Doanh thu", value: "--" },
          { label: "AI Cost", value: "--" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[4px] border border-border bg-card p-6"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-medium text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[4px] border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Admin CMS đầy đủ sẽ hoạt động ở các phase sau
        </p>
      </div>
    </div>
  );
}
