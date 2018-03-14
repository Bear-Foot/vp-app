import {
  initialize,
  INITIALIZE_FILES,
  files,
} from './files'

it('Testing initialize()', () => {
  const files = []
  expect(initialize([])).toEqual({
    type: INITIALIZE_FILES,
    payload: {
      files,
    }},
  )
})

it('Testing reducer with initialize', () => {
  const initialState = {
    files: []
  }
  const filesToAdd = [{ name: '1'}, { name: '2'}]
  const newState = files(initialState, initialize(filesToAdd))

  filesToAdd.forEach((file, i) => {
    const newFile = newState.files[i]
    expect(newFile.name).toEqual(file.name)
    expect(newFile.id).toBeDefined()
    expect(newFile.data).toBe(file)
  })
})

it('Testing reducer with change status', () => {
  const initialState = {
    files: []
  }
  const filesToAdd = [{ name: '1'}, { name: '2'}]
  const newState = files(initialState, initialize(filesToAdd))

  filesToAdd.forEach((file, i) => {
    const newFile = newState.files[i]
    expect(newFile.name).toEqual(file.name)
    expect(newFile.id).toBeDefined()
    expect(newFile.data).toBe(file)
  })
})
