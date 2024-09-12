import { Box, Button, DropZone, Icon } from '@adminjs/design-system'
import { ActionProps } from 'adminjs'
import axios from 'axios'
/* eslint-disable unicorn/filename-case */
import React, { useState } from 'react'

const camposImagensResources = {
  Usuarios: 'avatar',
  Eventos: 'imagem',
  Igrejas: 'logo',
}

export default (props: ActionProps) => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { record, resource } = props

  const handleDrop = (files: any) => {
    setFile(files[0])
  }

  const handleSubmit = async () => {
    try {
      if (!file) throw new Error('Selecione um arquivo para enviar!')
      if (!resource.id) throw new Error('Sua sessão expirou, faça login novamente.')
      // @ts-ignore
      if (file.size / (1024 * 1024) > 100)
        throw new Error('Tamanho de arquivo inválido.\nLimite: 100MB.')
      // @ts-ignore
      if (file.name.length > 50)
        throw new Error('Nome de arquivo inválido.\nLimite: 50 caracteres.')

      setUploading(true)

      const formData = new FormData()

      formData.append('id', record?.id)
      formData.append('path', resource.id)
      //@ts-ignore
      formData.append('attribute', camposImagensResources[resource.id])
      formData.append('file', file)

      const response = await axios.post('/painel/arquivo/upload', formData)

      //@ts-ignore
      alert(response.data.message)
      setUploading(false)

      setTimeout(() => {
        //@ts-ignore
        window.location.href = `/admin/resources/${resource.id}`
      }, 1000)
    } catch (erro: any) {
      const { message } = erro
      if (message) setErrorMessage(message)
      else
        setErrorMessage(
          'Erro ao processar o envio do arquivo. Por favor, entre em contato com o suporte.'
        )

      setUploading(false)
    }
  }

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
      }}
    >
      <h3 style={{ marginBottom: 20, textAlign: 'center', fontSize: 16 }}>Upload de Arquivo</h3>
      <DropZone
        onChange={handleDrop}
        multiple={false}
        translations={{
          placeholder: 'Selecione ou arraste o arquivo aqui',
        }}
      />

      {errorMessage && <Box style={{ color: 'red', marginTop: 20 }}>{errorMessage}</Box>}

      <Button
        onClick={handleSubmit}
        mt="lg"
        disabled={!file || uploading}
        style={{
          fontSize: '1rem',
          marginTop: '2rem',
          padding: '0.8rem 1.6rem',
          backgroundColor: 'rgb(254, 97, 0)',
          borderRadius: '8px',
          color: 'white',
        }}
      >
        <Icon icon="Send" />
        {uploading ? 'Enviando...' : 'Enviar'}
      </Button>
    </Box>
  )
}
