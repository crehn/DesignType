class DtDesignCard extends CustomHtmlElement {

    html() { }

    init() {
        $.get("img/cards/editor/template.svg", (svg, status) => {
            debuglog("getTemplate - status: " + status);
            this.template = new XMLSerializer().serializeToString(svg.documentElement);
            this.render();
        });
    }

    static get observedAttributes() {
        return DtDesignCard.variables;
    }

    static get variables() {
        return ['submitter', 'abbr', 'name', 'short', 'long'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        this.render();
    }

    render() {
        debuglog("re-render");
        const variables = DtDesignCard.variables;
        variables.unshift(this.template);
        const svgString = variables.reduce((prev, next) => this._subst(prev, next));
        $(this).html(svgString);
    }

    _subst(str, attrName) {
        return str.replace(new RegExp(`§${attrName}§`, 'g'), this.getAttribute(attrName));
    }
}
window.customElements.define('dt-design-card', DtDesignCard);

class DtCardEditor extends CustomHtmlElement {
    html() {
        return /*html*/`
        <style>

        </style>
        <p>
            Currently there is one set of Design Cards consisting of 54 cards. But there are plenty of more principles and 
            arguments that would be helpful to have on a card. We plan to create a "volume 2" of the Design Cards. We already 
            have many ideas but if you like you can submit your idea. If we like it, your idea might make it into the final set. 
        </p>
        <p>
            Furthermore by submitting your card, others can comment and discuss your idea.
        </p>
        <div class="row">
            <div class="col-md-8">
                <table>
                    <tr>
                        <th>Submitter (your name)</th>
                        <td><input type="text" name="submitter" id="submitter" /></td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td><input type="text" name="email" id="email" /></td>
                    </tr>
                    <tr>
                        <th>Abbreviation</th>
                        <td><input type="text" name="abbr" id="abbr" /></td>
                    </tr>
                    <tr>
                        <th>Aspect</th>
                        <td>
                            <select name="aspect" id="aspect">
                                <option value="neutral">neutral</option>
                                <option value="simple">simple</option>
                                <option value="powerful">powerful</option>
                                <option value="abstract">abstract</option>
                                <option value="concrete">concrete</option>
                                <option value="pragmatic">pragmatic</option>
                                <option value="idealistic">idealistic</option>
                                <option value="robust">robust</option>
                                <option value="technologic">technologic</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>
                            <input type="text" name="name" id="name" />
                        </td>
                    </tr>
                    <tr>
                    <th>Short Description/Catchphrase</th>
                    <td>
                    <input type="text" name="short" id="short" />
                    </td>
                    </tr>
                    <tr>
                    <th>Long Description</th>
                    <td>
                    <textarea name="long" id="long"></textarea>
                    </td>
                    </tr>
                    <tr>
                        <th>Comment</th>
                        <td>
                            <textarea name="comment" id="comment"></textarea>
                        </td>
                    </tr>
                </table>
                <label><input type="checkbox" name="publish" value="publish">Please publish my card on the website so others can see, download, and comment it.</label>
                    <label><input type="checkbox" name="use" value="use">The Software Design Knights may use my card or derived versions thereof for creating and selling card sets.</label>
                </div>
                <div class="col-md-4">
                    <dt-design-card></dt-design-card>
            </div>
        </div>
        <button class="btn btn-primary" name="submit" id="submit">Submit</button>
        `;
    }

    init() {
        this.map('submitter');
        this.map('abbr');
        this.map('name');
        this.map('short');
        this.map('long');
    }

    map(attribute) {
        $(this).find(`#${attribute}`).on('change', event => {
            debuglog(`setting ${attribute} to ${event.target.value}`);
            return $(this).find('dt-design-card').attr(attribute, event.target.value);
        });
    }

}
window.customElements.define('dt-card-editor', DtCardEditor);
