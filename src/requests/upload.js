import {
  endUpload,
  startUpload,
  errorUpload,
} from '../redux/files'

export const upload = fileToUpload => (dispatch, getState) => {
  const formData = new FormData();
  formData.append('file', fileToUpload.data)

  dispatch(startUpload(fileToUpload.id))
  fetch('http://10.138.11.112:8000/upload', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (response.ok) {
        dispatch(endUpload(fileToUpload.id))
      } else {
        dispatch(errorUpload(fileToUpload.id))
      }
    })
}
