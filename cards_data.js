function bLink(type, abbreviation, name) {
    return {
        type: type,
        abbreviation: abbreviation,
        name: name,
        set: 'basic'
    };
}

function aLink(type, abbreviation, name) {
    return {
        type: type,
        abbreviation: abbreviation,
        name: name,
        set: 'advanced'
    };
}

var cardsData = {
    KISS: {
        name: 'Keep it Simple Stupid',
        aspect: 'simple',
        catchphrase: 'Simple means readable, maintainable and less error-prone. Overengineering is harmful.',
        description: "Complex code typically contains more bugs and it has to be maintained (maybe even by other people). To others it may seem obscure which can lead to frustration and bad code quality. Striving for simplicity means to avoid inheritance, low-level optimization, complex algorithms, fancy (language) features, configurability, etc.",
        set: 'basic',
        links: [
            bLink('↓', 'RoP', 'Rule of Power'),
            bLink('↑', 'CF', 'Customer Focus'),
            aLink('↓', 'NFR', 'Non-Functional Requirements'),
            aLink('⇅', 'MP', 'Model Principle'),
        ],
        wikiLink: 'principles:keep_it_simple_stupid',
    },
    TP: {
        name: 'Technological Progress',
        aspect: 'technologic',
        catchphrase: 'Progress must not be ignored in a competitive environment.',
        description: "New technology is not only motivating but also comes with benefits like more features, more performance, better maintainability, and fixed bugs. Furthermore old technology won't be supported for much longer and new people don't know the old stuff anymore. Continuously challenge existing solutions by evaluating alternatives.",
        set: 'basic',
        links: [
            bLink('↑', 'FRD', 'Frequency Reduces Difficulty'),
            bLink('↓', 'UFT', 'Use Familiar Technology'),
            aLink('↓', 'IR', 'Instability Risk'),
            aLink('⇅', 'RoS', 'Rule of Standardization'),
        ],
        wikiLink: '',
    },
    PoQ: {
        name: 'Principle of Quality',
        aspect: 'idealistic',
        catchphrase: 'Bad quality kills us in the long run!',
        description: "It may be faster now but we need to be fast tomorrow, too. Bad quality frustrates maintainers, makes fixing bugs harder and leads to huge efforts for changes. This often starts by being careless once. Don't let a vicious circle begin. Use metrics, adhere to the architecture, have a high test coverage, apply code reviews and continuous refactoring. Don't be lazy.",
        set: 'basic',
        links: [
            bLink('⇅', 'KISS', 'Keep It Simple Stupid'),
            aLink('↑', 'LC', 'Low Coupling'),
            aLink('⇅', 'EaO', 'Early and Often'),
            aLink('↓', 'CF', 'Customer Focus'),
        ],
        wikiLink: '',
    },
    DRY: {
        name: "Don't Repeat Yourself",
        aspect: 'concrete',
        catchphrase: 'Duplication makes changing the code cumbersome and leads to bugs.',
        description: "Having a functionality more than once means to update or bugfix it at every occurrence which is more error-prone and more effort. Refactorings like method or class extraction may help as well as inheritance, polymorphism and some design patterns.",
        set: 'basic',
        links: [
            bLink('↓', 'KISS', 'Keep It Simple Stupid'),
            bLink('↑', 'RoP', 'Rule of Power'),
            bLink('↑', 'PoQ', 'Principle of Quality'),
            aLink('↑', 'ML', "Murphy's Law"),
        ],
        wikiLink: 'principles:don_t_repeat_yourself',
    },
};

