import { isApi } from "./typeGuards";
const API_URL = "https://api.origamid.dev/json/transacoes.json";
async function pegaDadosApi(API_URL) {
    const header = await fetch(API_URL);
    if (header.ok) {
        const body = await header.json(); // problema é que json retorna tipo any, força com unknown
        if (isApi(body))
            console.log(`${body}`);
    }
}
