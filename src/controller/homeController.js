import pool from "../configs/connectDB"

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users` ');
    return res.render('index.ejs', { dataUser: rows })
}

let getDetailPage = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM `users` WHERE `id` = ?', [req.params.id]);
    return res.json({ dataUser: rows })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',  [firstName, lastName, email, address]);
   return res.redirect('/')
}
export default {
    getHomePage,
    getDetailPage,
    createNewUser
}