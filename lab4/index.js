const Words = document.getElementById("words");
const TalkWords = document.getElementById("talkwords");
const TalkSub = document.getElementById("talksub");
TalkSub.addEventListener('click', () => { submitUpdate(TalkWords.value) })

const pubnubDemo = new PubNub({
  publishKey: 'pub-c-b931c396-73b9-4718-8c6b-4571e7959567',
  subscribeKey: 'sub-c-cc3aa0a0-846f-11ea-885f-2621b2dc68c7'
});

pubnubDemo.addListener({
  message: function (event) {
    let update = event.message.update;
    let str = '<div class="atalk"><span>' + update + '</span></div>';
    Words.innerHTML = Words.innerHTML + str;
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
    Words.innerHTML = Words.innerHTML + str;
    TalkWords.value = ""
  })
}
