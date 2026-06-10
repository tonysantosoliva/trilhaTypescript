interface ApiInterface {
    status: string;
    id: number;
    data: string;
    nome: string;
    tipo_pgt: string;
    email: string;
    valor: string;
    novo: number;
}
interface Stats {
    total: string;
    cartao: string;
    boleto: string;
    paga: string;
    recusada: string;
    aguardando: string;
    estornada: string;
    melhor_dia: string;
}
export type { Stats, ApiInterface };
//# sourceMappingURL=interfaces.d.ts.map