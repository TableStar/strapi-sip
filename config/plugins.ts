export default ({env}) => ({
    email: {
        config: {
          provider: 'nodemailer',
          providerOptions: {
            host: env('SMTP_HOST', 'smtp.gmail.com'),
            port: env('SMTP_PORT', 587),
            secure:true,
            auth: {
              user: env('SMTP_USER'),
              pass: env('SMTP_PASS'),
            },
            // ... any custom nodemailer options
          },
          settings: {
            defaultFrom: 'afrasuperblack@gmail.com',
            defaultReplyTo: 'afrasuperblack@gmail.com',
          },
        },
      },
});
