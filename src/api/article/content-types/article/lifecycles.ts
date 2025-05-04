import { emailTemplate } from "../../../../../helper/emailContent";

export default {
  async afterCreate(event) {
    const { result } = event;
    const { title, description } = result;
    strapi.log.info("Article created:", { title, description });

    const emails = await strapi.entityService.findMany("api::email.email", {
      fields: ["email", "token"],
    });
    if (!emails.length) {
      strapi.log.info("No emails found to send notifications to.");
      return;
    }

    strapi.log.info(
      `Preparing to send emails to ${emails.length} recipients...`
    );

    const emailPromises = emails.map(({ email, token }) => {
      strapi.log.info(`Preparing email for: ${email}`);

      const serverAddress = process.env.SERVER_URL;

      if (!serverAddress) {
        strapi.log.error(
          `SERVER_URL environment variable is not set. Cannot create unsubscribe link for ${email}.`
        );
        return Promise.reject(
          new Error(`SERVER_URL not configured for email to ${email}`)
        );
      }

      const unsubscribeLink = `${serverAddress}/api/email/unsub?token=${token}`;

      const emailHtmlContent = emailTemplate(
        title,
        description,
        unsubscribeLink
      );

      return strapi
        .plugin("email")
        .service(email)
        .send({
          to: email,
          from: process.env.SMTP_USER || "info@sip-jkt.com",
          subject: `New Article Published: ${title}`,
          html: emailHtmlContent,
        });
    });

    strapi.log.info("Starting parallel email sending...");
    const res = await Promise.allSettled(emailPromises);
    strapi.log.info("All email sending attempts completed.");

    let successCount = 0;
    let failCount = 0;

    res.forEach((result, index) => {
      const recipientEmail = emails[index].email || "unknown recipient";

      if (result.status === "fulfilled") {
        strapi.log.info(`Email sent successfully to: ${recipientEmail}`);
        successCount++;
      } else {
        strapi.log.error(`Error sending email to: ${recipientEmail}`);

        strapi.log.error("Rejection Reason:", result.reason);

        console.error(`Failed for ${recipientEmail}:`, result.reason);
        failCount++;
      }
    });
    strapi.log.info(
      `Email sending summary: ${successCount} succeeded, ${failCount} failed.`
    );
  },
};
