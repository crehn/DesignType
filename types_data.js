function principle(abbreviation, article) {
    return '<a class="dont-print-url" href="http://www.principles-wiki.net/principles:' + article + '">' + abbreviation + '</a>';
}


var typesData = {
sapt: {
    name: 'The Technician',
    description: "The best invention of all time is the tool box. For each task there is the right tool and the Technician is sure that it is in the tool box. The Technician loves to use the power of technologies and combines them to something that helps him achieve his goals in an efficient way. This can be seen as laziness but the Technician is also convinced that you shouldn't reinvent the wheel. Not all technologies fit together nicely so the Technician tries to take on a whole systems' view when composing them. He does not aim for too much foresighted designs but keeps things simple, readable, and understandable. The Technician knows: If you want to be efficient, you should use the right tool, not as much tools as possible. Trade-offs are typically made for quick wins. Technology is meant to serve you, not to constrain you. In the end it's the result that counts not the number of lines you wrote.",
    designs: 'Natural and simple using exactly the right tools for the job',
    programming: 'A technical task which is based on selecting the right tools',
    principlesLiked: [principle('KISS', 'keep_it_simple_stupid'), 
        principle('MIMC', 'more_is_more_complex'),        
        principle('RoE', 'rule_of_explicitness')],
    principlesDisregarded: [principle('UP', 'uniformity_principle'),
        principle('ML', 'murphy_s_law'),
        principle('EUHM', 'easy_to_use_and_hard_to_misuse')],
    strengths: ['Knows what is up to date with a good overview about pros and cons of several technologies.',
        'Code and design are normally easy to understand.',
        'Very fast in delivering solutions by using existing frameworks and combining them in a simple and pragmatic way.'],
    suggestions: ['Keep in mind that not all libraries and frameworks are stable. Be prepared that they change. Ideally your architecture allows you to exchange potentially unstable libraries for other ones without changing too much of your system. Otherwise requirement changes or version updates can lead to big refactoring sessions.',
        'Use quality metrics for the architecture to avoid own violations of your design that may have a big impact on your systems.',
        'Keep an eye on stability. Not every new technology keeps its promises. Also defensive programming maybe cost some time but is often worth it.'],
    furtherReading: [],
},
sapr: {
    name: 'The Construction Manager',
    description: "The Construction Manager loves to work like on a construction site. There is a plan and everybody works hand in hand to reach the aimed goal. He focuses on working solutions that are built on proven technologies. This ensures that the result will stand the test of time. The most matching motto is: Getting things done. He rather implements by himself than choosing the wrong and maybe unstable framework. He knows very well about his abilities and has reservations about foreign technologies that did not proof their maturity over a certain period of time. He also focuses more on the interaction of particular modules instead of having too many sophisticated and complex constructs in his design. He prefers simple craftsmanship which tells him not to finish before a certain level of robustness has been shown by manual or automated tests.",
    designs: 'Stable and reasonably planned without unnecessary complexity',
    programming: 'Like managing a construction site. Somethiong has to be built.',
    principlesLiked: [principle('KISS', 'keep_it_simple_stupid'),
        principle('MIMC', 'more_is_more_complex'),
        principle('RoE', 'rule_of_explicitness'),
        principle('LC', 'low_coupling'),
        principle('HC', 'high_cohesion')],
    principlesDisregarded: [principle('GP', 'generalization_principle'),
        principle('PSU', 'principle_of_separate_understandability'),
        principle('TdA/IE', 'tell_don_t_ask_information_expert')],
    strengths: ['Fast in delivering stable and working solutions.',
        'Code and design are normally easy to understand.'],
    suggestions: ["Keep your technical knowledge up to date to avoid building too much on your own that an existing library could do.",
        "Don't get left behind by evolving technology.",
        "Keep your design flexible and extensible to be prepared for continuous requirement changes.",
        "Don't forget the trade-offs you made for increasing development speed."],
    furtherReading: [],
},
sait: {
    name: 'The Author',
    description: "Writing software is like writing a book: It's planning and crafting and creating. All these three aspects need to be there and neither may be neglected. A novel without a carefully planned story line is boring and a piece of software without a carefully thought-about architecture is chaotic. A novelist who isn't skilled in the craft of writing will produce an amateurish result -- just like a software developer. And anything lacking the magic bits of artistic spirit will be mediocre at most. An author might use neologisms, experiment with new forms of story telling and constantly thinks of how to surprise the readers. For software development this means that The Author likes to use new technologies in order to write something that hasn't been imagined before. An Author cares about his work and thinks \"it's great\" and \"it's awful\" in alternation. Authors are passionate and enthusiastic and usually produce good work but sometimes they love their art a bit too much.",
    designs: 'Like a good novel -- well thought out and still elegant',
    programming: 'Like writing a book: a mixture of planning and creativity',
    principlesLiked: [principle('KISS', 'keep_it_simple_stupid'),
        principle('MP', 'model_principle'),
        principle('PSU', 'principle_of_separate_understandability'),
        principle('TdA/IE', 'tell_don_t_ask_information_expert')],
    principlesDisregarded: [principle('GP', 'generalization_principle'),
        principle('ECV', 'encapsulate_the_concept_that_varies')],
    strengths: ["Solutions are not only addressing the requirements but are elegant too.",
        "Keeps all aspects in mind, also the interaction of several components.",
        "Up to date with state of the art technologies and its facets."],
    suggestions: ["Try not to loose focus on business needs. Often elegance is not expected but expensive in effort and time.",
        "Learn to accept imperfect solutions.",
        "A good novelist knows: It's hard but necessary to start with something mediocre that's working. The key is to polish over and over again as new requirements, insights and ideas emerge."],
    furtherReading: [],
},
sair: {
    name: 'The  The Space Probe Engineer',
    description: "Space probes show how great software can be. They can fly for a decade performing complex maneuvers, precisely find their way to ridiculously tiny pieces of rock in outer space and may even land on them automatically. Space probes are marvelous pieces of technology and the Space Probe Engineer strives to build software which is equally robust and does precisely what it is supposed to do. He likes simple, no-frills solutions based on technology which stood the test of time and keeping the big picture in mind all the time. You can be sure: the code a Space Probe Engineer writes will be rock-solid.",
    designs: 'Well-thought-out, standardized, robust, and conservative',
    programming: 'A serious business',
    principlesLiked: [principle('KISS', 'keep_it_simple_stupid'),
        principle('MIMC', 'more_is_more_complex'),
        principle('ML', 'murphy_s_law'),
        principle('MP', 'model_principle'),
        principle('IH/E', 'information_hiding_encapsulation'),
        principle('PSU', 'principle_of_separate_understandability'),
        principle('UP', 'uniformity_principle'),
        principle('TdA/IE', 'tell_don_t_ask_information_expert')],
    principlesDisregarded: [principle('GP', 'generalization_principle'),
        principle('ECV', 'encapsulate_the_concept_that_varies')],
    strengths: ["You produce stable, high-quality software.",
        "You do not forget anything you have to do (maybe by using your own to do list)."],
    suggestions: ["Not every piece of software is an aerospace application or needs to be built like one. Unimportant things can be omitted!",
        "Constantly put into question and reconsider what you think you know. There may be more than one truth.",
        "Don't get left behind by evolving technology. Much may be hype but something is actually progress."],
    furtherReading: ['<a href="https://en.wikipedia.org/wiki/Rosetta_(spacecraft)">Rosetta</a>'],
},
scpt: {
    name: 'The Ninja',
    description: "Ninjas are famous for their clout while remaining completely unseen. They sneak into the codebase, do their job in a quick and pragmatic way, and commit their changes before others even realize that a new requirement had popped up. Ninjas are extremely effective and efficient in what they do. On the other hand Ninjas take no prisoners and when something gets in the way, they aren't afraid of using violence. So sometimes they tend to sacrifice architecture for time to market. Being hired to fulfill a specific job it does not matter how much blood is spilled. In the end the result counts. But achieving their goal also means that they are very familiar with all the traditional but also the modern instruments and technologies of their guild.",
    designs: 'Often unobtrusive but sometimes rough',
    programming: 'The fulfillment of a task -- and it\'s fun',
    principlesLiked: [principle('KISS', 'keep_it_simple_stupid'),
        principle('RoE', 'rule_of_explicitness'),
        principle('MIMC', 'more_is_more_complex'),
        principle('RoE', 'rule_of_explicitness')],
    principlesDisregarded: [principle('GP', 'generalization_principle'),
        principle('MP', 'model_principle'),
        principle('ML', 'murphy_s_law')],
    strengths: ["Efficient and effective problem solvers",
        "Achieve their assigned goal with all available means",
        "Can also work well with legacy code"],
    suggestions: ["Try not to be too violent. You shouldn't kill innocent bystanders and you shouldn't sacrifice architectural constraints or stability in order to do a quick job. Remember that as a Ninja, you have to be quick and sneaky.",
        "You are here to fulfill the task. Thats correct. But keep in mind that there may be an ultimate goal. Try to align your measures with that goal, too.",
        "You most likely don't have a problem with your fellow Ninja colleagues. But there may also be other colleagues who aren't as fast and sneaky as you are. And that's totally fine."],
    furtherReading: ['The Ninja is a nice far-east metaphor for a software developer. Although not strictly connected to Ninjas, there is a nice website containing many pseudo-far-east stories for software developers: <a href="http://thecodelesscode.com/">The Codeless Code</a>',
        'Ninjas are sometimes called <a href="http://www.joelonsoftware.com/items/2009/09/23.html">duct tape programmers</a>. This is meant in a positive sense but <a href="http://www.jwz.org/blog/2009/09/that-duct-tape-silliness/">not everyone likes this attribute</a> and of course, everything has <a href="http://jeffreypalermo.com/blog/debunking-the-duct-tape-programmer/">two sides</a>',
        '<a href="http://www.jwz.org/doc/worse-is-better.html">Worse Is Better</a>']
},
scpr: {
    name: 'The Fire Fighter',
    description: "When a house is burning -- and surely in software development this is a quite common case -- The Fire Fighter neither wastes time in endless discussions nor he is afraid of using his ax to get through some locked door in order to rescue someone. When there is a fire or a project which absolutely has to be finished by tomorrow no matter what, The Fire Fighter is the guy you are looking for. He uses simple and effective solutions to do what needs to be done. This also means that he might violate architectural constraints or simply anything that gets in the way. While others may still be dreaming of a big system which can do everything, he has already solved the problem and begins looking around where the next problem is that needs to be fixed. He relies on well known and proven technologies like the ax in his hand. And sometimes his life depends on his instruments which is the main reason why they have to be well proven. Being aware that any occurring event needs a quick solution he thinks in code and continuously translates requirements into simple and effective methods.",
    designs: 'Effective and always focused on a current problem you want to solve.',
    programming: 'Problem solving',
    principlesLiked: [principle('KISS', 'keep_it_simple_stupid'),
        principle('RoE', 'rule_of_explicitness'),
        principle('DRY', 'don_t_repeat_yourself')],
    principlesDisregarded: [principle('MP', 'model_principle'),
        principle('PSU', 'principle_of_separate_understandability'),
        principle('ML', 'murphy_s_law'),
        principle('IH/E', 'information_hiding_encapsulation'),
        principle('UP', 'uniformity_principle'),
        principle('TdA/IE', 'tell_don_t_ask_information_expert')],
    strengths: ["Effective and efficient problem solver.",
        "Code is normally easy to understand, design is more or less split in problem cases.",
        "Knows his instruments and its abilities very well."],
    suggestions: ["Try not to loose the big picture while focusing on problems step by step. Otherwise your design will break very quickly.",
        "Don't forget to refactor. Otherwise all those simple enhancements may result in something complicated.",
        "Keep in mind that you are working in a team and this can only be effective and efficient when everybody works hand in hand and has the same or a similar understanding of the way of working."],
    furtherReading: ['Fire Fighters are sometimes called <a href="http://www.joelonsoftware.com/items/2009/09/23.html">duct tape programmers</a>. This is meant in a positive sense but <a href="http://www.jwz.org/blog/2009/09/that-duct-tape-silliness/">not everyone likes this attribute</a> and of course, everything has <a href="http://jeffreypalermo.com/blog/debunking-the-duct-tape-programmer/">two sides</a>',
        '<a href="http://www.jwz.org/doc/worse-is-better.html">Worse Is Better</a>'],
},
scit: {
    name: 'The Craftsman',
    description: "The Craftsman sees software development as a craft and wants to master his discipline. He is reliable in his art. While he cares about his craft and never does a sloppy job, he also avoids cruft and prefers simple, no-frills solutions. Unnecessary or unrequested things will be omitted for keeping the result clean. Therefore he doesn't waste time on the drawing board and rather starts working right away to produce business value in a well crafted manner. Instead he relies on his professional skills and his practices he constantly trains and enhances to stay on a state of the art level of his craft. The Craftsman is aware that he is hired to produce business value. So he is willing to do trade-offs in order to fulfill the customer's requirements but only to the extend that doesn't harm his reputation as a professional craftsman.",
    designs: "Carefully crafted, simple, straightforward, and without bells and whistles",
    programming: 'A craft',
    principlesLiked: [principle('KISS', 'keep_it_simple_stupid'),
        principle('MIMC', 'more_is_more_complex'),
        principle('RoE', 'rule_of_explicitness'),
        principle('SLA', 'single_level_of_abstraction'),
        principle('SRP', 'single_responsibility_principle'),
        principle('ECV', 'encapsulate_the_concept_that_varies'),
        principle('DRY', 'don_t_repeat_yourself')],
    principlesDisregarded: [principle('MP', 'model_principle'),
        principle('PSU', 'principle_of_separate_understandability'),
        principle('ML', 'murphy_s_law'),
        principle('TdA/IE', 'tell_don_t_ask_information_expert'),
        principle('GP', 'generalization_principle')],
    strengths: ["Delivers well crafted solutions with state of the art technologies.",
        "Is very keen to develop according to his understanding of the craft."],
    suggestions: ["Try to step back every now and then and look at the system as a whole.",
        "Even if you don't need that, your colleagues may like having coarse architecture sketches or the like. The next time a colleague has a question, try using a white board to explain how the software works. This may help communicating software designs. Furthermore it might give you ideas on how to improve and simplify your designs even further."],
    furtherReading: ['Nowadays software development is frequently seen as a craft. Some say <a href="https://en.wikipedia.org/wiki/Software_craftsmanship">software craftsmanship</a> rather than software engineering is a suitable metaphor to describe the development of high-quality software. The <a href="http://manifesto.softwarecraftsmanship.org/">Manifesto for Software Craftsmanship</a> describes the values of software craftsmanship and presents a comprehensive list of links about the topic.',
        'One of the most famous software craftsmen is Robert C. Martin (aka "Uncle Bob"). You may want to read his books and/or his <a href="http://blog.cleancoder.com/">blog</a>.'],
},
scir: {
    name: 'The Gardener',
    description: "A piece of software is like a tree. It grows naturally and it needs to be trimmed regularly. Gardeners like refactoring because they know that there won't be an ingenious master plan which will solve all future problems. Software needs to grow and constantly adapt to the changing environment. Also trees don't follow a master plan when they grow. Depending on its age, condition and environment a tree needs to be watered, fertilized, trained, or trimmed and a gardener knows when to do what. In the same way a software Gardener knows when to change a piece of code such that it stays in a healthy shape. The health of its plants is a very important thing to him. This is why he always assures that everything works fine and is stable. The love to his plants can make him do more than necessary.",
    designs: 'Naturally growing and constantly improving and adapting to new requirements',
    programming: 'Like growing a tree',
    principlesLiked: [principle('KISS', 'keep_it_simple_stupid'),
        principle('DRY', 'don_t_repeat_yourself'),
        principle('ECV', 'encapsulate_the_concept_that_varies'),
        principle('Gall\'s Law', 'gall_s_law')],
    principlesDisregarded: [principle('GP', 'generalization_principle'),
        principle('ML', 'murphy_s_law'),
        principle('MP', 'model_principle')],
    strengths: ["You can handle changing requirements and evolving software quite well.",
        "You are caring about the things you do and pour your heart and soul into them."],
    suggestions: ["Don't forget to stay up to date with new technologies. They often help you getting things done more effective and efficient.",
        "Learn throw things away even if it is/was your baby.",
        "Respect the business needs as part of the overall perspective. Don't focus too much on specific detail needs."],
    furtherReading: [],
},
papt: {
    name: 'The Wizard',
    description: 'Any sufficiently advanced technology is indistinguishable from magic. And software is a particularly nice one. You know even the complicated spells and that\'s for sure: Soon you will become the archmage.',
    designs: '',
    programming: 'Like magic',
    principlesLiked: [principle('GP', 'generalization_principle')],
    principlesDisregarded: [principle('UP', 'uniformity_principle')],
    strengths: [],
    suggestions: [],
    furtherReading: [],
},
papr: {
    name: 'The Engineer',
    description: 'There\'s nothing to fear for an engineer!',
    designs: '',
    programming: 'An engineering discipline',
    principlesLiked: [principle('GP', 'generalization_principle'),
        principle('MIMC', 'more_is_more_complex'),
        principle('ML', 'murphy_s_law')],
    principlesDisregarded: [],
    strengths: [],
    suggestions: [],
    furtherReading: [],
},
pait: {
    name: 'Einstein or The Composer',
    description: '',
    designs: 'Well thought-out and sophisticated but sometimes a bit over the top.',
    programming: 'Infinite',
    principlesLiked: [principle('GP', 'generalization_principle'),
        principle('LC', 'low_coupling'),
        principle('MP', 'model_principle'),
        principle('TdA/IE', 'tell_don_t_ask_information_expert')],
    principlesDisregarded: [principle('KISS', 'keep_it_simple_stupid'),
        principle('RoE', 'rule_of_explicitness'),
        principle('IH/E', 'information_hiding_encapsulation'),
        principle('PSU', 'principle_of_separate_understandability')],
    strengths: [],
    suggestions: [],
    furtherReading: [],
},
pair: {
    name: 'The Architect',
    description: '',
    designs: 'Well-thought-out',
    programming: 'A task that needs planned thinking',
    principlesLiked: [principle('GP', 'generalization_principle'),
        principle('LC', 'low_coupling'),
        principle('ML', 'murphy_s_law'),
        principle('MP', 'model_principle'),
        principle('IH/E', 'information_hiding_encapsulation'),
        principle('PSU', 'principle_of_separate_understandability'),
        principle('UP', 'uniformity_principle'),
        principle('TdA/IE', 'tell_don_t_ask_information_expert')],
    principlesDisregarded: [principle('KISS', 'keep_it_simple_stupid'),
        principle('RoE', 'rule_of_explicitness')],
    strengths: [],
    suggestions: [],
    furtherReading: [],
},
pcpt: {
    name: 'The Witcher or The Experimentor',
    description: 'You are invincible! Master of the black magic of coding.',
    designs: '',
    programming: 'fun!',
    principlesLiked: [principle('GP', 'generalization_principle')],
    principlesDisregarded: [principle('ML', 'murphy_s_law'),
        principle('IH/E', 'information_hiding_encapsulation'),
        principle('UP', 'uniformity_principle')],
    strengths: [],
    suggestions: [],
    furtherReading: [],
},
pcpr: {
    name: 'The Shaman',
    description: '',
    designs: '',
    programming: 'Voodoo',
    principlesLiked: [principle('GP', 'generalization_principle')],
    principlesDisregarded: [principle('MP', 'model_principle')],
    strengths: [],
    suggestions: [],
    furtherReading: [],
},
pcit: {
    name: 'The Artist',
    description: '',
    designs: '',
    programming: 'An art',
    principlesLiked: [principle('GP', 'generalization_principle'),
        principle('DRY', 'don_t_repeat_yourself')],
    principlesDisregarded: [principle('KISS', 'keep_it_simple_stupid'),
        principle('RoE', 'rule_of_explicitness'),
        principle('ML', 'murphy_s_law')],
    strengths: [],
    suggestions: [],
    furtherReading: [],
},
pcir: {
    name: 'The Clockmaker',
    description: 'A good system works precisely, just like a swiss clockwork. When every tiny cog wheel moves as it is suppose to, you can be sure that you\'ve created a masterpiece. You know the tiniest details of your code and certaily there are many of them. Your designs are sophisticated but they work perfectly fine.',
    designs: 'Full of carefully crafted details',
    programming: 'Like creating a beautiful, precise clockwork',
    principlesLiked: [principle('GP', 'generalization_principle'),
        principle('ML', 'murphy_s_law'),
        principle('UP', 'uniformity_principle')],
    principlesDisregarded: [principle('KISS', 'keep_it_simple_stupid'),
        principle('RoE', 'rule_of_explicitness')],
    strengths: ['You are very good at writing code which exactly does what you want it to do'],
    suggestions: ['Don\'t get lost in the details. Thers is some business which depends on you.',
        'Keep in mind that your colleagues may need to understand your code; it\'s not enough to make calling it foolproof; at some time in the future somebody else might have to make changes to your code for some or the other reason. Maybe you are sick or on vacation, maybe you\'ve left the company, or maybe your code is so great that some other team likes to use and adapt it to their particular needs.'],
    furtherReading: [],
}
};

