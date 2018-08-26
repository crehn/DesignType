'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomHtmlElement = function (_HTMLElement) {
    _inherits(CustomHtmlElement, _HTMLElement);

    function CustomHtmlElement(self) {
        var _this, _ret;

        _classCallCheck(this, CustomHtmlElement);

        self = (_this = _possibleConstructorReturn(this, (CustomHtmlElement.__proto__ || Object.getPrototypeOf(CustomHtmlElement)).call(this, self)), _this);
        _this.innerHTML = _this.html();
        _this.init();
        return _ret = self, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CustomHtmlElement, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'html',
        value: function html() {}
    }]);

    return CustomHtmlElement;
}(HTMLElement);

var DtNavigation = function (_CustomHtmlElement) {
    _inherits(DtNavigation, _CustomHtmlElement);

    function DtNavigation() {
        _classCallCheck(this, DtNavigation);

        return _possibleConstructorReturn(this, (DtNavigation.__proto__ || Object.getPrototypeOf(DtNavigation)).apply(this, arguments));
    }

    _createClass(DtNavigation, [{
        key: 'html',
        value: function html() {
            return (/*html*/'\n        <style>\n        </style>\n        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">\n        <div class="container">\n            <a class="navbar-brand" href="index.html">Design-Types.net</a>\n            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"\n                aria-expanded="false" aria-label="Toggle navigation">\n                <span class="navbar-toggler-icon"></span>\n            </button>\n            <div class="collapse navbar-collapse" id="navbarCollapse">\n                <ul class="nav navbar-nav mr-auto">\n                    <li class="nav-item dropdown">\n                        <a class="nav-link dropdown-toggle" href="design_types.html" id="dropdown01" data-toggle="dropdown" aria-haspopup="true"\n                            aria-expanded="false">Design Types</a>\n                        <div class="dropdown-menu" aria-labelledby="dropdown01">\n                            <a class="dropdown-item" href="design_types.html">Concepts</a>\n                            <a class="dropdown-item" href="test_yourself.html">Test Yourself</a>\n                            <a class="dropdown-item" href="assess_colleagues.html?revealed">Assess Colleagues</a>\n                            <a class="dropdown-item" href="statistics.html">Statistics</a>\n                        </div>\n                    </li>\n                    <li class="nav-item">\n                        <a class="nav-link" href="matrix.html">Design Matrix</a>\n                    </li>\n                    <li class="nav-item dropdown">\n                        <a class="nav-link dropdown-toggle" href="cards.html" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Design Cards</a>\n                        <div class="dropdown-menu" aria-labelledby="dropdown02">\n                            <a class="dropdown-item" href="cards.html">Introduction</a>\n                            <a class="dropdown-item" href="cards_detail.html">More Details on the Cards</a>\n                            <a class="dropdown-item" href="cards_usage.html">How to Use the Cards</a>\n                            <a class="dropdown-item" href="cards_get_them.html">Get the Cards</a>\n                        </div>\n                    </li>\n                    <li class="nav-item">\n                        <a class="nav-link" href="about.html">About</a>\n                    </li>\n                </ul>\n                <ul class="nav navbar-nav">\n                    <li>\n                        <a class="nav-link" href="http://www.principles-wiki.net">principles-wiki.net</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        </nav>\n        '
            );
        }
    }, {
        key: 'init',
        value: function init() {
            $(this).find('a.nav-link:contains("' + this.getAttribute('active') + '")').addClass('active');
            $(this).find('a.dropdown-item:contains("' + this.getAttribute('subitem') + '")').prepend('➤ ');
        }
    }]);

    return DtNavigation;
}(CustomHtmlElement);

window.customElements.define('dt-nav', DtNavigation);

var DtImage = function (_CustomHtmlElement2) {
    _inherits(DtImage, _CustomHtmlElement2);

    function DtImage() {
        _classCallCheck(this, DtImage);

        return _possibleConstructorReturn(this, (DtImage.__proto__ || Object.getPrototypeOf(DtImage)).apply(this, arguments));
    }

    _createClass(DtImage, [{
        key: 'html',
        value: function html() {
            return (/*html*/'\n        <style>\n            .pop {\n                cursor:pointer;\n            }\n        </style>\n        <a class="pop">\n            <img src="" class="col-md-12" />\n        </a>\n        \n        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n            <div class="modal-dialog" data-dismiss="modal">\n                <div class="modal-content">\n                    <div class="modal-body">\n                        <button type="button" class="close" data-dismiss="modal">\n                            <span aria-hidden="true">&times;</span>\n                            <span class="sr-only">Close</span>\n                        </button>\n                        <img src=" " class="imagepreview" style="width: 100%;" />\n                    </div>\n                </div>\n            </div>\n        </div>\n        '
            );
        }
    }, {
        key: 'init',
        value: function init() {
            var _this4 = this;

            $(this).find('img').attr('src', this.getAttribute('src'));
            $(this).find('.pop').on('click', function () {
                $(_this4).find('.imagepreview').attr('src', _this4.getAttribute('src'));
                $(_this4).find('.modal').modal('show');
            });
        }
    }]);

    return DtImage;
}(CustomHtmlElement);

