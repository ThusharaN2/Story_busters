// Client facing scripts here
// Client facing scripts here
// const loveMarkup = `&#128512`
$(document).ready(function() {
console.log("hello doc");
  $("#story_1").click(function() {

    $(this).prepend(
     `❤️ `
    );
  });

  $("#story_2").click(function() {

    $(this).prepend(
     `❤️ `
    );
  });

  $("#story_3").click(function() {

    $(this).prepend(
     `❤️ `
    );
  });


  $("#story_4").click(function() {

    $(this).prepend(
     `❤️ `
    );
  });

  $("#story_5").click(function() {

      $(this).prepend(
       `❤️ `
      );
  });

  $("#story_6").click(function() {

    $(this).prepend(
     `❤️ `
    );
  });

  const upvoteButtons = [...document.querySelectorAll(".upvote")];
  console.log(upvoteButtons);

  upvoteButtons.forEach(upvoteButton => {
    console.log("hello")
    upvoteButton.addEventListener("click", () => {
      // getAttribute getting the Id.
      const upvoteId = upvoteButton.getAttribute("data-upvoteID");
      console.log(`I clicked on the upvote ${upvoteId}.`);

      $.ajax({
        url: "/add-to-stories/upvotes",
        data: { "upvoteID": upvoteId },
        method: "POST",
        type: "application/json",
        success: function (data) {
          console.log("i got here", data);
          //this will auto reload the page
          window.location.reload()
        },
        error: function (err) {
          console.log(err);
        }

      })
    })

  })

});
