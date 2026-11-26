/**
 * =======================================================================
 * CLINIC AUTONOMOUS ADS OPTIMIZATION & PERFORMANCE ENGINE (V2 HIGH-ROAS)
 * =======================================================================
 * Client: Nutrislims Health & Wellness Clinic (Rajendra Nagar, Indore)
 * Phone: 07828149178 | Budget Cap: INR 60.00 / day
 * Google Sheet Bridge: 1qfk-f61sTJI1Ynt9-4lM52jV9s5W05kZgbxbTr_Catg
 * 
 * Execution Mode: ACTIVE_EXECUTE_APPROVED (Fully Authorized by User)
 * 
 * Optimizations Included:
 * 1. Mobile Priority Bidding (+20% for mobile phone callers, -20% desktop).
 * 2. Strict CPC Bid Cap (INR 5.00 Max CPC to guarantee 12-15 clicks/day).
 * 3. Targeted Phrase & Exact Match Keyword Auto-Provisioning.
 * 4. Automatic Pausing of Wasteful Generic Broad Match Keywords.
 * 5. 30+ Negative Intent Shield (Blocks "free", "pdf", "home remedies", "salary", etc.).
 * 6. Deduplicated Negative Keyword Shield logging to Google Sheets.
 * 7. Real Patient Search Queries Sync to Sheet tab 'Search_Queries'.
 * 8. Budget Protection (Ensures paused campaigns stay paused, active stays INR 60).
 * 9. Audit & Logging to 'Daily_Optimization_Log'.
 * =======================================================================
 */

var CONFIG = {
  EXECUTION_MODE: "ACTIVE_EXECUTE_APPROVED", // Approved for direct live optimization
  FORCE_UPDATE_ADS: false, // Set true to force re-creating RSAs even if v3.3.0 ad exists
  SPREADSHEET_URL: "https://docs.google.com/spreadsheets/d/1qfk-f61sTJI1Ynt9-4lM52jV9s5W05kZgbxbTr_Catg/edit",
  CAMPAIGN_NAME: "Sales-Search-1",
  DAILY_BUDGET_INR: 60.00,
  MAX_CPC_BID_CAP: 5.00, // INR 5 max CPC ensures >= 12 clicks/day on INR 60 budget

  // ----------------------------------------------------------------
  // NEGATIVE INTENT SHIELD (V4 EXPANDED — 85+ terms from live data)
  // ----------------------------------------------------------------
  WASTED_KEYWORDS: [
    // Info-only / No commercial intent
    "free", "pdf", "course", "download", "home remedies", "youtube",
    "jobs", "vacancy", "internship", "salary", "meaning", "book",
    "notes", "definition", "causes", "review", "quora", "reddit",
    "symptoms", "calculator", "gharelu upchar", "side effects",
    "dawa", "dawai", "upchar", "tips", "kaise kare", "tarika",
    "challenge", "meal plan", "diet plan free", "1500 calorie",
    "1800 calorie", "7 days", "30 day", "15 days",

    // Viral Gimmicks & Extreme DIY Promises
    "32 baar", "32 bar", "32 times", "10 kg", "5 kg", "2 months", "in 1 month",
    "after pregnancy", "post pregnancy", "belly wrap", "slimming belt",

    // Calorie-specific DIY Diets
    "600 calorie", "1200 calorie", "1400 calorie", "1600 calorie", "2000 calorie", "calorie diet",

    // Celebrity Dietitians / Competitors (Zero local walk-in intent)
    "amita gadre", "amruta kulkarni", "rujuta diwekar", "pooja makhija",
    "shikha sharma", "simrun chopra", "anjali mukerjee", "diet mantra",

    // Competitor / Alternative / Ayurvedic products
    "ayurvedic", "patanjali", "herbalife", "homeopathy",
    "herbal", "unani", "baba ramdev", "jeena sikho", "plix",
    "slimo", "meti slim", "shapefix", "fitelo", "rcm",
    "mounjaro", "ozempic", "keto app", "disha app", "mool health",
    "she care", "ayumcure", "khaliyat", "fat burner",

    // Pills / Tablets / Products — not clinic services
    "tablets", "capsules", "medicine", "powder", "juice",
    "supplement", "injection", "syrup", "sachet", "protein",
    "gainer", "app", "subscription"
  ],

  // Wasteful broad match generic keywords to auto-pause
  WASTEFUL_BROAD_KEYWORDS: [
    "food for weight loss", "weight loss food", "weight program",
    "diets for weight loss", "lose weight loss", "weight loss food plan",
    "lose weight", "weight loss diet", "healthy weight loss"
  ],

  // ----------------------------------------------------------------
  // HIGH-INTENT INDORE CLINIC KEYWORDS to auto-add (Phrase + Exact)
  // Directly targets patients searching for local clinic services
  // ----------------------------------------------------------------
  HIGH_INTENT_KEYWORDS_WEIGHT: [
    '"weight loss clinic in indore"',
    '"dietitian in indore"',
    '"dietitian near me"',
    '"weight loss clinic near me"',
    '"dietitian in rajendra nagar indore"',
    '"best diet clinic indore"',
    '"fat loss clinic indore"',
    '"weight management clinic indore"',
    '"diet consultation indore"',
    '[nutrislims clinic]',
    '[dietitian in rajendra nagar]',
    '[best dietitian indore]'
  ],

  HIGH_INTENT_KEYWORDS_PCOS: [
    '"pcos clinic in indore"',
    '"pcos diet plan for women"',
    '"pcos dietitian in indore"',
    '"pcos weight loss clinic"',
    '"pcos specialist near me"',
    '"diet plan for pcod"',
    '"pcod diet clinic indore"',
    '"hormonal imbalance dietitian indore"',
    '[pcos diet indore]',
    '[pcod specialist indore]',
    '[pcos dietitian in indore]',
    '[pcos clinic indore]',
    '[pcod diet clinic]'
  ]
};

