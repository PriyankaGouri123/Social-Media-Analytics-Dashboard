export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-card border border-border rounded-2xl shadow-lg p-8 md:p-12">
        
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          About Social Media Analytics Dashboard
        </h2>

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg text-center max-w-3xl mx-auto mb-10">
          Our platform provides detailed insights into your social media presence.
          By entering a username, you can fetch data across Instagram, X (Twitter),
          and YouTube.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-background border border-border rounded-xl p-6 text-center shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Instagram</h3>
            <p className="text-muted-foreground">
              Track followers, likes, posts, and engagement metrics for any public
              Instagram account.
            </p>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 text-center shadow-sm">
            <h3 className="text-xl font-semibold mb-3">X (Twitter)</h3>
            <p className="text-muted-foreground">
              Analyze followers, tweets, retweets, and other engagement stats
              instantly.
            </p>
          </div>

          <div className="bg-background border border-border rounded-xl p-6 text-center shadow-sm">
            <h3 className="text-xl font-semibold mb-3">YouTube</h3>
            <p className="text-muted-foreground">
              Monitor subscriber count, views, total videos, and overall channel
              performance.
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-muted-foreground text-lg text-center max-w-4xl mx-auto">
          This dashboard is designed for creators, marketers, and analysts who want
          a single platform to monitor and compare social media performance
          efficiently and professionally.
        </p>
      </div>
    </div>
  );
}
