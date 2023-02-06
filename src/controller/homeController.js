import pool from '../configs/connectDB';
import multer from 'multer';

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
        'UPDATE users SET firstName= ?, lastName = ? , email = ? , address= ?   WHERE id = ?',
        [firstName, lastName, email, address, id],
    );
    return res.redirect('/');
};

let getUploadFilePage = (req, res) => {
    res.render('uploadFile.ejs');
};

let handleUploadFile = (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    } else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    // Display uploaded image for user validation
    res.send(
        `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`,
    );
};

let handleUploadMultipleFiles = async (req, res, next) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    } else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = 'You have uploaded these images: <hr />';
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
};

export default {
    getHomePage,
    getDetailPage,
    getCreatePage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMultipleFiles,
};