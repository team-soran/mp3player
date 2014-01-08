var _cache = {'env': {}, 'files': []},
    _template = {
      'mp3-list': function(path, artist, title, album) {
        return '<tr data-fpath="' + path + '"><td>#</td><td>' + artist +
               '</td><td>' + title + '</td><td>' + album + '</td></tr>';
      },
    };

var getTags = function(file, callback) {
  var path = file.webkitRelativePath,
      reader = FileAPIReader(file);
  ID3.loadTags(path, function() {
      var tags = ID3.getAllTags(path);
      callback({
        'path': path,
        'artist': tags.artist,
        'title': tags.title,
        'album': tags.album
      });
  }, {
    'dataReader': reader
  });
};

var listing = function() {
  $.each(_cache['files'], function(i, file) {
    getTags(file, function(t) {
      var _html = _template['mp3-list'](t.path, t.artist, t.title, t.album);
      _cache['env'][t.path] = {'findex': i, 'tag': t};
      $('#mp3-list').append($(_html));
    })
  });
};

var readFiles = function(files) {
  _cache['files'] = [];
  for(i in files) {
    var file = files[i];
    if(file !== undefined && file.name !== undefined &&
       file.name.indexOf('mp3') != -1) {
      _cache['files'].push(file);
    }
  }
  listing();
};

var playSong = function(fpath) {
  var i = _cache['env'][fpath]['findex'],
      url = window.webkitURL.createObjectURL(_cache['files'][i]),
      player = document.getElementById('player');
  player.src = url;
  player.play();
};

$(document).ready(function() {
  $("#mp3-list").on('click', 'tr', function() {
    var $this = $(this),
        p = $this.data('fpath');
    playSong(p);
  });
});