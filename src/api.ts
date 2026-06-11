/*[
  {
    "Status": "Paga",
    "ID": 32323221,
    "Data": "01/09/2022 01:21",
    "Nome": "Owen Hill",
    "Forma de Pagamento": "Cartão de Crédito",
    "Email": "o.hill@email.com",
    "Valor (R$)": "452,00",
    "Cliente Novo": 1
  },
RETORNA ARRAY DE OBJETOS */
import type { ApiInterface } from "./interfaces"
import { isApi } from "./typeGuards"
const API_URL: string = "https://api.origamid.dev/json/transacoes.json"

async function pegaDadosApi(API_URL:string):Promise< ApiInterface []| void >{
    const header = await fetch(API_URL)
    if(header.ok){
        const body: unknown = await header.json()
        if (isApi(body)){
        return body
        }
    }
}


