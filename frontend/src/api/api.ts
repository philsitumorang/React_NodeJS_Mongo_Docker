import axios from "axios";
import { IUser } from "./slice";
import * as yup from 'yup';

export const initialValues = {
    email: "",
    name: "",
    role: "",
    department: "",
    salary: "1"
};

export function validation(fields?: {}): yup.AnyObjectSchema {
	return yup.object({
		_id: yup.string(),
		role: yup.string(),
		department: yup.string(),
		dob: yup.date(),
		salary: yup.number(),
		...fields
	}).noUnknown(true);
}

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