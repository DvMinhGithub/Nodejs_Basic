import pool from '../configs/connectDB';

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users` ');
    return res.render('index.ejs', { dataUser: rows });
};

let getDetailPage = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM `users` WHERE `id` = ?', [
        req.params.id,
    ]);
    return res.json({ dataUser: rows });
};

let getCreatePage = async (req, res) => {
    return res.render('new.ejs');
};

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute(
        'insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',
        [firstName, lastName, email, address],
    );
    return res.redirect('/');
};

let deleteUser = async (req, res) => {
    await pool.execute('delete from users where id = ?', [req.body.id]);
    res.redirect('/');
};

let getEditPage = async (req, res) => {
    let [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [
        req.params.id,
    ]);
    return res.render('update.ejs', { dataUser: user[0] });
};

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute(
        'UPDATE users SET firstName= ?, lastName = ? , email = ? , address= ? WHERE id = ?',
        [firstName, lastName, email, address, id],
    );
    return res.redirect('/');
};

export default {
    getHomePage,
    getDetailPage,
    getCreatePage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser,
};
