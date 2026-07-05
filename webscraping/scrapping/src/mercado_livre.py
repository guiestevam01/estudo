from playwright.sync_api import sync_playwright

def buscar(termo):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto(f"https://lista.mercadolivre.com.br/{termo}")

        page.wait_for_timeout(3000)

        html = page.content()

        print(html[:1000])

        browser.close()

buscar("notebook")
