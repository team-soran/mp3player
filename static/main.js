var getTags = function(filename, callback) {
  ID3.loadTags(filename, function() {
      var tags = ID3.getAllTags(filename);
      callback({
        'artist': tags.artist,
        'title': tags.title,
        'album': tags.album
      });
  });
}
var listing = function(files) {
  console.log(files[0].urn);
  console.log(files[0].webkitRelativePath);
  console.log(files);
  getTags('file://D:/' + files[0].webkitRelativePath, function(tag) {
    console.log(tag);
  });
}
