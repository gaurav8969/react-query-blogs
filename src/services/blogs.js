import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try{
    const response = await axios.get(baseUrl);
    return response.data;
  }catch(error){
    console.log(error);
  }
};

const get = async (id) => {
  try{
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  }catch(error){
    console.log(error);
  }
};

const add = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  try{
    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
  }catch(error){
    console.log(error);
  }
};

const update = async (updatedBlog) => {
  try{
    const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog);
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
  getAll,
  get,
  add,
  update,
  remove
};