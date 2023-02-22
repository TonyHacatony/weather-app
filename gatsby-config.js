require("dotenv").config({
  path: '.env',
})

module.exports = {
  siteMetadata: {
    title: 'EV - Weather App',
  },
  plugins: [
    `gatsby-plugin-sass`,
  ],
}
