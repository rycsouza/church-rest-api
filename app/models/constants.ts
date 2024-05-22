import MercadoPagoService from '#services/mercado_pago_service'

const Constants = {
  Situacao: {
    Concluido: -3,
    Pendente: -2,
    Cancelado: -1,
  },
  FormaPagamento: {
    checkout: async ({ evento, usuario }: any) => {
      return await MercadoPagoService.checkout({ evento, usuario })
    },
  },
}

export default Constants
