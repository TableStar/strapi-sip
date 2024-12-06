import crypto from 'crypto';

export default {
  async beforeCreate(event) {
    const { data } = event.params;

    if (!data.token && data.email) {
      const token = crypto.randomBytes(32).toString('hex'); 
      data.token = token;
    }
  },
};