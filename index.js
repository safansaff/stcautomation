const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

async function main() {
    // Automatically locate ChromeDriver from node_modules
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())  // Default Chrome options
        .build();

    try {
        // Navigate to the STC TV subscription page
        await driver.get('https://subscribe.stctv.com/sa-en');

        // Pause to let the page fully load
        await driver.sleep(5000);

        // Extract and print subscription details for Saudi Arabia
        console.log("\nExtracting subscription details for Saudi Arabia...");
        await extractSubscriptionDetails(driver, "sa");

        // Extract and print subscription details for Kuwait
        console.log("\nExtracting subscription details for Kuwait...");
        await extractSubscriptionDetails(driver, "kw");

        // Extract and print subscription details for Bahrain
        console.log("\nExtracting subscription details for Bahrain...");
        await extractSubscriptionDetails(driver, "bh");

    } finally {
        // Quit the browser after extraction
        await driver.quit();
    }
}

// Function to extract and print subscription details for a specific country
async function extractSubscriptionDetails(driver, countryId) {
    // Click the dropdown arrow for country selection
    await driver.findElement(By.className("arrow")).click();
    await driver.sleep(1000);

    // Select the specific country
    await driver.findElement(By.xpath(`//a[@id='${countryId}']`)).click();
    await driver.sleep(3000);

    // Extract subscription details for the selected country
    let packageType = await driver.findElement(By.xpath("//strong[@id='name-lite']")).getText();
    let price = await driver.findElement(By.css("div[id='currency-lite'] b")).getText();
    let currency = await driver.findElement(By.xpath("//body[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[1]/i[1]")).getText();

    // Print the extracted details
    console.log(`Package Type: ${packageType}, Price: ${price}, Currency: ${currency}`);
}

// Run the main function
main();
