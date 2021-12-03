
const puppeteer = require('puppeteer');
const browserFetcher = puppeteer.createBrowserFetcher();
var pageUrls = require('./pages.json');
console.log("Starting to navigate to the pages in pages.json");
(async () => {
  const revisionInfo = await browserFetcher.download(848005);

  const browser = await puppeteer.launch({
        executablePath: revisionInfo.executablePath
      });
  //const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  for(var i=0;i<pageUrls.length;i++){
    let url = pageUrls[i];
    await page.goto(url);
    await autoScroll(page);
    await page.screenshot({ path: `page${i+1}.png` });
    console.log(`Page ${i+1} - ${url}`);
  }
    
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