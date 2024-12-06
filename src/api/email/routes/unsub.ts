export default {
  routes: [
    {
      method: 'GET', // Use GET method to handle unsubscribe requests
      path: '/email/unsub', // Your custom path for unsubscribing
      handler: 'unsub.unsub', // The controller method that will handle the request
      config: {
        auth:false,
        policies: [], // No policies here, add any if needed
      },
    },
  ],
};