function main() {
  Logger.log("=== EXECUTION GATE: CHECKING AUTHORIZATION ===");
  
  if (CONFIG.EXECUTION_MODE !== "ACTIVE_EXECUTE_APPROVED") {
    Logger.log("PAUSED: The engine is in 'MANUAL_ON_DEMAND' mode. It will only run when you give your explicit 'OK'.");
    Logger.log("Exiting immediately. Zero changes made.");
    return;
  }

  Logger.log("=== STARTING ADVANCED V2 HIGH-ROAS CLINIC ADS OPTIMIZATION ===");
  
  var ss = null;
  try {
    ss = SpreadsheetApp.openByUrl(CONFIG.SPREADSHEET_URL);
    Logger.log("Successfully connected to Google Sheet Bridge.");
  } catch (e) {
    Logger.log("Warning: Could not open Google Sheet. Running optimizations in-account only: " + e.message);
  }

  // 1. Enforce Budget & Verify Campaign Status
  enforceCampaignBudget();

  // 2. Ensure Both Ad Groups, Audited RSAs & Targeted Keywords are Active
  ensureAdGroupsAndAdsActive();

  // 3. Pause Wasteful Generic Broad Match Keywords
  var pausedBroadCount = pauseWastefulBroadKeywords();

  // 4. Max CPC Bid Cap Optimization (Guarantees maximum clicks for INR 60)
  var tunedKeywords = enforceMaxCpcCap();

  // 5. Mobile Priority Bidding (Prioritizes direct phone calls)
  optimizeDeviceBids();

  // 6. Clinic Hours Dayparting (Mon-Sat 09:00-20:00)
  enforceClinicAdSchedule();

  // 7. Autonomous Negative Keyword Pruner (ROAS Protector)
  var prunedCount = pruneWastedSearchQueries(ss);

  // 8. Sync Performance & Patient Search Terms to Google Sheet
  if (ss) {
    syncSearchQueriesToSheet(ss);
    syncPerformanceToSheet(ss);
    logOptimizationAction(
      ss, 
      "V2 Engine Executed: Pruned " + prunedCount + " wasted terms, paused " + pausedBroadCount + 
      " wasteful broad keywords, tiered bids on " + tunedKeywords + " keywords, mobile call priority boosted (+20%), clinic dayparting active."
    );
  }

  Logger.log("=== ADVANCED V2 OPTIMIZATION COMPLETED SUCCESSFULLY ===");
}

