import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse

app = FastAPI()

def scrape_listings(zip_code: str):
    base_url = f"https://www.realtor.com/realestateandhomes-search/{zip_code}"
    listings = []
    page = 1
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
    }
    while True:
        url = f"{base_url}/pg-{page}" if page > 1 else base_url
        print(url)
        response = requests.get(url, headers=headers)
        print(response)
        if response.status_code != 200:
            break
        soup = BeautifulSoup(response.content, "html.parser")
        properties = soup.find_all("div", class_="BasePropertyCard_propertyCard__N5tuo")
        if not properties:
            break
        for property in properties:
            price = property.find("div", class_="card-price").text.strip() if property.find("div", class_="card-price") else "N/A"
            address = property.find("div", class_="card-address").text.strip() if property.find("div", class_="card-address") else "N/A"
            beds = property.find("li", {"data-testid": "property-meta-beds"}).text.strip() if property.find("li", {"data-testid": "property-meta-beds"}) else "N/A"
            baths = property.find("li", {"data-testid": "property-meta-baths"}).text.strip() if property.find("li", {"data-testid": "property-meta-baths"}) else "N/A"
            sqft = property.find("li", {"data-testid": "property-meta-sqft"}).text.strip() if property.find("li", {"data-testid": "property-meta-sqft"}) else "N/A"
            listings.append({"price": price, "address": address, "beds": beds, "baths": baths, "sqft": sqft})
        page += 1
    return listings

@app.get("/scrape-realtor")
async def scrape_realtor(zip_code: str):
    listings = scrape_listings(zip_code)
    return JSONResponse(content=listings)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
