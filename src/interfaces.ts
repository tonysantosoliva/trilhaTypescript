  /*{
    "Status": "Paga",
    "ID": 32323221,
    "Data": "01/09/2022 01:21",
    "Nome": "Owen Hill",
    "Forma de Pagamento": "Cartão de Crédito",
    "Email": "o.hill@email.com",
    "Valor (R$)": "452,00",
    "Cliente Novo": 1
  }
*/
/*Total: R$ 30.806,30
Cartão de Crédito: 70
Boleto: 30
Paga: 74
Recusada pela operadora de cartão: 14
Aguardando pagamento: 1
Estornada: 2
Dia com mais vendas: Terça*/

interface ApiInterface {
      Status: "string" 
      ID: "number" 
      Data: "string" 
      Nome:"string" 
      "Forma de pagamento": "string" 
      Email: "string" 
      "Valor (R$)": "string" 
      "Cliente novo": "number"
}
interface Stats {
    total: string
    cartao: string
    boleto: string
    paga: string
    recusada: string
    aguardando: string
    estornada: string
    melhor_dia: string
}

export type { Stats, ApiInterface}