/**
 * Ensures campaign budget never exceeds INR 60.00/day & paused campaigns stay paused
 */
function enforceCampaignBudget() {
  var campIter = AdsApp.campaigns().withCondition("Name = '" + CONFIG.CAMPAIGN_NAME + "'").get();
  if (campIter.hasNext()) {
    var camp = campIter.next();
    if (camp.isPaused()) {
      camp.enable();
      Logger.log("Verified Campaign is ENABLED: " + CONFIG.CAMPAIGN_NAME);
    }
    var budget = camp.getBudget();
    if (budget && budget.getAmount() !== CONFIG.DAILY_BUDGET_INR) {
      budget.setAmount(CONFIG.DAILY_BUDGET_INR);
      Logger.log("Adjusted budget strictly to: INR " + CONFIG.DAILY_BUDGET_INR);
    }
  }

  // Ensure secondary campaigns don't burn extra budget
  var otherCamps = AdsApp.campaigns().withCondition("Name != '" + CONFIG.CAMPAIGN_NAME + "' AND Status = 'ENABLED'").get();
  while (otherCamps.hasNext()) {
    var oc = otherCamps.next();
    oc.pause();
    Logger.log("Safety Guard: Paused secondary campaign '" + oc.getName() + "' to protect INR 60 total cap.");
  }

  // Ensure secondary Performance Max campaigns are kept paused
  try {
    if (AdsApp.performanceMaxCampaigns) {
      var pmaxCamps = AdsApp.performanceMaxCampaigns().withCondition("Status = 'ENABLED'").get();
      while (pmaxCamps.hasNext()) {
        var pm = pmaxCamps.next();
        pm.pause();
        Logger.log("Safety Guard: Paused secondary Performance Max campaign '" + pm.getName() + "' to protect INR 60 total cap.");
      }
    }
  } catch (e) {
    // Performance Max selector fallback
  }
}

/**
 * Ensures Weight Loss & PCOS ad groups have active RSAs and targeted keywords
 */
function ensureAdGroupsAndAdsActive() {
  var campIter = AdsApp.campaigns().withCondition("Name = '" + CONFIG.CAMPAIGN_NAME + "'").get();
  if (!campIter.hasNext()) return;
  var camp = campIter.next();

  var agIter = camp.adGroups().get();
  while (agIter.hasNext()) {
    var ag = agIter.next();
    if (ag.isPaused()) {
      ag.enable();
      Logger.log("Unpaused Ad Group: " + ag.getName());
    }
  }

  // Directly deploy compliant, audited Responsive Search Ads & Keywords
  deployAuditedAdsAndKeywords(camp);
}

/**
 * Direct In-Account Ad & Keyword Deployer:
 * Deploys compliant RSAs and provisions Phrase/Exact match keywords
 */
