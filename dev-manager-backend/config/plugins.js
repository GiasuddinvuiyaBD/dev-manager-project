// module.exports = ({ env }) => ({
//     email: {
//       config: {
//         provider: 'nodemailer',
//         providerOptions: {
//           host: env('SMTP_HOST', 'EMAIL_SMTP_HOST'),
//           port: env('SMTP_PORT', 587),
//           auth: {
//             user: env('EMAIL_SMTP_USER'),
//             pass: env('EMAIL_SMTP_PASS'),
//           },
//         },
//         settings: {
//           defaultFrom: 'giasuddinvuiya2022@gmail.com',
//           defaultReplyTo: 'giasuddinvuiya2022@gmail.com',
//         },
//       },
//     },
//   });

// -------------
module.exports = ({ env }) => ({

  // ...
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API'),
      },
      settings: {
        defaultFrom: 'giasuddinvuiya2022@gmail.com',
        defaultReplyTo: 'giasuddinvuiya2022@gmail.com',
      },
    },
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },     
  },
  // ...
   
});