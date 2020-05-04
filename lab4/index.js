const words = document.getElementById("words");
const talkWords = document.getElementById("talkwords");
const talkSub = document.getElementById("talksub");
talkSub.addEventListener('click', () => { submitUpdate(talkWords.value) })

function givePermission() {
  // feature detect
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
        }
      })
      .catch(console.error);
  } else {
    // handle regular non iOS 13+ devices
    window.addEventListener('deviceorientation', handleOrientation, true);
  }
}

function handleOrientation(event)
{
  var heading = event.alpha;
  if (typeof event.webkitCompassHeading !== "undefined") {
     heading = event.webkitCompassHeading;
   }
  document.getElementById("heading").innerHTML = heading.toFixed([0]);
}

const pubnubDemo = new PubNub({
  publishKey: 'pub-c-b931c396-73b9-4718-8c6b-4571e7959567',
  subscribeKey: 'sub-c-cc3aa0a0-846f-11ea-885f-2621b2dc68c7'
});

pubnubDemo.addListener({
  message: function (event) {
    let update = event.message.update;
    let orientation = parseInt(document.getElementById("heading").innerHTML);
    let dir = parseInt(event.message.orientation);
<<<<<<< HEAD
    let ans = Math.abs(dir-orientation)>180? 360-Math.abs(dir-orientation):Math.abs(dir-orientation);
    if (ans < 45) {
      let str = '<div class="atalk"><span>' + update +'<br>'+dir+"  "+orientation + '</span>' +'</div>';
=======
    let diff = Math.abs(dir - orientation);
    if ((diff < 180 ? diff : 360 - diff) < 45) {
      let str = '<div class="atalk"><span>' + update 
      + '<br />' + dir
      + '<br />' + orientation
      + '</span></div>';
>>>>>>> 2188bcb247083a89a5d09548f6c7301c4fc6e548
      words.innerHTML = words.innerHTML + str;
    }
  }
})


pubnubDemo.subscribe({ channels: ['demo_tutorial'] });

submitUpdate = function (update) {
  if (update === "") {
    alert("Message can't be empty.");
    return;
  }
  pubnubDemo.publish({
    channel: 'demo_tutorial',
    message: { 
      'update': update, 
      'orientation': document.getElementById("heading").innerHTML 
    }
  }, function () {
    let str = '<div class="btalk"><span>' + update + '</span></div>';
    words.innerHTML = words.innerHTML + str;
    talkWords.value = "";
  })
}
