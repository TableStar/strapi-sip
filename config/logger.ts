module.exports = {
    level: 'debug', // Change this to 'debug' for more detailed logs
    transports: [
      new (require('winston').transports.Console)({
        format: require('winston').format.combine(
          require('winston').format.colorize(),
          require('winston').format.simple()
        ),
      }),
    ],
  };