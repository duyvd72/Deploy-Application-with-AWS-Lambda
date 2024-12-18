import Axios from 'axios'

export async function getTodos(idToken) {
  console.log('Fetching todos')

  const response = await Axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/todos`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  console.log('Todos:', response.data)
  return response.data.items.map((item) => {
    const commonResponse = {
      todoId: item.todoId.S,
      name: item.name.S,
      dueDate: item.dueDate.S,
      done: item.done.BOOL,
      createdAt: item.createdAt.S,
      userId: item.userId.S
    }

    if (item.attachmentUrl) {
      return {
        ...commonResponse,
        attachmentUrl: item.attachmentUrl.S
      }
    } else {
      return commonResponse
    }
  })
}

export async function createTodo(idToken, newTodo) {
  const response = await Axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/todos`,
    JSON.stringify(newTodo),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  return response.data.item
}

export async function patchTodo(idToken, todoId, updatedTodo) {
  await Axios.patch(
    `${process.env.REACT_APP_API_ENDPOINT}/todos/${todoId}`,
    JSON.stringify(updatedTodo),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
}

export async function deleteTodo(idToken, todoId) {
  await Axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(idToken, todoId) {
  const response = await Axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/todos/${todoId}/attachment`,
    '',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl, file) {
  await Axios.put(uploadUrl, file)
}
