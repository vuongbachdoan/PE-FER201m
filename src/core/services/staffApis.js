import axios from "axios";

const URL = "https://65444ee25a0b4b04436c3f2c.mockapi.io"
const ENDPOINT = {
    getAll: `${URL}/staffManagement`,
    createOne: `${URL}/staffManagement`,
    getOne: `${URL}/staffManagement`,
    deleteOne: `${URL}/staffManagement`,
    updateOne: `${URL}/staffManagement`,
}

export const getAllStaffs = async () => {
    const res = await axios.get(ENDPOINT.getAll);
    return res.data;
}

export const getOneStaff = async (staffId) => {
    const res = await axios.get(`${ENDPOINT.getOne}/${staffId}`);
    return res.data;
}

export const createOneStaff = async (staffData) => {
    const res = await axios.post(`${ENDPOINT.createOne}`, staffData);
    return res.data;
}

export const deleteOneStaff = async (staffId) => {
    const res = await axios.delete(`${ENDPOINT.deleteOne}/${staffId}`);
    return res.data;
}

export const updateOneStaff = async (staffId, staffData) => {
    const res = await axios.put(`${ENDPOINT.updateOne}/${staffId}`, staffData);
    return res.data;
}