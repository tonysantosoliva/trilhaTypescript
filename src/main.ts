/*Não preciso me preocupar de usar métodos com o html, já que o DOM é baixado e colocado no escopo global dos arquivos
documento é o objeto raiz da árvore */

import {pegaDadosApi} from "./api"
import type {ApiInterface, Stats} from "./interfaces"

function insertTable(corpo: ApiInterface[]):void{
    const tbody = document.getElementById("data_table")
    if(!( tbody === null)){
        for(const transacao of corpo){
            const tr = document.createElement("tr") 
                tbody.appendChild(tr)
                const row = [transacao.status, transacao.id, transacao.data, 
                    transacao.nome, transacao.tipo_pgt, transacao.email, transacao.valor, transacao.novo]
                for(const data of row){
                   const td = document.createElement("td")
                   td.textContent = String(data)
                   tr.appendChild(td)} //Lembrar que não está mostrando os valores em real
                }        
        }}

function insertStats(dados: ApiInterface[], ncorretos: number[]):void{
        const totais = document.getElementById("transacoes")
        if (totais !== null){
            const total = ncorretos.reduce((acc, n: number) => acc + n, 0)
            totais.textContent = total.toLocaleString("pt-BR", {
                style: "currency",
                currency:"BRL"
            })}
        const acc = dados.reduce<Record<string, number>>((acc, transacao) => {
            acc[transacao.tipo_pgt] = (acc[transacao.tipo_pgt] ?? 0) + 1
            acc[transacao.status] = (acc[transacao.status] ?? 0) + 1
            return acc     
        }, {})
        const cartao = document.getElementById("cartao")
        const boleto = document.getElementById("boleto")
        if(cartao !== null && boleto!== null){
        [cartao.textContent, boleto.textContent] = [String(acc["Cartão de Crédito"]), String(acc["Boleto"])]
        }
        const [pagas, recusadas, aguardando, estornadas] = [document.getElementById("pagas"),
            document.getElementById("recusadas"), document.getElementById("aguardando"), document.getElementById("estornadas")
        ]
        if( pagas !== null && recusadas !== null && aguardando !==null && estornadas !== null)
        [pagas.textContent, recusadas.textContent, aguardando.textContent, estornadas.textContent] = [
            String(acc["Paga"]), String(acc["Aguardando pagamento"]), String(acc["Estornada"]), String(acc["Recusada"])
            ]


    }


function insertMelhorData(dado: ApiInterface[]):void{
    const datas = dado.map(x => x.data.slice(0, 10))
    const acc = datas.reduce<Record<string, number>>((acc, data) =>{
    acc[data] = (acc[data] ?? 0) +1 
    return acc}
    , {})
    let maximo = 0
    for(const [dia, vezes] of Object.entries(acc)){
        if(vezes >= maximo){
            maximo = vezes
        }}
    const diaArray = Object.entries(acc).filter((x)=>
    x[1] === maximo
    )
    const htmldia = document.getElementById("dia") 
    if(htmldia !== null && diaArray[0] !== undefined && diaArray[0][0] !== undefined){
    htmldia.textContent = diaArray[0][0]
}}

function correctForm(data: ApiInterface[]): number[]{
    const arraynumeros = data.map(x => Number((x.valor).replace(/\./, "").replace(",","."))) // Só para lembrar que o número precisa estar como 1200.2
    const ncorretos = arraynumeros.map(y => Number.isNaN(y) ? 0 : y )
    return ncorretos
}
async function main():Promise<void>{
    const dados = await pegaDadosApi()



}
