var el = require('code42day-el');
var tweet2html = require('code42day-tweet-html');
var request = require('visionmedia-superagent');

module.exports = function (username) {
  var self, my = {
    username: username,
    count: 10
  };

  function count(c) {
    my.count = c;
    return self;
  }

  function renderTweets(container) {
    var url = '/1.1/statuses/user_timeline.json';

    request(url)
    .query({
      screen_name: my.username,
      count: my.count,
      trim_user: 1,
      include_entities: 1
    })
    .end(function(res) {
      if (!res.ok) {
        return;
      }
      var tweets = res.body.map(function(tweet) {
        return el('li.tweet', tweet2html(tweet, my.username));
      });
      container.innerHTML = el('ul.timeline', tweets.join(''));
    });
  }

  self = {
    count: count,
    render: renderTweets
  };

  return self;
};