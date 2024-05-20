import MercadoPagoService from '#services/mercado_pago_service'

const Constants = {
  Situacao: {
    Concluido: -3,
    Pendente: -2,
    Cancelado: -1,
  },
  FormaPagamento: {
    pix: async ({ evento, usuario }: any) => {
      return await MercadoPagoService.gerarPagamentoPix({ evento, usuario })
    },

    cartao: async ({ evento, usuario, cartao }: any) => {
      return { evento, usuario, cartao }
    },
  },
}

export default Constants
