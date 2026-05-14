export const GITHUB_REPO_URL = "https://github.com/Oranquelui/HaitouSamurai";

const waitlistIssueTitle = encodeURIComponent("Lifetime Pro waitlist interest");
const waitlistIssueBody = encodeURIComponent(
  [
    "I want to follow 配当サムライ / Haitou Samurai Lifetime Pro updates.",
    "",
    "Use case:",
    "Most useful workflow feature: watchlist / target dividend planner / saved scenarios / custom thresholds / export",
    "",
    "Note: 配当サムライ / Haitou Samurai is an educational screening tool, not investment advice or ticker recommendations."
  ].join("\n")
);

export const WAITLIST_ISSUE_URL = `${GITHUB_REPO_URL}/issues/new?title=${waitlistIssueTitle}&body=${waitlistIssueBody}`;

export const landingCtas = [
  {
    label: "Try Dashboard",
    href: "/dashboard",
    priority: "primary"
  },
  {
    label: "Star on GitHub",
    href: GITHUB_REPO_URL,
    priority: "secondary"
  },
  {
    label: "Join Lifetime Pro Waitlist",
    href: WAITLIST_ISSUE_URL,
    priority: "secondary"
  }
] as const;

export const dashboardTrustCopy = [
  "Static sample metrics show how the scoring model behaves; they are not live market data.",
  "Outputs are educational screening results, not investment advice or buy/sell recommendations.",
  "Verify prices, fundamentals, taxes, and exchange rates from primary sources before making financial decisions."
] as const;
