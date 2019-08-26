'use strict';
module.exports = (sequelize, DataTypes) => {
  const tweets = sequelize.define('tweets', {
    tweet: DataTypes.STRING,
    username: DataTypes.STRING
  }, {});
  tweets.associate = function(models) {
    // associations can be defined here
  };
  return tweets;
};