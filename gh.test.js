let page;

beforeAll(async () => {
  page = await browser.newPage();
});

afterAll(async () => {
  await page.close();
});

describe("Github page new tests", () => {
 
 beforeEach(async () => {
  await page.goto("https://github.com/account/organizations/new?plan=free&ref_cta=Create%2520a%2520new%2520organization&ref_loc=bottom%2520plans&ref_page=%2Fteam");
});
 
test("The first link attribute", async () => {   
  await page.waitForSelector('a', {timeout: 2000});
  const actual = await page.$eval("a", link => link.getAttribute('href'));
  expect(actual).toEqual("#start-of-content");
});

test("The login Field is the active element", async () => {
  const isCursorInsideField = await page.evaluate(() => {
    const loginField = document.querySelector('#login_field');
    return loginField === document.activeElement;
  });
  
  console.log('Курсор установлен в login_field:', isCursorInsideField);
});

test("Check if signInButton is clickable", async () => {
  const signInButtonSelector = "#login > div.auth-form-body.mt-3 > form > div > input.btn.btn-primary.btn-block.js-sign-in-button";
  
  await page.waitForSelector(signInButtonSelector, { visible: true, timeout: 2000 });

  const isClickable = await page.$eval(signInButtonSelector, button => !button.disabled && button.offsetParent !== null);

  expect(isClickable).toBe(true);
});

});

describe("Github page tests", () => {

 beforeEach(async () => {
  await page.goto("https://github.com/team");
 });

test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1', { timeout: 2000 });
    const title = await page.title();
    expect(title).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
});

test("The first link attribute", async () => {   
  await page.waitForSelector('a', {timeout: 2000});
  const actual = await page.$eval("a", link => link.getAttribute('href') );
  expect(actual).toEqual("#start-of-content");
});

test("The page contains Sign in button", async () => {
  const btnSelector = ".btn-large-mktg.btn-mktg";
  await page.waitForSelector(btnSelector, {
    visible: true, timeout: 2000
  });
  const actual = await page.$eval(btnSelector, link => link.textContent);
  expect(actual).toContain("Get started with Team")
});
});
