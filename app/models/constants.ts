import MercadoPagoService from '#services/mercado_pago_service'

const Constants = {
  Situacao: {
    Concluido: 3,
    Pendente: 2,
    Cancelado: 1,
  },
  Perfis: {
    Usuario: 1,
    Membro: 2,
    Obreiro: 3,
    Pastor: 4,
    Administrador: 5,
    Server_Administrador: 6,
  },
  FormaPagamento: {
    checkout: async ({ evento, usuario }: any) => {
      return await MercadoPagoService.checkout({ evento, usuario })
    },
  },
}

export default Constants
