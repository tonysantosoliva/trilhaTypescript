import { isApi } from "./typeGuards";
const API_URL = "https://api.origamid.dev/json/transacoes.json";
async function pegaDadosApi(API_URL) {
    const header = await fetch(API_URL);
    if (header.ok) {
        const body = await header.json();
        if (isApi(body)) {
            return body;
        }
    }
}
