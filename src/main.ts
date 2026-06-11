/*Não preciso me preocupar de usar métodos com o html, já que o DOM é baixado e colocado no escopo global dos arquivos
documento é o objeto raiz da árvore */

import {pegaDadosApi} from "./api"
import {ApiInterface, Stats} from "./interfaces"

async function insertTable():Promise<void>{
    const corpo = await pegaDadosApi()
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
                   tr.appendChild(td)
        }
        }
    }}
async function insertStats():Promise<void>{
        const dados = await pegaDadosApi()
        const totais = document.getElementById("transacoes")
        if (totais !== null){
            totais.textContent = dados.toLocaleString("pt-Br", {
                style:"currency",
                currency: "BRL"
            })
        }
        const acc = dados.reduce<Record<string, number>>((acc, transacao) => {
            (acc[transacao.tipo_pgt] = (acc[transacao.tipo_pgt] ?? 0) + 1)
            return acc     
        }     
        , {})
        const cartao = document.getElementById("cartao")
        const boleto = document.getElementById("boleto")
        if(cartao !== null && boleto!== null && typeof acc === "number"){
        [cartao.textContent, boleto.textContent] = [acc["Cartão de Crédito"], acc["Boleto"]]
        }
}


async function insertTotalCalculus(): Promise<void>{
    const ncorretos = await correctForm()
    const total = ncorretos.reduce((acc, x )=> acc + x)
    const span = document.getElementById("transacoes")
    if(span!== null){
        span.textContent = String(total)
    }
}

async function insertStatusCalculus():Promise<void>{}




async function insertMelhorDia():Promise<void>{}

async function correctForm(): Promise<number[]>{
    const data = await pegaDadosApi()
    const arraynumeros = data.map(x => Number((x.valor).replace(/\./, "").replace(",","."))) // Só para lembrar que o número precisa estar como 1200.2
    const ncorretos = arraynumeros.map(y => {
        if (!(typeof y === "number")){
            return 0 
        }
        return y
    })
    return ncorretos
}