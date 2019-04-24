class CustomHtmlElement extends HTMLElement {
    constructor(self) {
        self = super(self);
        this.innerHTML = this.html();
        this.init();
        return self;
    }

    init() { }
    html() { }
}


class DtNavigation extends CustomHtmlElement {
    html() {
        return /*html*/`
        <style>
            dt-nav .last-item-in-group {
                border-bottom: 1px solid #757575;
            }
        </style>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
        <div class="container">
            <a class="navbar-brand" href="/index.html">Design-Types.net</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="nav navbar-nav mr-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="/design_types.html" id="dropdown01" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">Design Types</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown01">
                            <a class="dropdown-item" href="/design_types.html">Concepts</a>
                            <a class="dropdown-item" href="/dimensions.html">Dimensions</a>
                            <a class="dropdown-item last-item-in-group" href="/types.html">Types</a>
                            <a class="dropdown-item" href="/test_yourself.html">Test Yourself</a>
                            <a class="dropdown-item last-item-in-group" href="/assess_colleagues.html?revealed">Assess Colleagues</a>
                            <a class="dropdown-item" href="/statistics.html">Statistics</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/matrix.html">Design Matrix</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="/design_cards.html" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Design Cards</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown02">
                            <a class="dropdown-item" href="/design_cards.html">Introduction</a>
                            <a class="dropdown-item" href="/cards_detail.html">More Details on the Cards</a>
                            <a class="dropdown-item last-item-in-group" href="/cards_get_them.html">Get the Cards</a>
                            <a class="dropdown-item" href="/cards_usage_alone.html">Using the Cards Alone</a>
                            <a class="dropdown-item" href="/cards_discussions.html">Using the Cards in Discussions</a>
                            <a class="dropdown-item last-item-in-group" href="/cardgames.html">Cards Gamification</a>
                            <a class="dropdown-item external" href="http://www.principles-wiki.net">principles-wiki.net</a>                        
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/design_knights.html" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">About</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown03">
                        <a class="dropdown-item" href="/design_knights.html">The Design Knights</a>
                        <a class="dropdown-item" href="/timeline.html">Timeline</a>
                        <a class="dropdown-item" href="/faq.html">FAQ</a>
                    </div>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
        `;
    }

    init() {
        $(this).find(`a.nav-link:contains("${this.getAttribute('active')}")`).addClass('active');
        $(this).find(`a.dropdown-item:contains("${this.getAttribute('subitem')}")`).prepend('➤ ');
    }
}
window.customElements.define('dt-nav', DtNavigation);


