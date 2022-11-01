import axios from "axios";
import { IUser } from "./slice";

export async function getUsers() {
    return (await axios.get(`/api/v1/user`)).data;
}

export async function createUser(user: IUser) {
    return (await axios.post(`/api/v1/user`, user)).data;
}

export async function updateUser(user: IUser) {
    return await axios.put(`/api/v1/user/${user._id}`, user);
}

export async function deleteUser(user: IUser) {
    return await axios.delete(`/api/v1/user/${user._id}`);
}