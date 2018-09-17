class DtNews extends CustomHtmlElement {
    html() {
        return /*html*/`
        <section>
            <h2>Entwicklertag Karlsruhe</h2>
            <p>
                Next Wednesday (2018-06-20) we will be speaking at Entwicklertag Karlsruhe. This is a software developer
                conference in Karlsruhe,
                Germany. In our talk
                <a href="https://entwicklertag.de/karlsruhe/2018/argumentativ-zur-besten">"Argumentativ zur besten
                    Designentscheidung"
                </a> we will present Design Types, Design Cards, and Design Matrix. We are looking forward to seeing
                you there.
            </p>
            <div class="text-right">
                <time datetime="2018-06-14">2018-06-14</time>
            </div>
        </section>
        <section>
            <h2>Follow us on Twitter</h2>
            <p>
                If you want to stay up to date with what's new, follow us on Twitter:
                <a href="https://twitter.com/SWDesignKnights">@SWDesignKnights</a>
            </p>
            <div class="text-right">
                <time datetime="2018-04-17">2018-04-17</time>
            </div>
        </section>
        <section>
            <h2>Design Matrix for Download</h2>
            <p>
                You can download the
                <a href="matrix.html">Design Matrix</a> now. Feel free to share.
            </p>
            <div class="text-center">
                <a href="matrix.html">
                    <img src="img/Design_Matrix.png" width="50%" alt="Design Matrix" />
                </a>
            </div>
            <div class="text-right">
                <time datetime="2018-04-16">2018-04-16</time>
            </div>
        </section>
    `;
    }
}
window.customElements.define('dt-news', DtNews);

$('.load-news').on('click', function () {
    $(this).hide();
    $('.news').append("<dt-news></dt-news>");
});
