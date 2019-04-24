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
        <form>
            <div class="row">
                <div class="col-lg-7">
                    <div class="form-row">
                        <div class="col form-group">
                            <label for="abbr">Abbreviation</label>
                            <input type="text" name="abbr" id="abbr" class="form-control" placeholder="Abbreviation" />
                        </div>
                        <div class="col form-group">
                            <label for="aspect">Aspect</label>
                            <select name="aspect" id="aspect" class="form-control">
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
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name" class="form-control" placeholder="Full name of the principle or argument" />
                    </div>
                    <div class="form-group">
                        <label for="short">Short Description/Catchphrase</label>
                        <input type="text" name="short" id="short" class="form-control" placeholder="Short description or chatchphrase" />
                    </div>
                    <div class="form-group">
                        <label for="long">Long Description</label>
                        <textarea name="long" id="long" class="form-control" placeholder="More detailed description" rows="5"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="col form-group">
                            <label for="submitter">Submitter</label>
                            <input type="text" name="submitter" id="submitter" class="form-control" placeholder="Your Name" />
                        </div>
                        <div class="col form-group">
                            <label for="email">Email</label>
                            <input type="text" name="email" id="email" class="form-control" placeholder="Email address" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="comment">Comment</label>
                        <textarea name="comment" id="comment" class="form-control" placeholder="Comment to be published alongside your card" rows="5"></textarea>
                    </div>
                </div>
                <div class="col-lg-5 text-center">
                    <dt-design-card></dt-design-card>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-10">
                    <div class="form-check">
                        <input type="checkbox" id="publish" name="publish" value="publish" class="form-check-input">
                        <label class="form-check-label" for="publish">
                            Please publish my card on the website so others can see, download, and comment it.
                        </label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" id="useage_rights" name="useage_rights" value="useage_rights" class="form-check-input">
                        <label class="form-check-label" for="useage_rights">
                            The Software Design Knights may use my card or derived versions thereof for creating and selling card sets.
                        </label>
                    </div>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-lg btn-primary float-right" name="submit" id="submit">Submit</button>
                </div>                
            </div>
        </form>
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
            const value = event.target.value || '';
            return $(this).find('dt-design-card').attr(attribute, value);
        });
        $(this).find(`#${attribute}`).change();
    }

}
window.customElements.define('dt-card-editor', DtCardEditor);
