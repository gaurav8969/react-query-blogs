import axios from 'axios';
const baseUrl = '/api/comments';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const add = async (newComment, id) => {
  const config = {
    headers: { Authorization: token },
  };

  try{
    const response = await axios.post(`${baseUrl}/${id}`, newComment, config);
    return response.data;
  }catch(error){
    console.log(error);
  }
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
  return id;
};

export default {
  setToken,
  remove,
  add
};