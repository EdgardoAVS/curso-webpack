const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require("dotenv-webpack");

//Creamos un modulo que sera exportado 
module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpack
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    filename: "[name].[contenthash].js"
  },
  mode: "development",
  watch: true,
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    }
  },
  module: {
    rules: [
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\.js$/,
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: "babel-loader"
        },
        // Exclude permite omitir archivos o carpetas especificas
        exclude: /node_modules/
      },
      {
        test: /\.css|.styl$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "stylus-loader"
        ]
      },
      {
        test: /\.png/,
        type: "asset/resource"
      },
      {
        test: /\.(woff|woff2)$/i,  // Tipos de fuentes a incluir
        type: 'asset/resource',  // Tipo de módulo a usar (este mismo puede ser usado para archivos de imágenes)
        generator: {
          filename: 'static/fonts/[name].[contenthash][ext][query]',  // Directorio de salida
        },
      
      },
    ]
  },
  // SECCION DE PLUGINS
  plugins: [
    new HtmlWebpackPlugin({ 
      // CONFIGURACIÓN DEL PLUGIN
      inject: "body", // INYECTA EL BUNDLE AL TEMPLATE HTML
      template: './public/index.html', // LA RUTA AL TEMPLATE HTML
      filename: './index.html' // NOMBRE FINAL DEL ARCHIVO
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(),
  ],
};