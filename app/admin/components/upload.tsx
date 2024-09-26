//@ts-nocheck
import DynamicModal from './modal.js'
import { Box, Button, DropZone, Icon, Input } from '@adminjs/design-system'
import { ActionProps } from 'adminjs'
import axios from 'axios'
import React, { useRef, useState } from 'react'

const camposImagensResources = {
  Usuarios: 'avatar',
  Formularios: 'configJson',
  Empresas: 'configJson',
}

const resourcesWithImageCollumn = ['Usuarios']

export default (props: ActionProps) => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>(
    'Erro ao processar o envio do arquivo. Por favor, entre em contato com o suporte.'
  )
  const { record, resource } = props
  const inputRef = useRef(null) // Usando useRef para acessar o input
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('Envio de Arquivo')
  const [modalMessage, setModalMessage] = useState(null)
  const [modalVariant, setModalVariant] = useState(null)

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
      formData.append('attribute', camposImagensResources[resource.id])
      formData.append('file', file)

      const imageDevice = inputRef.current ? inputRef.current.value : null // Acessa o valor do input
      if (imageDevice) formData.append('imageDevice', imageDevice)

      if (!resourcesWithImageCollumn.includes(resource.id) && !imageDevice)
        throw new Error('É obrigatório preencher o INPUT')

      const response = await axios.post('/painel/arquivo/upload', formData)

      //Montando modal de successo
      setModalMessage(response.data.message)
      setModalVariant('success')
      setShowModal(true)

      setUploading(false)
    } catch (erro) {
      const { message } = erro
      if (message) setErrorMessage(message)

      setUploading(false)

      //Montando modal de erro
      setModalMessage(errorMessage)
      setModalVariant('danger')
      setShowModal(true)
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
      {!resourcesWithImageCollumn.includes(resource.id) && (
        <Input id="inputDevice" type="text" variant="sm" width={150} ref={inputRef} />
      )}

      <h3 style={{ marginBottom: 20, marginTop: 20, textAlign: 'center', fontSize: 16 }}>
        Upload de Arquivo
      </h3>
      <DropZone
        onChange={handleDrop}
        multiple={false}
        translations={{
          placeholder: 'Selecione ou arraste o arquivo aqui',
        }}
      />

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

      <DynamicModal
        title={modalTitle}
        message={modalMessage}
        variant={modalVariant}
        showModal={showModal}
        onClose={() => {
          setShowModal(false)
          if (modalVariant === 'success') {
            window.location.href = `/admin/resources/${resource.id}`
          }
        }}
      />
    </Box>
  )
}
