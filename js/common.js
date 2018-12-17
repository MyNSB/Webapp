var messages = [
    "It is pitch black. You are likely to be eaten by a grue.",
    "Always remember you're unique, just like everyone else.",
    "It is far more impressive when others discover your good qualities without your help.",
    "If at first you don't succeed, skydiving is not for you.",
    "Never miss a good chance to shut up.",
    "If you drink, don't park; accidents cause people.",
    "Don't squat with your spurs on.",
    "Never test the depth of the water with both feet.",
    "It may be that your sole purpose in life is simply to serve as a warning to others.",
    "Experience is something you don't get until just after you need it."
    ]

var randomMessage = messages[Math.floor(Math.random()*messages.length)];

$(document).ready(function() {
    $("#message").html(randomMessage)
})