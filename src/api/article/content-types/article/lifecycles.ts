import { emailTemplate } from "../../../../../helper/emailContent";

export default {
  async afterCreate(event) {
    const { result } = event; 
    const { title, description } = result;
        strapi.log.info('Article created:', { title, description });

    const emails = await strapi.entityService.findMany('api::email.email', {
      fields: ['email', 'token'],
    });
    if (emails.length < 1) {
      return; 
    }

    for (const { email, token } of emails) {
  
      strapi.log.info('Sending email to:', email);

      // Create the unsubscribe link
      const serverAddress = process.env.SERVER_URL
      const unsubscribeLink = `${serverAddress}/api/email/unsub?token=${token}`;

      // Prepare the email content
      const emailHtmlContent = emailTemplate(title,description,unsubscribeLink)

      try {
      
        await strapi.plugin('email').service('email').send({
          to: email,
          from: 'your-email@example.com', 
          subject: `New Article Published: ${title}`,
          html: emailHtmlContent,
        });

        strapi.log.info('Email sent successfully to:', email);
      } catch (error) {
        strapi.log.error('Error sending email to:', email, error);
      }
    }
  },
};