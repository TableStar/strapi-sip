import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::email.email', ({ strapi }) => ({
  async unsub(ctx) {
    const { token } = ctx.query; // Get the token from the query params

    if (!token) {
      return ctx.badRequest('Token is required');
    }

    try {
      // Use the query builder to find the email record by token
      const emailRecord = await strapi.db.query('api::email.email').findOne({
        select: ['id', 'token'], // Selecting relevant fields
        where: { token }, // Filtering by token
      });

      if (!emailRecord) {
        return ctx.notFound('Email not found');
      }

      // Delete the email record
      await strapi.db.query('api::email.email').delete({
        where: { id: emailRecord.id }, // Delete by ID
      });

      // Return a success message
      return ctx.send({ message: 'You have been unsubscribed successfully.' });
    } catch (error) {
      strapi.log.error('Error processing unsubscribe:', error);
      return ctx.internalServerError('An error occurred while processing the request.');
    }
  },
}));