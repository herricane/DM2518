const words = document.getElementById("words");
const talkWords = document.getElementById("talkwords");
const talkSub = document.getElementById("talksub");
talkSub.addEventListener('click', () => { submitUpdate(talkWords.value) })

const pubnubDemo = new PubNub({
  publishKey: 'pub-c-b931c396-73b9-4718-8c6b-4571e7959567',
  subscribeKey: 'sub-c-cc3aa0a0-846f-11ea-885f-2621b2dc68c7'
});

pubnubDemo.addListener({
  message: function (event) {
    let update = event.message.update;
    let str = '<div class="atalk"><span>' + update + '</span></div>';
    words.innerHTML = words.innerHTML + str;
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
    message: { 'update': update }
  }, function () {
    let str = '<div class="btalk"><span>' + update + '</span></div>';
    words.innerHTML = words.innerHTML + str;
    talkWords.value = ""
  })
}

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
    // just serve up the EventListener w/o permissions here
    window.addEventListener('deviceorientation', handleOrientation, true);
  }
}

function handleOrientation(event) {
  var heading = event.alpha;

  // some browsers don't understand "alpha"
  if (typeof event.webkitCompassHeading !== "undefined") {
    heading = event.webkitCompassHeading;
  }

  document.getElementById("heading").innerHTML = heading.toFixed([0]);
}
