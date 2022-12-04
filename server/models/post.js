const userModel = require('./user');
const { StatusCodes } = require('http-status-codes');
const { db, ObjectId } = require('./mongo');

const postCollection = db.db(process.env.DB_NAME).collection('posts');

const list = [
	{
		owner: "coolguy10",
		acitivity: 'Biked through campus',
		pic: 'https://sustainability.unl.edu/21752562_1520383038022637_6453367371362554071_o.jpg',
		timeCreated: new Date(1665209841039),
	},
	{
		owner: "coolguy10",
		acitivity: 'Swam through the gunk',
		pic: 'https://upload.wikimedia.org/wikipedia/commons/5/55/The_Gunk_at_SUNY_New_Paltz.JPG',
		timeCreated: new Date(1656229741039),
	},
	{
		owner: "awesome",
		acitivity: 'Ran through campus',
		pic: 'https://penntoday.upenn.edu/sites/default/files/2019-02/P-100603-Master-V1-010X_0.jpg',
		timeCreated: new Date(1664199641039),
	},
	{
		owner: "kool",
		acitivity: 'Walked through campus',
		pic: 'https://images.onwardstate.com/uploads/2014/09/DSC_0059.jpg',
		timeCreated: new Date(1663189541039),
	},
];


const includeUser = async (post) => ({
	...post,
	owner: await userModel.getByHandle(post.owner)
});

const get = async (id) => {
	const post = await postCollection.findOne({ _id: new ObjectId(id) });
	if (!post)
		throw { statusCode: StatusCodes.NOT_FOUND, message: 'post not found' };
	return await includeUser(post)
}

const remove = async (id) => {
	const post = await postCollection.findOneAndDelete({
		_id: new ObjectId(id),
	});
	return await post.value;
};
const update = async (id, newpost) => {
	newpost = await postCollection.findOneAndUpdate(
		{ _id: new ObjectId(id) },
		{ $set: newpost },
		{ returnDocument: 'after' }
	);
	return await includeUser(newpost.value);
};

const seed = () => postCollection.insertMany(list)


module.exports = {
	async create(post) {
		post = {
			...post,
			owner: post.owner.handle,
			timeCreated: new Date(),
		};
		const result = await postCollection.insertOne(post);
		return await get(result.insertedId);
	},
	remove,
	update,
	seed,
	postCollection,
	async getList() {
		const posts = await postCollection.find().toArray();
		return Promise.all(posts.map((post) => includeUser(post)));
	},
};

module.exports.get = get;