window.customElements.define('dt-img', DtImage);

var DtComments = function (_CustomHtmlElement3) {
    _inherits(DtComments, _CustomHtmlElement3);

    function DtComments() {
        _classCallCheck(this, DtComments);

        return _possibleConstructorReturn(this, (DtComments.__proto__ || Object.getPrototypeOf(DtComments)).apply(this, arguments));
    }

    _createClass(DtComments, [{
        key: 'html',
        value: function html() {
            return (/*html*/'\n        <style>\n            dt-comments .new-button {\n                margin: 0.5rem 0;\n                border: 1px solid #d3d7dc;\n                border-radius: 3px;\n                padding: 0.5em 0.75em;\n                background-color: #f9f9f9;\n                \n                cursor: text;\n                color: #adb2bb;\n                font-size: 13px;\n            }\n            \n            dt-comments .new-form { \n                display: none;\n                border-top: 1px dotted #d9d9d9;\n                padding: 1em 0em;\n            }\n            \n            dt-comments input[type="text"]{\n                width: 15em;\n                margin: 0.125em;\n                border: 1px solid #d3d7dc;\n                border-radius: 3px;\n                padding: 0.25em;\n                background-color: #f9f9f9;\n                color: #333;\n            }\n            \n            dt-comments textarea {\n                width: 98%; \n                min-height: 8em;\n                margin: 0.125em;\n                border: 1px solid #d3d7dc;\n                border-radius: 3px;\n                padding: 0.25em; \n                background-color: #f9f9f9;\n                color: #333;\n            }\n            \n            dt-comments textarea:focus, dt-comments input[type="text"]:focus {\n                outline: #f6a828 thin solid;\n                box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.4);\n            }\n            \n            dt-comments .comment-container{\n                padding: 0.5rem 0;\n            } \n\n            dt-comments .comment {\n                padding: 0.25em 0em;\n                min-height: 45px; \n            }\n            \n            dt-comments .avatar{\n                float: left; \n                margin-right: 10px;\n                border-radius: 3px;\n            }\n            \n            dt-comments .comment .name {\n                display: inline;\n                margin: 0 1em 0 0;\n                font-family: tahoma;\n                font-size: 13px;\n                color: #3b5998;\n            }\n            \n            dt-comments .comment .date {\n                font-size: 12px;\n                color: silver;\n            }\n            \n            dt-comments .comment .text {\n                margin: 5px 5px 5px 45px;\n            }    \n        </style>\n        <section id="comments">\n        <div id="comment-template" class="comment">\n        <img src="img/avatar.png" alt="" class="avatar">\n        <div>\n            <h5 class="name">Template name</h5>\n            <span class="date">Template date</span>\n            <br>\n            <p class="text">Template comment</p>\n        </div>\n    </div>\n\n            <div class="comment-container">\n                <div class="new-button">\n                    <span>Write a comment ...</span>\n                </div>\n                <div class="new-form">\n                    <input type="text" id="new-comment-name" value="" placeholder="Your name">\n                    <input type="text" id="new-comment-email" value="" placeholder="Your e-mail address">\n                    <textarea id="new-comment-text"></textarea>\n                    <button class="btn btn-primary post-button" disabled>Post comment</button>\n                    <button class="btn btn-secondary cancel-button">Cancel</button>\n                </div>\n                <div class="clear"></div>\n            </div>\n        </section>\n        '
            );
        }
    }, {
        key: 'init',
        value: function init() {
            var _this6 = this;

            this.pageId = this.getAttribute('pageid');
            $('#comment-template').hide();
            $('dt-comments .new-button').on('click', function () {
                return _this6._showNewCommentForm();
            });
            $('#new-comment-text').on('keyup', function () {
                return _this6._activatePostButtonIffThereIsText();
            });
            $('dt-comments .post-button').on('click', function () {
                return _this6.postComment();
            });
            $('dt-comments .cancel-button').on('click', function () {
                return _this6._cancelComment();
            });
            this.loadComments();
        }
    }, {
        key: '_showNewCommentForm',
        value: function _showNewCommentForm() {
            debuglog("show new comment form");
            $("dt-comments .new-button").hide();
            $('dt-comments .new-form').show();
            $('#new-comment-name').trigger("focus");
        }
    }, {
        key: '_activatePostButtonIffThereIsText',
        value: function _activatePostButtonIffThereIsText() {
            if ($('#new-comment-text').val().length == 0) {
                $('dt-comments .post-button').attr('disabled', true);
            } else {
                $('dt-comments .post-button').attr('disabled', false);
            }
        }
    }, {
        key: 'postComment',
        value: function postComment() {
            var _this7 = this;

            debuglog("post comment");
            $.ajax({
                method: "POST",
                url: "php/addComment.php?pageId=" + this.pageId,
                contentType: 'application/json',
                data: JSON.stringify({
                    name: $('#new-comment-name').val(),
                    email: $('#new-comment-email').val(),
                    text: $('#new-comment-text').val().replace(/(\r\n|\n|\r)/gm, "[br]")
                }),
                success: function success(resultingComment) {
                    debuglog("comment successfully posted");
                    $('#new-comment-text').val('');
                    _this7._hideNewCommentForm();
                    _this7._writeComment(resultingComment.name, resultingComment.avatar, resultingComment.timestamp, resultingComment.text);
                }
            });
        }
    }, {
        key: '_hideNewCommentForm',
        value: function _hideNewCommentForm() {
            $("dt-comments .new-form").hide('fast', function () {
                return $('dt-comments .new-button').show('fast');
            });
        }
    }, {
        key: '_cancelComment',
        value: function _cancelComment() {
            debuglog("cancel comment");
            $('dt-comments .new-form').fadeOut('fast', function () {
                return $('dt-comments .new-button').fadeIn('fast');
            });
        }
    }, {
        key: '_writeComment',
        value: function _writeComment(name, avatarUrl, timestamp, text) {
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
    }, {
        key: 'loadComments',
        value: function loadComments() {
            var _this8 = this;

            debuglog("loadComments for pageId " + this.pageId);
            $.get("php/loadComments.php?pageId=" + this.pageId, function (comments, status) {
                debuglog("loadComments - status: " + status + ", data: " + comments);
                if (comments != null) {
                    for (var i = 0; i < comments.length; i++) {
                        _this8._writeComment(comments[i].name, comments[i].avatar, comments[i].timestamp, comments[i].text);
                    }
                }
            });
        }
    }]);

    return DtComments;
}(CustomHtmlElement);

window.customElements.define('dt-comments', DtComments);

var DtSidebar = function (_CustomHtmlElement4) {
    _inherits(DtSidebar, _CustomHtmlElement4);

    function DtSidebar() {
        _classCallCheck(this, DtSidebar);

        return _possibleConstructorReturn(this, (DtSidebar.__proto__ || Object.getPrototypeOf(DtSidebar)).apply(this, arguments));
    }

    _createClass(DtSidebar, [{
        key: 'html',
        value: function html() {
            return (/*html*/'\n        <style>\n            dt-sidebar {\n                font-size: 0.9rem;\n                background-color: #EEEEEE;\n            }\n            \n            dt-sidebar section {\n                margin-bottom: 2rem;\n            }\n            \n            dt-sidebar h1 {\n                font-size: 1.2rem;\n            }\n        </style>\n        <div class="">\n            <section>\n                <h1>Support</h1>\n                <p>\n                    We\'ve created design-types.net in our spare time hoping that it will be helpful to many people. Please consider supporting\n                    us by making a donation.\n                </p>\n                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" class="text-center">\n                    <input type="hidden" name="cmd" value="_s-xclick">\n                    <input type="hidden" name="hosted_button_id" value="XXAD9MAS7AVTN">\n                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" name="submit">\n                    <img alt=" donate " src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif " width="1" height="1 ">\n                </form>\n            </section>\n            <section>\n                <h1>Stay Tuned</h1>\n                <p>\n                    If you want to get in touch with us and stay up to date with what we are doing, follow us on\n                    <a href="https://twitter.com/SWDesignKnights">Twitter</a> or just write a\n                    <a class="feedback ">short email</a>. We like getting feedback.\n                </p>\n            </section>\n        </div>\n        '
            );
        }
    }]);

    return DtSidebar;
}(CustomHtmlElement);

window.customElements.define('dt-sidebar', DtSidebar);

var DtFooter = function (_CustomHtmlElement5) {
    _inherits(DtFooter, _CustomHtmlElement5);

    function DtFooter() {
        _classCallCheck(this, DtFooter);

        return _possibleConstructorReturn(this, (DtFooter.__proto__ || Object.getPrototypeOf(DtFooter)).apply(this, arguments));
    }

    _createClass(DtFooter, [{
        key: 'html',
        value: function html() {
            return (/*html*/'\n        <style>\n            footer {\n                border-top: 1px solid silver; \n                padding-bottom: 2em;\n                text-align: center;\n                color: gray;\n            }\n            \n            footer a {\n                color: gray;\n            }\n        </style>\n        <footer>\n            <div>\n                <a class="feedback">E-Mail</a> |\n                <a href="https://twitter.com/SWDesignKnights">Twitter</a> |\n                <a href="https://twitter.com/SWDesignKnights">Twitter</a> |\n                <a href="https://www.xing.com/communities/groups/design-principles-patterns-types-08d2-1080100">\n                    Xing\n                </a> |\n                <a href="privacy.html">Privacy</a> |\n                <a href="imprint.html">Imprint</a>\n            </div>\n        </footer>\n        '
            );
        }
    }]);

    return DtFooter;
}(CustomHtmlElement);

window.customElements.define('dt-footer', DtFooter);