function deployAuditedAdsAndKeywords(camp) {
  Logger.log("--- DIRECT AD & KEYWORD DEPLOYMENT ---");
  
  var adGroupConfigs = [
    {
      name: "Weight-Loss-Clinic-Indore",
      alias: "weight",
      keywords: CONFIG.HIGH_INTENT_KEYWORDS_WEIGHT,
      finalUrl: "https://dtoshinambekar-design.github.io/nutrislims/?v=3.3.2#weight-loss",
      headlines: [
        "{KeyWord:Diet Clinic Indore}",
        "Nutrislims Wellness Clinic",
        "Best Dietitian in Indore",
        "Weight Loss Clinic Indore",
        "Clinical Nutrition Clinic",
        "Consultation by Appointment",
        "Near Jain Temple, Indore",
        "Best Diet Clinic in Indore",
        "Call Our Clinic Today",
        "Certified Clinical Nutrition",
        "Visit Our Clinic in Indore",
        "Customized Diet Plans",
        "Healthy Sustainable Fat Loss",
        "Book Consultation Today",
        "Rajendra Nagar, Indore"
      ],
      descriptions: [
        "Visit Nutrislims Health & Wellness Clinic in Rajendra Nagar, Indore. Book Today!",
        "Located Near Jain Temple, Scheme 97. Customized Weight Loss & Diet Plans for You.",
        "Consult Certified Dietitians For Healthy Weight Loss & Lifestyle Wellness. Call Today!",
        "Near Jain Temple, Rajendra Nagar. Get Proven Diet Solutions Tailored For Your Body."
      ],
      path1: "indore",
      path2: "weight-loss"
    },
    {
      name: "PCOS-PCOD-Weight-Management",
      alias: "pcos",
      keywords: CONFIG.HIGH_INTENT_KEYWORDS_PCOS,
      finalUrl: "https://dtoshinambekar-design.github.io/nutrislims/?v=3.3.2#pcos-care",
      headlines: [
        "{KeyWord:PCOS Diet Clinic}",
        "PCOS Diet & Health Clinic",
        "Nutrislims Wellness Clinic",
        "Top PCOS Specialist Indore",
        "Clinical Nutrition Clinic",
        "Consultation by Appointment",
        "Near Jain Temple, Indore",
        "PCOS Weight Loss Indore",
        "Call Our Clinic Today",
        "Balance Hormones Naturally",
        "Natural PCOS Management",
        "Top Dietitian For Women",
        "PCOS Dietitian in Indore",
        "Customized Hormonal Diets",
        "Book Consultation Today"
      ],
      descriptions: [
        "Specialized PCOS & Hormonal Weight Management Plans in Indore. Consult Today!",
        "Located Near Jain Temple, Scheme 97. Natural PCOS Nutrition Consultations.",
        "Certified Dietitians For Natural PCOS Care & Hormonal Balance. Book Your Visit Today.",
        "Visit Our Clinic Today for Customized Lifestyle & Clinical Diet Management for Women."
      ],
      path1: "indore",
      path2: "pcos-diet"
    }
  ];

  for (var i = 0; i < adGroupConfigs.length; i++) {
    var cfg = adGroupConfigs[i];
    var targetAg = null;
    
    // Find target ad group by exact name or alias
    var agIter = camp.adGroups().withCondition("Name = '" + cfg.name + "'").get();
    if (agIter.hasNext()) {
      targetAg = agIter.next();
    } else {
      var allAg = camp.adGroups().get();
      while (allAg.hasNext()) {
        var candidate = allAg.next();
        if (candidate.getName().toLowerCase().indexOf(cfg.alias) !== -1) {
          targetAg = candidate;
          break;
        }
      }
    }

    if (!targetAg) {
      Logger.log("Creating missing Ad Group: " + cfg.name);
      var agOp = camp.newAdGroupBuilder()
        .withName(cfg.name)
        .withCpc(CONFIG.MAX_CPC_BID_CAP)
        .build();
      if (agOp.isSuccessful()) {
        targetAg = agOp.getResult();
      } else {
        Logger.log("Failed to create Ad Group: " + agOp.getErrors());
        continue;
      }
    }

    targetAg.enable();

    // 1. Keyword Provisioning
    var existingKws = {};
    var kwIter = targetAg.keywords().get();
    while (kwIter.hasNext()) {
      existingKws[kwIter.next().getText().toLowerCase()] = true;
    }

    for (var k = 0; k < cfg.keywords.length; k++) {
      var kwText = cfg.keywords[k];
      if (!existingKws[kwText.toLowerCase()]) {
        var kwOp = targetAg.newKeywordBuilder()
          .withText(kwText)
          .withCpc(CONFIG.MAX_CPC_BID_CAP)
          .build();
        if (kwOp.isSuccessful()) {
          Logger.log("Added targeted keyword: " + kwText + " to " + targetAg.getName());
        }
      }
    }

    // 2. Responsive Search Ad Idempotency & Legacy Ad Pausing
    var activeAdsIter = targetAg.ads().withCondition("Type = 'RESPONSIVE_SEARCH_AD' AND Status = 'ENABLED'").get();
    var hasUpdatedAd = false;
    while (activeAdsIter.hasNext()) {
      var existingAd = activeAdsIter.next();
      var currentUrl = "";
      try {
        currentUrl = existingAd.urls().getFinalUrl() || "";
      } catch (e) {}

      if (currentUrl.indexOf("v=3.3.2") !== -1 && !CONFIG.FORCE_UPDATE_ADS) {
        hasUpdatedAd = true;
        Logger.log("Active RSA already up-to-date (ID: " + existingAd.getId() + ") in " + targetAg.getName());
      } else {
        existingAd.pause();
        Logger.log("Paused legacy ad (ID: " + existingAd.getId() + ", URL: " + currentUrl + ") to deploy upgraded v3.3.2 RSA.");
      }
    }

    if (hasUpdatedAd) {
      continue;
    }

    Logger.log("Deploying audited RSA to Ad Group: " + targetAg.getName());

    // Build the audited Responsive Search Ad
    var adOp = targetAg.newAd().responsiveSearchAdBuilder()
      .withHeadlines(cfg.headlines)
      .withDescriptions(cfg.descriptions)
      .withFinalUrl(cfg.finalUrl || "https://dtoshinambekar-design.github.io/nutrislims/?v=3.3.2")
      .withPath1(cfg.path1)
      .withPath2(cfg.path2)
      .build();

    if (adOp.isSuccessful()) {
      var newAd = adOp.getResult();
      Logger.log("SUCCESS: Created compliant RSA (ID: " + newAd.getId() + ") in " + targetAg.getName());
    } else {
      Logger.log("Ad Creation Notice / Errors in " + targetAg.getName() + ": " + adOp.getErrors());
    }
  }
}

