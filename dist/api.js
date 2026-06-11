import { isApi } from "./typeGuards";
const API_URL = "https://api.origamid.dev/json/transacoes.json";
export async function pegaDadosApi() {
    const header = await fetch(API_URL);
    if (header.ok) {
        const body = await header.json();
        if (isApi(body)) {
            return body;
        }
        else
            throw new Error("Formato de recebimento dos dados inválido");
    }
    else
        throw new Error(`Erro no recebimento dos dados ${header.status}`);
}
