var request   = require('request');
var twitchcmd = require('twitchcmd');

var commands = {
  giphy: {
    mod:     true,
    handler: giphy,
  }
};

var timers = [{
  seconds: 10,
  handler: function() {
    return giphy(['test'], true);
  }
}];

var config = {
  twitch: {
    name:       'examplebot',
    password:   'oauth:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    channel:    '#example',
    filterSpam:  true,
  },
  joinMessage: 'hi',
  partMessage: 'bye',
  debug:       true,
  commands:    commands,
  timers:      timers
};

twitchcmd.init(config);

process.on('SIGINT', () => {
  twitchcmd.exit();
});

// Handlers

function giphy(args) {
  var opts = {
    json: true,
    qs: {
      q:       args.join(' '),
      api_key: 'dc6zaTOxFJmzC'
    }
  };

  return new Promise(function(resolve, reject) {
    request.get('http://api.giphy.com/v1/gifs/search', opts, function(err, res) {
      if (err)
        reject(err);
      else if (res.body.data && res.body.data.length)
        resolve(res.body.data[0].images.original.url);
      else
        resolve();
    });
  });
}