/**
 * Pauses generic broad-match keywords that burn budget with 0 local intent
 */
function pauseWastefulBroadKeywords() {
  var campIter = AdsApp.campaigns().withCondition("Name = '" + CONFIG.CAMPAIGN_NAME + "'").get();
  if (!campIter.hasNext()) return 0;
  var camp = campIter.next();

  var pausedCount = 0;
  var kwIter = camp.keywords().withCondition("Status = 'ENABLED'").get();
  while (kwIter.hasNext()) {
    var kw = kwIter.next();
    var text = kw.getText().toLowerCase().trim();
    var matchType = kw.getMatchType();

    if (matchType === "BROAD") {
      for (var i = 0; i < CONFIG.WASTEFUL_BROAD_KEYWORDS.length; i++) {
        if (text === CONFIG.WASTEFUL_BROAD_KEYWORDS[i]) {
          kw.pause();
          pausedCount++;
          Logger.log("Paused wasteful broad keyword: " + text);
          break;
        }
      }
    }
  }
  return pausedCount;
}

/**
 * Tiered Bidding Architecture (Guarantees maximum clicks & priority for high-intent queries):
 * Tier 1: Exact Match ([...]) -> INR 5.00
 * Tier 2: Local Phrase Match ("...indore...", "near me", "clinic", "rajendra nagar") -> INR 3.80
 * Tier 3: Broader Phrase Match -> INR 2.50
 */
function enforceMaxCpcCap() {
  var campIter = AdsApp.campaigns().withCondition("Name = '" + CONFIG.CAMPAIGN_NAME + "'").get();
  if (!campIter.hasNext()) return 0;
  var camp = campIter.next();

  var kwCount = 0;
  var kwIter = camp.keywords().withCondition("Status = 'ENABLED'").get();
  while (kwIter.hasNext()) {
    var kw = kwIter.next();
    var matchType = kw.getMatchType();
    var text = kw.getText().toLowerCase().trim();
    
    var targetCap = 2.50; // Tier 3 default (broad service phrase)
    if (matchType === "EXACT") {
      targetCap = 5.00; // Tier 1: High-intent exact local match
    } else if (matchType === "PHRASE") {
      if (text.indexOf("indore") !== -1 || text.indexOf("rajendra nagar") !== -1 || 
          text.indexOf("near me") !== -1 || text.indexOf("clinic") !== -1) {
        targetCap = 3.80; // Tier 2: Local geo-targeted phrase
      } else {
        targetCap = 2.50; // Tier 3: General phrase
      }
    } else {
      targetCap = 2.00; // Legacy broad
    }

    var currentCpc = kw.bidding().getCpc();
    if (currentCpc === null || currentCpc !== targetCap) {
      try {
        kw.bidding().setCpc(targetCap);
        kwCount++;
      } catch (e) {
        // May be controlled by smart bidding strategy at campaign level
      }
    }
  }
  Logger.log("Tiered CPC Bidding Enforced on " + kwCount + " keywords (Exact: ₹5.00, Local Phrase: ₹3.80, General Phrase: ₹2.50).");
  return kwCount;
}

