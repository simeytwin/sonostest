'use strict';
const allPlayerAnnouncement = require('../helpers/all-player-announcement');

let port;

let settings = {};

try {
  settings = require.main.require('./settings.json');
} catch (e) {
}

function playClipOnAll(player, values) {
  const clipFileName = values[0];
  let announceVolume = settings.announceVolume || 40;

  if (/^\d+$/i.test(values[1])) {
    // first parameter is volume
    announceVolume = values[1];
  }

  return allPlayerAnnouncement(player.system, `http://${player.system.localEndpoint}:${port}/clips/${clipFileName}`, announceVolume);
}

module.exports = function (api) {
  port = api.getPort();
  api.registerAction('clipall', playClipOnAll);
}