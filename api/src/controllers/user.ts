import { Request, Response } from "express";
import { object, string, date, number } from "yup";
import {IUser, User} from "../models/user";

async function validation(data: IUser, fields?: {}): Promise<[unknown | null, null | true]> {
	const schema = object({
		_id: string(),
		role: string(),
		department: string(),
		dob: date(),
		salary: number(),
		...fields
	}).noUnknown(true);
	try {
		await schema.validate(data);
		return [null, true];
	} catch(err) {
		return [err, null];
	}
}

export async function getUsers(req: Request, res: Response) {
	const users = await User.find({ removed: false }).lean();
	return res.send(users)
}

export async function updateUser(req: Request, res: Response) {
	const v = await validation(req.body, {
		email: string().email(),
		name: string(),
	});
	if (v[0] !== null) {
		return res.send({
			name: "ValidationError",
			errors: v[0]
		})
	}
  
  const user: IUser | null = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
	res.send(user);
}

export async function deleteUser(req: Request, res: Response) {
	const id = req.params.id;
	if (id.length !== 24) {
		res.send({
			name: "ValidationError",
			error: "ID must be equal to 24 characters."
		})
	}
	const user: IUser | null = await User.findOne({ _id: id, removed: false });
	if (user) {
		user.removed = true;
		await user.save();
		return res.send({
			userExists: true, 
			removed: true
		})
	} else {
		return res.send({
			userExists: false,
			removed: false
		})
	}
}

export async function createUser(req: Request, res: Response) {
	const v = await validation(req.body, {
		email: string().email().required(),
		name: string().required(),
	});
	if (v[0] !== null) {
		return res.send({
			name: "ValidationError",
			errors: v[0]
		})
	}

	const user = new User(req.body);
	await user.save();
	return res.send(user);
}