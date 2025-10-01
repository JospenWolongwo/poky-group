#!/bin/bash

# Ping Search Engines About New Sitemap
# This notifies search engines that your sitemap has been updated

SITEMAP_URL="https://pokygroup.com/sitemap.xml"

echo "🔔 Pinging search engines about sitemap..."
echo ""

# Ping Google
echo "📍 Pinging Google..."
curl -s "https://www.google.com/ping?sitemap=${SITEMAP_URL}" > /dev/null
echo "✅ Google pinged"

# Ping Bing
echo "📍 Pinging Bing..."
curl -s "https://www.bing.com/ping?sitemap=${SITEMAP_URL}" > /dev/null
echo "✅ Bing pinged"

echo ""
echo "✅ All search engines notified!"
echo "⏰ Wait 24-48 hours for crawling to begin"

