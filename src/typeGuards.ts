/* type guard é uma função que retorna um booleano que diz a respeito 
 sobre o tipo do parâmetro usado através de type predicate: value is value 
 typeof value === "string_do_valor, não ele literal"
 
[
  {
    "Status": "Paga",
    "ID": 32323221,
    "Data": "01/09/2022 01:21",
    "Nome": "Owen Hill",
    "Forma de Pagamento": "Cartão de Crédito",
    "Email": "o.hill@email.com",
    "Valor (R$)": "452,00",
    "Cliente Novo": 1
  }, ]*/

import type {ApiInterface} from "./interfaces"

function isInterface(value: unknown): value is Record<string, unknown> {
if( typeof value === "object" &&  value !== null) {
    return true }
return false
}


function isArrayobj(valor: unknown): valor is Record<string, unknown>[] {
    const value = valor as Record<string, unknown>[]
    if( value.every((x) => isInterface(x))){ 
        return true
    }
  else return false
}

export function isApi(body: unknown): body is ApiInterface[] {
    const corpo = body as Record<string, unknown>[]
    if( isArrayobj(corpo)){
        if(corpo.every(y => 
          typeof  y.status === "string" &&
          typeof  y.id === "number" &&
          typeof  y.data === "string" &&
          typeof  y.nome === "string" &&
          typeof  y.tipo_pgt === "string" &&
          typeof  y.emmail === "string" &&
          typeof  y.valor === "string" &&
          typeof  y.novo === "number")
        ){
        return true
        }
        else return false
    } else return false
}
