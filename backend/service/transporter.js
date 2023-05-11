// const nodemailer = require("nodemailer");
//
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//     },
// });
//
//
// const sendActivationLink = (email, activationLink) => {
//     const mailOptions = {
//         from: 'altynbek.electro@gmail.com',
//         to: email,
//         subject: 'Активация аккаунта ElectroMarket.kg',
//         html: `
//                     <h3>CTF</h3>
//                     <p>Для активации аккаунта, перейдите по ссылке: </p>
//                     <a href="${process.env.API_URL}/users/activate/${activationLink}">${process.env.API_URL}/activate/${activationLink}</a>
//                 `,
//     };
//
//     transporter.sendMail(mailOptions);
// };
//
// const sendResetPasswordLink = (id, token, email) => {
//     const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password/${id}/${token}`;
//
//     const mailOptions = {
//         from: 'altynbek.electro@gmail.com',
//         to: email,
//         subject: 'ElectroMarket Reset Password',
//         html: `
//                     <h3>ElectroMarket.kg</h3>
//                     <p>Для того чтобы сбросить свой пароль, перейдите по ссылке:</p>
//                     <a href="${resetPasswordLink}">${resetPasswordLink}</a>
//                     <p>Если это не вы, то просто проигнорируйте это письмо.</p>
//                 `,
//     };
//
//     transporter.sendMail(mailOptions);
// };
//
// module.exports = {
//     sendActivationLink,
//     sendResetPasswordLink,
// };
//
//
