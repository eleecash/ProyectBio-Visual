module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current', // Esto asegura que se compile para la versión actual de Node.js
          },
        },
      ],
    ],
  };
  