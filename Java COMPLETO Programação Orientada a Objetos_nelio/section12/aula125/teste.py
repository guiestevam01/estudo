import asyncio
from playwright.async_api import async_playwright

async def check_login(email, password):
    async with async_playwright() as p:
        # Inicia navegador headless (sem interface gráfica)
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        try:
            # 1. Acessa a página de login
            await page.goto("https://www.amazon.com.br/ap/signin", wait_until="networkidle")

            # 2. Preenche o email
            await page.fill("#ap_email", email)
            await page.click("#continue")

            # Aguarda o campo de senha aparecer (flow de 2 etapas)
            await page.wait_for_selector("#ap_password", timeout=10000)

            # 3. Preenche a senha
            await page.fill("#ap_password", password)
            await page.click("#signInSubmit")

            # 4. Aguarda redirecionamento ou erro
            # Se tiver sucesso, vai pra home ou dashboard. Se falhar, fica na página de erro.
            try:
                await page.wait_for_url("**/home**", timeout=10000)
                print(f"✅ SUCESSO: {email}:{password}")
                return True
            except:
                # Verifica se há mensagem de erro comum
                if "Senha incorreta" in await page.text_content("body") or "incorrect password" in await page.text_content("body"):
                    print(f"❌ ERRO SENHA: {email}:{password}")
                else:
                    print(f"⚠️ BLOQUEIO/OUTRO: {email}:{password}")
                return False

        except Exception as e:
            print(f"Erro no processo: {e}")
        finally:
            await browser.close()

# Exemplo de uso
asyncio.run(check_login("seu_email@teste.com", "sua_senha"))