class DtImageLightbox extends CustomHtmlElement {
    html() {
        return /*html*/`
        <style>
            .pop {
                cursor:pointer;
            }
        </style>
        <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" data-dismiss="modal">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <img src="" class="imagepreview" style="width: 100%;" alt="" />
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    init() {
        $('.pop').on('click', (event) => {
            debuglog(event.target);
            var src = $(event.target).attr('src');
            src = src.replace("_sm.", ".");
            $(this).find('.imagepreview').attr('src', src);
            $(this).find('.modal').modal('show');
        });
    }
}
window.customElements.define('dt-img-lightbox', DtImageLightbox);

class DtComments extends CustomHtmlElement {
    getRelativePath() { return ""; } // for subcomponents to define relative path
    getCommentHtmlTag() { return "dt-comments"; }  // for subcomponents to define own html tag

    html() {
        return /*html*/`
        <style>
            ${this.getCommentHtmlTag()} .new-button {
                margin: 0.5rem 0;
                border: 1px solid #d3d7dc;
                border-radius: 3px;
                padding: 0.5em 0.75em;
                background-color: #f9f9f9;

                cursor: text;
                color: #adb2bb;
                font-size: 13px;
            }

            ${this.getCommentHtmlTag()} .new-form {
                display: none;
                border-top: 1px dotted #d9d9d9;
                padding: 1em 0em;
            }

            ${this.getCommentHtmlTag()} input[type="text"]{
                width: 15em;
                margin: 0.125em;
                border: 1px solid #d3d7dc;
                border-radius: 3px;
                padding: 0.25em;
                background-color: #f9f9f9;
                color: #333;
            }

            ${this.getCommentHtmlTag()} textarea {
                width: 98%;
                min-height: 8em;
                margin: 0.125em;
                border: 1px solid #d3d7dc;
                border-radius: 3px;
                padding: 0.25em;
                background-color: #f9f9f9;
                color: #333;
            }

            ${this.getCommentHtmlTag()} textarea:focus, ${this.getCommentHtmlTag()} input[type="text"]:focus {
                outline: #f6a828 thin solid;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.4);
            }

            ${this.getCommentHtmlTag()} .comment-container{
                padding: 0.5rem 0;
            }

            ${this.getCommentHtmlTag()} .comment {
                padding: 0.25em 0em;
                min-height: 45px;
            }

            ${this.getCommentHtmlTag()} .avatar{
                float: left;
                margin-right: 10px;
                border-radius: 3px;
            }

            ${this.getCommentHtmlTag()} .comment .name {
                display: inline;
                margin: 0 1em 0 0;
                font-family: tahoma;
                font-size: 13px;
                color: #3b5998;
            }

            ${this.getCommentHtmlTag()} .comment .date {
                font-size: 12px;
                color: #757575;
            }

            ${this.getCommentHtmlTag()} .comment .text {
                margin: 5px 5px 5px 45px;
            }

            .commentmarginhorizontal {
            	margin: 0rem 0.5rem;
            }
        </style>
        <section id="comments">
            <div id="comment-template" class="comment">
                <img src="${this.getRelativePath()}img/avatar.png" alt="" class="avatar">
                <div>
                    <h5 class="name">Template name</h5>
                    <span class="date">Template date</span>
                    <br>
                    <p class="text">Template comment</p>
                </div>
            </div>

            <div class="comment-container">
                <div class="new-button">
                    <span>Write a comment ...</span>
                </div>
                <div class="new-form">
                    <input type="text" id="new-comment-name" value="" placeholder="Your name">
                    <input type="text" id="new-comment-email" value="" placeholder="Your e-mail address">
                    <textarea id="new-comment-text"></textarea>
                    <button class="btn btn-primary post-button" disabled>Post comment</button>
                    <button class="btn btn-secondary cancel-button">Cancel</button>
                </div>
                <div class="clear"></div>
            </div>
        </section>
        `;
    }

    init() {
        this.pageId = this.getAttribute('pageid');
        $('#comment-template').hide();
        $(this.getCommentHtmlTag() + ' .new-button').on('click', () => this._showNewCommentForm());
        $('#new-comment-text').on('keyup', () => this._activatePostButtonIffThereIsText());
        $(this.getCommentHtmlTag() + ' .post-button').on('click', () => this.postComment());
        $(this.getCommentHtmlTag() + ' .cancel-button').on('click', () => this._cancelComment());
        this.loadComments();
    }

    _showNewCommentForm() {
        debuglog("show new comment form");
        $(this.getCommentHtmlTag() + ' .new-button').hide();
        $(this.getCommentHtmlTag() + ' .new-form').show();
        $('#new-comment-name').trigger("focus");
    }

    _activatePostButtonIffThereIsText() {
        if ($('#new-comment-text').val().length == 0) {
            $(this.getCommentHtmlTag() + ' .post-button').attr('disabled', true);
        } else {
            $(this.getCommentHtmlTag() + ' .post-button').attr('disabled', false);
        }
    }

    postComment() {
        debuglog("post comment");
        $.ajax({
            method: "POST",
            url: this.getRelativePath() + "php/addComment.php?pageId=" + this.pageId,
            contentType: 'application/json',
            data: JSON.stringify({
                name: $('#new-comment-name').val(),
                email: $('#new-comment-email').val(),
                text: $('#new-comment-text').val().replace(/(\r\n|\n|\r)/gm, "[br]")
            }),
            success: resultingComment => {
                debuglog("comment successfully posted");
                $('#new-comment-text').val('');
                this._hideNewCommentForm();
                this._writeComment(resultingComment.name, resultingComment.avatar, resultingComment.timestamp, resultingComment.text);
            }
        });
    }

    _hideNewCommentForm() {
        $(this.getCommentHtmlTag() + ' .new-form').hide('fast', () => $(this.getCommentHtmlTag() + ' .new-button').show('fast'));
    }

    _cancelComment() {
        debuglog("cancel comment");
        $(this.getCommentHtmlTag() + ' .new-form').fadeOut('fast', () => $(this.getCommentHtmlTag() + ' .new-button').fadeIn('fast'));
    }

    _writeComment(name, avatarUrl, timestamp, text) {
        debuglog("write comment by " + name + " at " + timestamp);
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

    loadComments() {
        debuglog("loadComments for pageId " + this.pageId);
        $.get(this.getRelativePath() + "php/loadComments.php?pageId=" + this.pageId, (comments, status) => {
            debuglog("loadComments - status: " + status + ", data: " + comments);
            if (comments != null) {
                for (var i = 0; i < comments.length; i++) {
                    this._writeComment(comments[i].name, comments[i].avatar, comments[i].timestamp, comments[i].text);
                }
            }
        });
    }

}
window.customElements.define('dt-comments', DtComments);

class DtCommentsSubfolder extends DtComments {
    getRelativePath() { return "../"; }
    getCommentHtmlTag() { return "dt-comments-subfolder"; }
}
window.customElements.define('dt-comments-subfolder', DtCommentsSubfolder);

class DtSidebar extends CustomHtmlElement {
    html() {
        return /*html*/`
        <style>
            dt-sidebar {
                font-size: 0.9rem;
                background-color: #EEEEEE;
            }
            
            dt-sidebar section {
                margin-bottom: 2rem;
            }
            
            dt-sidebar h1 {
                font-size: 1.2rem;
            }
        </style>
        <div class="">
            <section>
                <h1>Support</h1>
                <p>
                    We've created design-types.net in our spare time hoping that it will be helpful to many people. Please consider supporting
                    us by making a donation or by <a href="/cards_get_them.html">buying a Design Cards set</a>.
                </p>
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" class="text-center">
                    <input type="hidden" name="cmd" value="_s-xclick">
                    <input type="hidden" name="hosted_button_id" value="XXAD9MAS7AVTN">
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" name="submit" alt="donate">
                    <img alt="" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1">
                </form>
            </section>
            <section>
                <h1>Stay Tuned</h1>
                <p>
                    If you want to get in touch with us and stay up to date with what we are doing, follow us on
                    <a href="https://twitter.com/SWDesignKnights">Twitter</a> or just write an
                    <a class="feedback ">email</a>. We like getting feedback.
                </p>
            </section>
        </div>
        `;
    }
}
window.customElements.define('dt-sidebar', DtSidebar);


class DtFooter extends CustomHtmlElement {
    html() {
        return /*html*/`
        <style>
            footer {
                margin: 0 -15px;
                border-top: 1px solid #757575; 
                padding-bottom: 2em;
                text-align: center;
                color: #757575;
            }
            
            footer a {
                color: #757575;
            }
        </style>
        <footer>
            <div>
                <a class="feedback">E-Mail</a> |
                <a href="https://twitter.com/SWDesignKnights">Twitter</a> |
                <a href="/privacy.html">Privacy</a> |
                <a href="/imprint.html">Imprint</a>
            </div>
        </footer>
        `;
    }
}
window.customElements.define('dt-footer', DtFooter);
