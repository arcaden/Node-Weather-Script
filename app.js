const yargs = require('yargs')
const axios = require('axios')
const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'address to fetch weather for',
        string: true,
    }
})
.help()
.alias('help','h')
.argv
const apiKey = process.env.GOOGLE_KEY // USE YOUR OWN GOOGLE KEY HERE
const encodedAddress = encodeURI(argv.address) 
const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?&address=${encodedAddress}&key=`+apiKey



axios.get(geoUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find any results')
        }

        const lat = response.data.results[0].geometry.location.lat
        const lng = response.data.results[0].geometry.location.lng
        console.log(response.data.results[0].formatted_address)
        const weather = `https://api.darksky.net/forecast/b10968d18fad326f84ad982520cc5766/${lat},${lng}?units=si`
        return axios.get(weather)
    })
    .then((response) => {
        const temperature = response.data.currently.apparentTemperature 
        const feelsLike = response.data.currently.apparentTemperature
        const summary = response.data.currently.summary

        console.log(`It's currently ${summary}. It is ${temperature} degrees and feels like ${feelsLike} outside`)
        
    })
    .catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('unable to connect')
    }
})


