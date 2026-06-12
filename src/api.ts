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
import { isApi } from "./typeGuards.js"
const API_URL: string = "https://api.origamid.dev/json/transacoes.json"

export async function pegaDadosApi():Promise< ApiInterface []>{
    const header = await fetch(API_URL)
    if(header.ok){
        const body: unknown = await header.json()
        if (isApi(body)){
        return body 
      }
        else throw new Error ("Formato de recebimento dos dados inválido") }
    else throw new Error(`Erro no recebimento dos dados ${header.status}`)
}
