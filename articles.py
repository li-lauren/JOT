from newspaper import Article

#url = 'https://www.npr.org/sections/deceptivecadence/2020/10/24/927121609/ellen-reid-soundwalk-central-park-gps-location-sensitive-app'
#url = 'https://www.vox.com/culture/21534638/the-mandalorian-disney-plus-explained-do-i-need-to-watch-star-wars-baby-yoda'
# url = 'https://www.vox.com/covid-19-coronavirus-economy-recession-stock-market/2020/5/6/21248069/stock-market-economy-federal-reserve-jerome-powell'
#url = 'https://www.popularmechanics.com/technology/infrastructure/a34313925/whale-tail-train-derailment/'
url = 'https://www.cnn.com/travel/article/kai-tak-skyscraper-airside/index.html'
# article = Article(url)

# keep html when scraping
article = Article(url, keep_article_html=True)
article.download()
article.parse()

print(f"Title {article.title}")
print(f"Publish date {article.publish_date}")
print(f"Text {article.text}")
print(f"Author {article.authors}")
print(f"Top Image {article.top_image}")

html = article.article_html
print(f"Article HTML {str(html)}")

print(type(html))

