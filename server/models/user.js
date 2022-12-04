const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { db, isConnected, ObjectId } = require("./mongo");

const collection = db.db(process.env.DB_NAME).collection("users");

const list = [
	{
		email: 'test@yahoo.com',
		password: 'password',
		pic: 'https://randomuser.me/portraits/men/1.jpg',
		firstName: 'Andrew',
		lastName: 'McDonald',
		handle: 'coolguy10',
		isAdmin: true,
	},
	{
		firstName: 'Koolaid',
		lastName: 'Guy',
		email: 'ohyeag@email.com',
		handle: 'kool',
		password: 'qwerty',
		pic: 'https://randomuser.me/portraits/men/2.jpg',
		isAdmin: false,
	},
	{
		firstName: 'Type',
		lastName: 'Script',
		email: 'is@email.com',
		handle: 'awesome',
		password: 'qwerty',
		pic: 'https://randomuser.me/portraits/women/3.jpg',
		isAdmin: false,
	},
];

const get = async (id) => {
	const user = await collection.findOne({ _id: new ObjectId(id) });
	if (!user)
		throw { statusCode: StatusCodes.NOT_FOUND, message: "User not found" };
	return { ...user, password: undefined };
};
const getByHandle = async (handle) => {
	const user = await collection.findOne({ handle });
	if (!user)
		throw { statusCode: StatusCodes.NOT_FOUND, message: "User not found" };
	return { ...user, password: undefined };
};

const remove = async (id) => {
	const user = await collection.findOneAndDelete({ _id: new ObjectId(id) });
	if (!user)
		throw { statusCode: StatusCodes.NOT_FOUND, message: "User not found" };
	return { ...user.value, password: undefined };
};
const update = async (id, user) => {
	if (user.password) {
		user.password = await bcrypt.hash(user.password, 10);
	}

	user = await collection.findOneAndUpdate(
		{ _id: new ObjectId(id) },
		{ $set: user },
		{ returnDocument: "after" }
	);
	return { ...user, password: undefined };
};

const login = async (email, password) => {
	const user = await collection.findOne({ email });
	if (!user)
		throw { stausCode: StatusCodes.NOT_FOUND, message: "User not found" };

	//! uncomment when db passwords are bcrypted
	if (!(await bcrypt.compare(password, user.password)))
		throw {
			statusCode: StatusCodes.UNAUTHORIZED,
			message: "Invalid password",
		};

	const data = { ...user, password: undefined };
	const token = jwt.sign(data, process.env.JWT_SECRET);

	return { ...data, token };
};

const searchUsers = async (partialHandle) => {
	const users = await collection.find({
		$or: [
			{ handle: { $regex: partialHandle, $options: "i" } },
			{ firstName: { $regex: partialHandle, $options: "i" } },
			{ lastName: { $regex: partialHandle, $options: "i" } },
		],
	});
	const result = await users.toArray();
	return result.map((user) => ({ ...user, password: undefined }));
};

const getByToken = async (token) => {
	const data = jwt.verify(token, process.env.JWT_SECRET);
	const user = await collection.findOne({ _id: new ObjectId(data._id) });
	if (!user)
		throw { stausCode: StatusCodes.NOT_FOUND, message: "User not found" };
	return { ...user, password: undefined, token };
};

const fromToken = async (token) =>
	new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) reject(err);
			else resolve(decoded);
		});
	});

const seed = async () => {
	const newList = await Promise.all(
		list.map(async (user) => ({
			...user,
			password: await bcrypt.hash(
				user.password,
				+process.env.SALT_ROUNDS
			),
		}))
	);
	return collection.insertMany(newList);
};

module.exports = {
	async create(user) {
		if (!user.handle)
			throw {
				statusCode: StatusCodes.BAD_REQUEST,
				message: "Handle is required",
			};

		user.password = await bcrypt.hash(
			user.password,
			+process.env.SALT_ROUNDS
		);

		const result = await collection.insertOne(user);
		user = await get(result.insertedId);
		const token = jwt.sign(user, process.env.JWT_SECRET);
		return { ...user, token };
	},
	remove,
	update,
	login,
	getByToken,
	collection,
	getByHandle,
	seed,
	fromToken,
	searchUsers,
	async getList() {
		return (await collection.find().toArray()).map((user) => ({
			...user,
			password: undefined,
		}));
	},
};