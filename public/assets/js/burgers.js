$(function() {
    $(".change-devour").on("click", function(event) {
        var id = $(this).data("id");
        var newDevour = $(this).data("newdevour");
        console.log(newDevour);

        var newDevourState = {
            devour: newDevour
        };
        console.log(newDevourState);
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        }).then(function () {
            console.log("changed devour state to", newDevour);
            location.reload();
        })
    });

    $(".delete").on("click", function(event) {
        var id = $(this).data("id");
        $.ajax("/api/burgers/" + id, {
            type: "DELETE",
        }).then(function() {
            console.log(id, " has been deleted");
            location.reload();
        });
    });

    $("#create-form").on("submit", function(event){
        event.preventDefault();

        var addedBurger = {
            burger_name: $("#addBurger").val().trim()
        };
        console.log(addedBurger);

        $.ajax("/api/burgers", {
            type: "POST",
            data: addedBurger
        }).then(function() {
            console.log("new burger created");
            location.reload();
        })
    })

})