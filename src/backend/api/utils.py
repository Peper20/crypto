import requests


def get_crypto_info_by_symbol(pk):
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    headers = {"X-CMC_PRO_API_KEY": "6df46815-fbaa-4152-8f1a-4ef7996ccfbe"}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        price = data["data"][pk]["quote"]["USD"]["price"]
        name = data["data"][pk]["name"]
        symbol = data["data"][pk]["symbol"]
        return (price, symbol, name)
    else:
        return "Ошибка при получении данных"
