// var pageIdComments has to be defined in each page using this functions.

function initializeCommentFeature() {
    $(function () {
        $('#comments .new-button').on('click', function (event) {
            showNewCommentForm();
        });

        $('#new-comment-text').on('keyup', function () {
            activatePostButtonIffThereIsText();
        });

        $('#comments .post-button').on('click', function () {
            postComment();
        });

        $('#comments .cancel-button').on('click', function () {
            cancelComment();
        });
    });
}

function showNewCommentForm() {
    console.log("show new comment form");
    $("#comments .new-button").hide();
    $('#comments .new-form').show();
    $('#new-comment-name').trigger("focus");
}

function activatePostButtonIffThereIsText() {
    if ($('#new-comment-text').val().length == 0) {
        $('#comments .post-button').attr('disabled', true);
    } else {
        $('#comments .post-button').attr('disabled', false);
    }
}

function postComment() {
    console.log("post comment");
    $.ajax({
        method: "POST",
        url: "php/addComment.php?pageId=" + pageIdComments,
        contentType: 'application/json',
        data: JSON.stringify({
            name: $('#new-comment-name').val(),
            email: $('#new-comment-email').val(),
            text: $('#new-comment-text').val().replace(/(\r\n|\n|\r)/gm, "[br]")
        }),
        success: function (resultingComment) {
            console.log("comment successfully posted");
            $('#new-comment-text').val('');
            hideNewCommentForm(function () {
                writeComment(resultingComment['name'], resultingComment['avatar'], resultingComment['timestamp'], resultingComment['text']);
            })
        }
    });
}

function hideNewCommentForm(doAfter) {
    $("#comments .new-form").hide('fast', function () {
        $('#comments .new-button').show('fast');
        doAfter();
    });
}

function cancelComment() {
    console.log("cancel comment");
    $('#comments .new-form').fadeOut('fast', function () {
        $('#comments .new-button').fadeIn('fast');
    });
}

function loadComments(pageId) {
    console.log("loadComments for pageId " + pageId);
    $.get("php/loadComments.php?pageId=" + pageId, function (comments, status) {
        console.log("loadComments - status: " + status + ", data: " + comments);
        if (comments != null) {
            for (var i = 0; i < comments.length; i++) {
                writeComment(comments[i]['name'], comments[i]['avatar'], comments[i]['timestamp'], comments[i]['text']);
            }
        }
    });
}

function writeComment(name, avatarUrl, timestamp, text) {
    console.log("write comment by " + name + " at " + timestamp);
    var result = $("#comment-template").clone();
    result.find(".avatar").attr("src", avatarUrl);
    result.find(".name").html(name);
    result.find(".date").html(timestamp);
    var commentMod = text.replace(/\[br\]/g, "<br>");
    result.find(".text").html(commentMod);
    result.removeAttr('id');
    result.show();
    $(".clear").after(result);
    return result;
}

$(document).ready(function () {
    $('#comment-template').hide();
    //disable post btn at beginning
    $('#comments .post-button').attr('disabled', true);
    initializeCommentFeature();
    loadComments(pageIdComments);
});
