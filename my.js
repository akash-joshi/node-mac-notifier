var notifier = require('./');
var nc = new notifier.NotificationCenter();

const moment = require('moment');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ sentNotifs: {} }).write();

const currentDate = moment().format('YYYY-MM-DD');

if (!db.has(`sendNotifs.${currentDate}`).value()) {
  nc.notify(
    {
      title: 'Daily Report',
      message: 'Did you put in your daily report ?',
      sound: 'Funk',
      wait: true,
      timeout: 60,
      open:
        'https://mail.google.com/mail/u/1/#search/wf/FMfcgxwHMPhsCQgdVtTDFTHtFdbKlWpq',
      // case sensitive
    },
    function (err, response, metadata) {
      if (err) throw err;
      const newResponse = [1];
      db.set(`sendNotifs.${currentDate}`, newResponse).write();
    }
  );
} else {
  if(db.get(`sendNotifs.${currentDate}`).value().length === 1) {
    nc.notify(
      {
        title: 'Daily Report',
        message: 'Did you put in your daily report ?',
        sound: 'Funk',
        wait: true,
        timeout: 60,
        open:
          'https://mail.google.com/mail/u/1/#search/wf/FMfcgxwHMPhsCQgdVtTDFTHtFdbKlWpq',
        // case sensitive
      },
      function (err, response, metadata) {
        if (err) throw err;
        const newResponse = [1, 1];
        db.set(`sendNotifs.${currentDate}`, newResponse).write();
      }
    );
  }
}

console.log("script exit")
