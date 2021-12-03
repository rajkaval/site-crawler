
const puppeteer = require('puppeteer');
const browserFetcher = puppeteer.createBrowserFetcher();
var pageUrls = require('./pages.json');
console.log("Starting to crawl the page urls mentioned in pages.json");
(async () => {
  const revisionInfo = await browserFetcher.download(848005);
  console.log("Chromium browser is available now");
  const browser = await puppeteer.launch({
        executablePath: revisionInfo.executablePath,
        headless: false
      });
  //const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  await page.setDefaultNavigationTimeout(0);
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36')

  for(var i=0;i<pageUrls.length;i++){
    let url = pageUrls[i];
    await page.goto(url);
    //await autoScroll(page);
    await page.screenshot({ path: `page${i+1}.png` });
    console.log(`Page ${i+1} - ${url} - finished`);
  }
  console.log("Finished crawling pages");  
  await browser.close();
})();

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}