import pool from "../configs/connectDB"

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users` ');
    return res.render('index.ejs', { dataUser: rows })
}

let getDetailPage = async (req, res) => {
    console.log(req.params);
    const [rows] = await pool.execute('SELECT * FROM `users` WHERE `id` = ?' , [req.params.id]);
    return res.json({ dataUser: rows })
}
export default {
    getHomePage,
    getDetailPage
}