import { useApi } from '~/composables/api'

export const useEgnyte = () => {

  const upload_file = (folder_name, file_name, file) => {
    const formData = new FormData()
    formData.append("file", file)

    return useApi('/files/uploadfile', {
      method: "POST",
      query: {
        folder_name,
        file_name
      },
      body: formData
    })
  }


  return {
    upload_file
  }
}
