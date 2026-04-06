from tenacity import retry, stop_after_attempt, wait_exponential
import requests

@retry(
    stop=stop_after_attempt(5),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    reraise=True
)
def fetch_api_data(url):
    """Fetch data with automatic retry on failure"""
    response = requests.get(url, timeout=30)
    response.raise_for_status()
    return response.json()

# Usage
try:
    data = fetch_api_data("https://api.example.com/data")
except Exception as e:
    print(f"Failed after retries: {e}")