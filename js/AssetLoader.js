/**
Enables assets (images) to be queued and downloaded.  
Once they are all downloaded, and stored in the cache, isDone() will 
return true.
*/
function AssetManager() 
{
  this.successCount = 0;
  this.errorCount = 0;
  this.cache = {};
  this.downloadQueue = [];

  this.queueDownload = function(name, path) 
  {
      this.downloadQueue.push({name:name, path:path});
  }

  this.downloadAll = function(downloadCallback) 
  {
    //Scenario this if block deals with:
    //if the asset manager doesn’t have any assets queued up for download? 
    //The isDone method is never triggered, and the game never starts.  
    if (this.downloadQueue.length === 0) {
        downloadCallback();
    }
   

    for (var i = 0; i < this.downloadQueue.length; i++) 
    {
      var path = this.downloadQueue[i].path;
      var assetName = this.downloadQueue[i].name;

      var img = new Image();
      var that = this;
      
      img.onload =  function() 
        {
          that.successCount += 1;
          if (that.isDone()) 
          {
              downloadCallback();
          }

        }

      img.onerror = function() 
        {
          that.errorCount += 1;
          if (that.isDone()) 
          {
              downloadCallback();
          }
        }

      img.src = path;
      this.cache[assetName] = img;
    }
  }

  this.isDone = function() 
  {
    var count = this.successCount + this.errorCount;
    var complete = (this.downloadQueue.length == count);

    return complete;
  }

  this.getAsset = function(name) 
  {
    return this.cache[name];
  }

}