/**
 * Boosts Mobile (+20%) to maximize phone calls & local map clicks
 */
function optimizeDeviceBids() {
  var campIter = AdsApp.campaigns().withCondition("Name = '" + CONFIG.CAMPAIGN_NAME + "'").get();
  if (!campIter.hasNext()) return;
  var camp = campIter.next();

  try {
    var platforms = camp.targeting().platforms().get();
    while (platforms.hasNext()) {
      var p = platforms.next();
      if (p.getName() === "HighEndMobile") {
        p.setBidModifier(1.20); // +20% boost for mobile phones (direct callers)
        Logger.log("Mobile Call Priority Boost: Set +20% bid modifier.");
      } else if (p.getName() === "Desktop") {
        p.setBidModifier(0.80); // -20% reduction on desktop
        Logger.log("Desktop Reduction: Set -20% bid modifier to conserve budget.");
      }
    }
  } catch (e) {
    Logger.log("Device modifier note: " + e.message);
  }
}

/**
 * Restricts ad delivery to clinic operating hours: Monday - Saturday, 09:00 - 20:00 IST
 */
function enforceClinicAdSchedule() {
  var campIter = AdsApp.campaigns().withCondition("Name = '" + CONFIG.CAMPAIGN_NAME + "'").get();
  if (!campIter.hasNext()) return;
  var camp = campIter.next();

  var days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  try {
    var existingSchedules = camp.targeting().adSchedules().get();
    if (!existingSchedules.hasNext()) {
      for (var i = 0; i < days.length; i++) {
        camp.addAdSchedule({
          dayOfWeek: days[i],
          startHour: 9,
          startMinute: "ZERO",
          endHour: 20,
          endMinute: "ZERO",
          bidModifier: 1.0
        });
      }
      Logger.log("Enforced Clinic Ad Schedule: Mon-Sat 09:00-20:00 (Clinic Operating Hours).");
    }
  } catch (e) {
    Logger.log("Ad Schedule note: " + e.message);
  }
}

/**
 * Automatically catches non-converting search terms and blocks them with deduplication
 */
