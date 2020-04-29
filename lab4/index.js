var pubnubDemo = new PubNub({
  publishKey: 'pub-c-b931c396-73b9-4718-8c6b-4571e7959567',
  subscribeKey: 'sub-c-cc3aa0a0-846f-11ea-885f-2621b2dc68c7'
});
pubnubDemo.publish({ message: { "color": "blue" }, channel: 'demo_tutorial' });
pubnubDemo.addListener({
  message: function (message) {
    console.log(message)
  }
})
pubnubDemo.subscribe({ channels: ['demo_tutorial'] });

window.onload = function () {
  var Words = document.getElementById("words");
  var TalkWords = document.getElementById("talkwords");
  var TalkSub = document.getElementById("talksub");

  TalkSub.onclick = function () {
    var str = "";
    if (TalkWords.value == "") {
      alert("Can't send empty message.");
      return;
    }
    str = '<div class="btalk"><span>' + TalkWords.value + '</span></div>';
    Words.innerHTML = Words.innerHTML + str;
    TalkWords.value = ""
  }
}
