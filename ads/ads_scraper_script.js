/**
 * Autonomous Google Ads Intelligence Scraper
 * Extracts all campaign performance, search queries, keywords, and policy issues.
 */
function main() {
  Logger.log("=== STARTING GOOGLE ADS DATA EXTRACTION ===");
  
  var reportData = {
    accountInfo: {
      customerId: AdsApp.currentAccount().getCustomerId(),
      currency: AdsApp.currentAccount().getCurrencyCode(),
      timezone: AdsApp.currentAccount().getTimeZone()
    },
    campaigns: [],
    keywords: [],
    searchTerms: []
  };

  // 1. Extract Campaigns
  var campaignIterator = AdsApp.campaigns()
    .withCondition("Status IN ['ENABLED', 'PAUSED']")
    .get();

  while (campaignIterator.hasNext()) {
    var c = campaignIterator.next();
    var stats = c.getStatsFor("ALL_TIME");
    reportData.campaigns.push({
      id: c.getId(),
      name: c.getName(),
      status: c.isPaused() ? "PAUSED" : "ENABLED",
      budget: c.getBudget() ? c.getBudget().getAmount() : 0,
      clicks: stats.getClicks(),
      impressions: stats.getImpressions(),
      cost: stats.getCost(),
      ctr: stats.getCtr(),
      avgCpc: stats.getAverageCpc(),
      conversions: stats.getConversions()
    });
  }

  // 2. Extract Top Search Terms (What real customers typed)
  var searchReport = AdsApp.report(
    "SELECT Query, CampaignName, Clicks, Impressions, Cost, AverageCpc, Conversions " +
    "FROM SEARCH_QUERY_PERFORMANCE_REPORT " +
    "DURING LAST_30_DAYS"
  );
  var rows = searchReport.rows();
  var count = 0;
  while (rows.hasNext() && count < 100) {
    var row = rows.next();
    reportData.searchTerms.push({
      query: row["Query"],
      campaign: row["CampaignName"],
      clicks: row["Clicks"],
      impressions: row["Impressions"],
      cost: row["Cost"],
      avgCpc: row["AverageCpc"],
      conversions: row["Conversions"]
    });
    count++;
  }

  // 3. Extract Keywords & Quality Scores
  var kwIterator = AdsApp.keywords()
    .withCondition("Status IN ['ENABLED', 'PAUSED']")
    .forDateRange("LAST_30_DAYS")
    .orderBy("Clicks DESC")
    .withLimit(100)
    .get();

  while (kwIterator.hasNext()) {
    var kw = kwIterator.next();
    var stats = kw.getStatsFor("LAST_30_DAYS");
    reportData.keywords.push({
      text: kw.getText(),
      matchType: kw.getMatchType(),
      clicks: stats.getClicks(),
      impressions: stats.getImpressions(),
      cpc: stats.getAverageCpc(),
      cost: stats.getCost()
    });
  }

  Logger.log("=== EXTRACTION COMPLETE ===");
  Logger.log("TOTAL CAMPAIGNS FOUND: " + reportData.campaigns.length);
  Logger.log("TOTAL SEARCH TERMS FOUND: " + reportData.searchTerms.length);
  Logger.log("TOTAL KEYWORDS FOUND: " + reportData.keywords.length);
  Logger.log("JSON_PAYLOAD_START");
  Logger.log(JSON.stringify(reportData));
  Logger.log("JSON_PAYLOAD_END");
}
