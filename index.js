

const puppeteer = require('puppeteer');

async function start() {

    console.log('start')
    const browser = await puppeteer.launch(); 
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/p/CIV2q1ZnhfJ/');

    await loadMore(page, '.dCJp8')
    const commit = await getCommits(page, '.C4VMK');

    console.log(commit)

}

async function loadMore(page, selector) {
    const moreButton = await page.$(selector)
    if (moreButton) {
        console.log('More')
        await moreButton.click();
        await page.waitFor(selector, {timeout: 3000}).catch(()=> {console.log('timeout')})
        await loadMore(page, selector)
    }else{
     return 0;   
    }
}

//C4VMK
async function getCommits(page, selector) {
    const commit = await page.$$eval(selector, links => links.map(link => link.innerText))
    return commit;
}
// function contar(arrobas) {
//     let count = {}
//     arrobas.forEach(arroba => { count[arroba] = (count[arroba] || 0) + 1 })

//     return count;
// }

// function sort(counted) {
//     const entries = Object.entries(counted)
//     const sorted = entries.sort((a, b) => { return b[1] - a[1] })

// }

// sort(contar(arrobas))
start();