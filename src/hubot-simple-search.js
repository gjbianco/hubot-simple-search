const _ = require('lodash')
const axios = require('axios')

const searchMap = {
  wiki: query => {
    return axios.get(`https://en.wikipedia.org/wiki/Special:Search/${query}`)
      .then(result => {
        console.log(_.keys(result.headers))
        console.log(result.headers.link)
        return result
      })
      .then(result => (result.data))
      // .then(JSON.parse)
      .then(url => {
        console.log('THE TYPE IS: ' + typeof url)
      })
    // return `https://en.wikipedia.org/wiki?search=${query}`
  },
  youtube: query => {
    return 'youtube.com'
  }
}

function generatePattern(map) {
  return new RegExp(`^!(${generateMapNames(map)}) (.*)$`, 'i')
}

function generateMapNames(map) {
  return _.chain(map)
          .keys()
          .join('|')
          .value()
  }

module.exports = robot => {

  robot.hear(generatePattern(searchMap), res => {
    searchMap[res.match[1]](res.match[2])
      .then(res.send)
  })

}