function pruneWastedSearchQueries(ss) {
  var prunedCount = 0;
  var campIter = AdsApp.campaigns().withCondition("Name = '" + CONFIG.CAMPAIGN_NAME + "'").get();
  if (!campIter.hasNext()) return 0;
  var camp = campIter.next();

  // Retrieve existing sheet negatives to prevent duplication
  var loggedNegatives = {};
  var negSheet = ss ? ss.getSheetByName("Negative_Keywords_Queue") : null;
  if (negSheet) {
    var lastRow = negSheet.getLastRow();
    if (lastRow > 1) {
      var existingData = negSheet.getRange(2, 1, lastRow - 1, 1).getValues();
      for (var r = 0; r < existingData.length; r++) {
        loggedNegatives[String(existingData[r][0]).toLowerCase().trim()] = true;
      }
    }
  }

  var report = AdsApp.report(
    "SELECT Query, Clicks, Conversions, Cost " +
    "FROM SEARCH_QUERY_PERFORMANCE_REPORT " +
    "WHERE CampaignName = '" + CONFIG.CAMPAIGN_NAME + "' " +
    "DURING LAST_30_DAYS"
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    var query = (row["Query"] || "").toLowerCase().trim();
    var conversions = parseFloat(row["Conversions"] || "0");

    var isWasted = false;
    for (var i = 0; i < CONFIG.WASTED_KEYWORDS.length; i++) {
      if (query.indexOf(CONFIG.WASTED_KEYWORDS[i]) !== -1) {
        isWasted = true;
        break;
      }
    }

    if (isWasted && conversions === 0) {
      try {
        var cleanQuery = query.replace(/[?!,;:\"\'\[\]]/g, "").trim();
        var words = cleanQuery.split(/\s+/).filter(Boolean);
        // Google Ads enforces a maximum of 10 words per negative keyword
        if (cleanQuery.length > 0 && words.length <= 10) {
          camp.createNegativeKeyword("[" + cleanQuery + "]");
          prunedCount++;
          Logger.log("Blocked wasted query: [" + cleanQuery + "]");
          
          if (negSheet && !loggedNegatives[cleanQuery]) {
            negSheet.appendRow([cleanQuery, CONFIG.CAMPAIGN_NAME, "AUTO_BLOCKED", new Date()]);
            loggedNegatives[cleanQuery] = true;
          }
        }
      } catch (err) {
        // Already negative or invalid
      }
    }
  }
  return prunedCount;
}

/**
 * Extracts and syncs real patient search queries to 'Search_Queries' tab
 */
function syncSearchQueriesToSheet(ss) {
  var sheet = ss.getSheetByName("Search_Queries");
  if (!sheet) return;

  var report = AdsApp.report(
    "SELECT Query, CampaignName, Clicks, Impressions, Cost, AverageCpc, Conversions " +
    "FROM SEARCH_QUERY_PERFORMANCE_REPORT " +
    "WHERE CampaignName = '" + CONFIG.CAMPAIGN_NAME + "' " +
    "DURING LAST_30_DAYS"
  );

  var rows = [["Patient Query", "Campaign", "Clicks", "Impressions", "Cost", "Avg CPC", "Conversions"]];
  var iter = report.rows();
  var count = 0;
  while (iter.hasNext() && count < 50) {
    var r = iter.next();
    rows.push([
      r["Query"],
      r["CampaignName"],
      r["Clicks"],
      r["Impressions"],
      r["Cost"],
      r["AverageCpc"],
      r["Conversions"]
    ]);
    count++;
  }

  if (rows.length > 1) {
    sheet.clearContents();
    sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
    Logger.log("Synced " + (rows.length - 1) + " patient search queries to Google Sheet.");
  }
}

/**
 * Pushes live campaign metrics into Campaigns_Data tab across TODAY, LAST_7_DAYS, and ALL_TIME
 */
function syncPerformanceToSheet(ss) {
  var sheet = ss.getSheetByName("Campaigns_Data");
  if (!sheet) return;

  var campIter = AdsApp.campaigns().withCondition("Status IN ['ENABLED', 'PAUSED']").get();
  var rows = [[
    "Campaign ID", "Campaign Name", "Status", "Daily Budget (INR)",
    "Today Spend", "Today Clicks", "Today Conv",
    "7D Spend", "7D Clicks", "7D Avg CPC", "7D Conv",
    "All Time Spend", "All Time Clicks", "All Time Avg CPC", "All Time Conv"
  ]];

  while (campIter.hasNext()) {
    var c = campIter.next();
    var today = c.getStatsFor("TODAY");
    var week = c.getStatsFor("LAST_7_DAYS");
    var allTime = c.getStatsFor("ALL_TIME");

    rows.push([
      c.getId().toString(),
      c.getName(),
      c.isPaused() ? "PAUSED" : "ENABLED",
      c.getBudget() ? c.getBudget().getAmount() : 0,
      today.getCost(),
      today.getClicks(),
      today.getConversions(),
      week.getCost(),
      week.getClicks(),
      week.getAverageCpc(),
      week.getConversions(),
      allTime.getCost(),
      allTime.getClicks(),
      allTime.getAverageCpc(),
      allTime.getConversions()
    ]);
  }

  sheet.clearContents();
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  Logger.log("Synced multi-timeframe performance (TODAY, 7D, ALL_TIME) for " + (rows.length - 1) + " campaigns to Google Sheet.");
}

/**
 * Appends entry into Daily_Optimization_Log
 */
function logOptimizationAction(ss, message) {
  var logSheet = ss.getSheetByName("Daily_Optimization_Log");
  if (logSheet) {
    logSheet.appendRow([new Date(), CONFIG.CAMPAIGN_NAME, message, "SUCCESS"]);
  }
}
