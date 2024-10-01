import { ActionContext } from 'adminjs'

export default ({ context, code }: { context: ActionContext; code: string }) => {
  const usuario = context.currentAdmin!

  return usuario.permissoes.find((value: any) => value.code === code)
}
