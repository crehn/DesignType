// var pageIdComments has to be defined in each page using this functions.

function writeComment(theName, theAvatarUrl, theDate, theComment) {
    //console.log("write comment: "+ theComment);
    var result = $("#templateSingleComment").clone();
    result.find("img").attr("src", theAvatarUrl);
    result.find("div.thecom").find("h5").html(theName);
    result.find("div.thecom").find("span").html(theDate);
    // replace placeholder with real line break
    var commentMod = theComment.replace(/\[br\]/g, "<br/>");
    result.find("div.thecom").find("p").html(commentMod);
    result.attr('id', 'copiedCommentId');
    result.show();
    $(".clear").after(result);
    return result;
}

function initializeCommentFunction() {
  $(function() {
      $('.new-com-bt').click(function(event){    
          $(this).hide();
          $('.new-com-cnt').show();
          $('#name-com').focus();
      });

      /* when start writing the comment activate the "add" button */
      $('.the-new-com').bind('input propertychange', function() {
         $(".bt-add-com").css({opacity:0.6});
         var checklength = $(this).val().length;
         if(checklength){ $(".bt-add-com").css({opacity:1}); }
      });

      /* on clic  on the cancel button */
      $('.bt-cancel-com').click(function(){
          $('.the-new-com').val('');
          $('.new-com-cnt').fadeOut('fast', function(){
              $('.new-com-bt').fadeIn('fast');
          });
      });

      // on post comment click
      $('.bt-add-com').click(function(){
          var theCom = $('.the-new-com');
          // substitute real line break by placeholder
          var theComMod = theCom.val().replace(/(\r\n|\n|\r)/gm, "[br]");
          //var theComModImmediate = theCom.val().replace(/(\r\n|\n|\r)/gm, "<br/>");
          var theName = $('#name-com');
          var theMail = $('#mail-com');

          if( !theCom.val()){
              alert('You need to write a comment!');
          }else{
              $.ajax({
                  type: "POST",
                  url: "./php/addComment.php",
                  data: 'act=add-com&id_post='+pageIdComments+'&name='+theName.val()+'&email='+theMail.val()+'&comment='+theComMod,
                  success: function(html){
                      theCom.val('');
                      theMail.val('');
                      theName.val('');
                      $('.new-com-cnt').hide('fast', function(){
                          $('.new-com-bt').show('fast');
                          var htmlMod = html.replace(/\[br\]/g, "<br/>");
                          $('.clear').after(htmlMod);  
                      })
                  }  
              });
          }
      });

  });
}

function loadComments(pageId) {
   var allComments;
   console.log("loadComments - pageId: " + pageId);
   $.when( 
        $.get("./php/loadComments.php?pageId=" + pageId, function(data, status) {
            console.log("loadComments - status: " + status + ", data: " + data);
            allComments = jQuery.parseJSON(data);
        })
   ).then( function() {
	    if (allComments != null) {
	        for(var i=0; i < allComments.length ;i++) {
	          writeComment(allComments[i][0], allComments[i][1], allComments[i][3], allComments[i][2]);
	        } 
   		}
    });
} 

$(document).ready(function() {

  $('#templateSingleComment').hide();
  
  initializeCommentFunction();  

  loadComments(pageIdComments);
});