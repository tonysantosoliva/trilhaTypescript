/*Não preciso me preocupar de usar métodos com o html, já que o DOM é baixado e colocado no escopo global dos arquivos
documento é o objeto raiz da árvore */

import {API_URL, pegaDadosApi} from "./api"
import {ApiInterface} from "./interfaces"

async function insertTable():Promise<void>{
    const corpo = await pegaDadosApi()
    const tbody = document.getElementById("data_table")
    if(!( tbody === null)){
        for(const transacao of corpo as ApiInterface[]){
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







