const helper = require('./helper')
const { users, tweets} = require('../models')
//connect()

var _ = require('lodash')

module.exports = {
  tweetsData : {},
  getTweetById: async function(id){
    let tweetDataObj = {}
    await tweets.findByPk(id).then(tweet=>{
      const createdTime = tweet.createdAt
      tweetDataObj[tweet.username] = [{
        id: tweet.id, 
        tweet: tweet.tweet,
        createdAt: helper.getTimeString(createdTime)}]
    })
    return tweetDataObj
  },
  getTweetsBySearch: async function(query){

    let result = {}

    let list = await tweets.findAll({raw: true})
    list = list.filter(function(value){return value.tweet.indexOf(query)>-1})
    _.forEach(list, function(value){

      if(typeof result[value.username] === 'undefined'){
        result[value.username] = []
      }

      result[value.username].push({
        id: value.id, 
        tweet: value.tweet, 
        createdAt: helper.getTimeString(value.createdAt)
      })
    })
    return result
  },
  create: async function(author, message){
    await tweets.create({username:author, tweet: message})
  },
  update: function(author, id, updateText){

    tweets.findOne({where: {id: id}}).then(tweet=>{
      tweet.update({tweet: updateText})
    })
  },
  delete: async function(author, id){
    await tweets.destroy({where: {id: id}})
  },
  initial: function(){
  },
  getAllTweet: async function(){
  let tweetsList = {}
    let list = await tweets.findAll({raw:true})
    _.forEach(list, function(value){
      if(typeof tweetsList[value.username] === 'undefined')
        tweetsList[value.username] = []
      tweetsList[value.username].push({
        id: value.id, 
        tweet: value.tweet, 
        createdAt: helper.getTimeString(value.createdAt)
      })
    })
    return tweetsList
  }
}