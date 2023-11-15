import axios from "axios";

export const SERV_URL = `https://localhost:7179`;
export const PREFIX_API = `/api/Contacts`;

export const host = axios.create({ baseURL: SERV_URL + PREFIX_API });

export const get = async () => {
  const { data } = await host.get(`/get`);
  return data;
};

export const getPage = async (numberPage) => {
  let { data } = await host.get(`/get?pageNumber=${numberPage}`);
  console.log("GETPAGE:\n");
  console.log(data);
  return data;
};

export const insert = async (contact) => {
  const name = contact.Name;
  const mobilePhone = contact.MobilePhone;
  const jobTitle = contact.JobTitle;
  const birthDate = contact.BirthDate;

  const { data } = await host.post(`/insert`, {
    name,
    mobilePhone,
    jobTitle,
    birthDate,
  });
  return data;
};

export const update = async (contact) => {
  const id = contact.Id;
  const name = contact.Name;
  const mobilePhone = contact.MobilePhone;
  const jobTitle = contact.JobTitle;
  const birthDate = contact.BirthDate;
  const { data } = await host.put(`/update`, {
    id,
    name,
    mobilePhone,
    jobTitle,
    birthDate,
  });
  return data;
};

export const remove = async (contact) => {
  const id = contact.Id;
  const { data } = await host.delete(`/delete?id=${id}`);
  return data;
};
