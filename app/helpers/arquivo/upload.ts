import Storage from '#config/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import fs from 'fs'

export default async ({ file, path = 'uploads' }: { file: any; path: string }): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!file) reject('O envio do arquivo é obrigatório!')

    fs.readFile(file.tmpPath, (err, fileBuffer) => {
      if (err) {
        return reject('Erro ao ler o arquivo')
      }

      const storageRef = ref(Storage, `${path}/${file.clientName}`)

      const uploadTask = uploadBytesResumable(storageRef, fileBuffer, {
        contentType: file.headers['content-type'],
      })

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const calcPerCent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          const progress = Number.isNaN(calcPerCent) ? 100 : calcPerCent
          console.log(`${progress}% do envio...`)
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve({
                url: downloadURL,
                nome: file.clientName.split('.')[0],
              })
            })
            .catch(reject)
        }
      )
    })
  })
}
