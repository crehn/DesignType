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
    furtherReading: [''],
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
    furtherReading: [''],
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
    furtherReading: [''],
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
    furtherReading: [''],
},
papt: {
    name: 'The Magician',
    description: "For the Magician sufficiently advanced technology is indistinguishable from magic -- and software is a particularly nice one. Each library, each framework, and each technology is like a spell, a potion, or a wand. The more you know about them, the more of them you are able to use, the more powerful you are. By combining the right technologies you can solve almost any problem without much manual work. In that way you can build more complex and more powerful software than others are able to build. The Magician continuously looks for new technologies that may make him even more powerful. Generalized and extensible approaches offer this potential to him and are often picked for his solutions. He can handle complexity very well but is also interested to put only elements together that fit to each other or to the system design. Nevertheless he counts on effect, not beauty.",
    designs: 'Extensible and foresighted',
    programming: 'Like magic',
    principlesLiked: [principle('GP', 'generalization_principle'),
        principle('LC', 'low_coupling')],
    principlesDisregarded: [principle('UP', 'uniformity_principle'),
        principle('ML', 'murphy_s_law'),
        principle('MIMC', 'more_is_more_complex')],
    strengths: ["Solutions are flexible to use and offer multiple extension points to add more functionality or to exchange currently used technologies.",
        "Foresighted solutions can save time in the long run when the whole infrastructure is available.",
        "Interfaces/APIs typically remain stable."],
    suggestions: ["Think about simplifying those areas where generality is not really necessary. It saves time and reduces complexity especially for others that are maybe not that fast in understanding complex code.",
        "Keep an eye on what you combine. Too many dependencies lead to instability or problems with incompatible versions. Sometimes less is more.",
        "Not every technology keeps its promises. Also have a look into the details and not only on the promised boosting effects."],
    furtherReading: [''],
},
papr: {
    name: 'The Engineer',
    description: "The Engineer investigates the right solution by creating a good plan. His toolbox contains powerful instruments gained by many years of studies and experience. His typical motto is: There's nothing to fear for an engineer! He uses time-tested technologies he also examined by himself. Each element of a system has its right place and its purpose and all have to play well with each other. Stability is an important topic for him because it will influence his reputation whether his solution will stand the test of time or not. Nevertheless the Engineer is also pragmatic in the sense that there is a limit on all actions like planning, building, stabilizing and so on, which is the customer's wish or the given circumstances like time and money.",
    designs: "Well planned and focused on customer needs with the opportunity to offer more than only the expected.",
    programming: 'An engineering discipline',
    principlesLiked: [principle('GP', 'generalization_principle'),
        principle('MIMC', 'more_is_more_complex'),
        principle('ML', 'murphy_s_law')],
    principlesDisregarded: [principle('KISS', 'keep_it_simple_stupid')],
    strengths: ["There is almost nothing an engineer cannot do. Proficiency and reliability can be expected.",
        "His solutions are well planned and he has a good structure or process to reach goals step by step."],
    suggestions: ["Good and planned solutions take time. Sometimes there is not enough available and you have to decide what part should be skipped. Be sure to skip the right things!",
        "Engineers can become demotivated very fast if they are not challenged enough.",
        "Engineers tend to overengineer. Keep the project constraints in mind -- especially if they are not specified precisely."],
    furtherReading: [''],
},
pait: {
    name: 'The Professor',
    description: "The Professor can find a solution for even the hardest problems. It may take a while but a well-thought-out solution will be there, eventually. Not everybody understands The Professor's code but one can be sure: it's a masterpiece. He is aware of all the new technologic achievements and examines them to get a better understanding and also to use them for his purposes. He is excited by the academical challenge of a task which can be more interesting than the particular customers' needs and he won't surrender until it is solved.",
    designs: 'Well thought-out and sophisticated but sometimes a bit over the top',
    programming: 'Infinite',
    principlesLiked: [principle('GP', 'generalization_principle'),
        principle('LC', 'low_coupling'),
        principle('MP', 'model_principle'),
        principle('TdA/IE', 'tell_don_t_ask_information_expert')],
    principlesDisregarded: [principle('KISS', 'keep_it_simple_stupid'),
        principle('RoE', 'rule_of_explicitness'),
        principle('PSU', 'principle_of_separate_understandability')],
    strengths: ["Given enough time the Professor can solve almost any problem.",
        "He has a very good (and often experienced) overview on state of the art technologies."],
    suggestions: ["Even if you don't have any problems with complex software, your colleagues may not be as smart as you. Avoiding complexity is often better than coping with it. Learn how to do that. Writing complex software may be fun but making software simple can be an interesting challenge too.",
        "Keep in mind that your system shall fulfill some business needs. And 80% of the benefit now is often more more economical than a 100% solution later. Learn how to build software iteratively to provide benefits early on."],
    furtherReading: ['The Professor is a type of developer who has the potential of being loved or hated. Critics call him an <a href="http://www.joelonsoftware.com/articles/fog0000000018.html">architecture astronaut</a> while others <a href="http://quoderat.megginson.com/2007/01/04/in-praise-of-architecture-astronauts/">praise his foresightedness</a>.'],
},
pair: {
    name: 'The Architect',
    description: "A software system is like a house: it has several levels, there are several plans and several aspects that need to be considered. Lastly a system that shall be used, needs to be build on a stable foundation as it has to last for a long time. An architect picks technologies with care because he wants to assure that his system fulfills the non functional requirements and stands the test of time. He has an eye for the collaboration and interaction of particular elements and plans it conscientiously. He is able to offer several extensible solutions in varying designs as part of his acquired portfolio which sometimes seem to be a bit unworldly (for normal customers).",
    designs: 'Planned and well-thought-out',
    programming: 'Like building a house',
    principlesLiked: [principle('GP', 'generalization_principle'),
        principle('LC', 'low_coupling'),
        principle('ML', 'murphy_s_law'),
        principle('MP', 'model_principle'),
        principle('IH/E', 'information_hiding_encapsulation')],
    principlesDisregarded: [principle('KISS', 'keep_it_simple_stupid'),
        principle('RoE', 'rule_of_explicitness'),
        principle('Gall\'s Law', 'gall_s_law')],
    strengths: ["Architects communicate their ideas and think foresightedly.",
        "Solutions are well planned and elements aligned to each other"],
    suggestions: ["Your colleagues may like to start coding earlier than you. This is not necessarily a shortcoming. It's just another way of building software with its own advantages and disadvantages. Find a way to cooperate with them although they think differently.",
        "Not everything has to be perfect. Perfection costs effort and time and these are things you normally don't have. Try to find these things so you can make trade-offs you can live with.",
        "Don't loose focus on the details and get your hands dirty from time to time to keep you familiar with the current state of coding."],
    furtherReading: [''],
},
pcpt: {
    name: 'The Chef',
    description: "The chef loves to cook an awesome tasting meal with all the spices and ingredients that are available to him. Several combinations of spices can lead to varying tastes and make it even more interesting to try them out. And imagine all the different methodologies to cook, to blanch, to barbecue, etc. The Chef is very familiar with all these technologies that enable him to reach the perfect taste experience. But all of this aims to satisfy the guest as his customer which means that a meal has to be served before it is too cold or the guest has left the restaurant with a growling stomach. For doing so he might also use some shortcuts like flavor enhancer from time to time or in other words: prepared code snippets. Focusing on one dish sometimes means to loose overview about the whole menu but in fact it means to deliver a harmonious self-contained one.",
    designs: 'A sweet arrangement of powerful elements and several technologies that can become very complex.',
    programming: 'Tasting fun! It is part of your life essence.',
    principlesLiked: [principle('GP', 'generalization_principle')],
    principlesDisregarded: [principle('ML', 'murphy_s_law'),
        principle('IH/E', 'information_hiding_encapsulation'),
        principle('UP', 'uniformity_principle')],
    strengths: ["Solutions are up to date with current technologies. He even knows about upcoming things.",
        "Good isolated components can be extremely powerful, revolutionize concepts and replace existing components."],
    suggestions: ["Be careful with playing around. It can consume time when you loose focus on the real goal.",
        "Combinations of too many powerful artifacts can lead to complex and instable systems.",
        "Keep an eye on the design and the interaction of all elements. It is much more than linking artifacts together."],
    furtherReading: [''],
},
pcpr: {
    name: 'The Sorcerer',
    description: "The sorcerer likes to cast powerful spells and he can rely on their effect. And an effect is only worthwhile when it is composed of several layers of swirly thaumaturgic energy. This means that he is very focused on the concrete details of the code and optimizes it regarding its outcome and stability. He prefers ancient wisdom or in other words: time-tested technologies instead of trendy but buggy ones. If you demand, the Sorcerer can be very pragmatic in his means. This can result in violating architectural constraints or in sacrificing some of the generality for some more explicit but effective solutions.",
    designs: 'Like a good magic potion: edible, not overly exact but surely powerful',
    programming: 'Feeling the code grow to something magnificent',
    principlesLiked: [principle('GP', 'generalization_principle'),
        principle('ML', 'murphy_s_law')],
    principlesDisregarded: [principle('MP', 'model_principle'),
        principle('KISS', 'keep_it_simple_stupid'),
        principle('UP', 'uniformity_principle'),
        principle('PSU', 'principle_of_separate_understandability')],
    strengths: ["Sorcerers can work well with large complex code bases and legacy code.",
        "They are also good in optimizing existing one."],
    suggestions: ["Sorcerers tend to loose the view for the big picture. Step back once in a while and look if something can be improved. Maybe you will realize that something is unnecessary. You may then remove it and exchange it for something more helpful.",
        "You may like low-level (performance) optimizations. This may be fun but it's often better to optimize readability first and do low-level optimizations only when you are sure that you need them.",
        "Keep time in mind. Personal satisfaction is a good thing as it keeps you motivated and efficient. On the other hand there are normally economical constraints. Find a suitable compromise."],
    furtherReading: [''],
},
pcit: {
    name: 'The Artist',
    description: "The code is the code is the code. The Artist loves code, feels code, breaths code. Coding is an art and you need to be an Artist to really understand that. Code can be beautiful and the Artist strives to create beauty in everything he writes. Beautiful code is sophisticated, nicely arranged and powerful in its expression. Artistic code is thought-provoking. It makes you think and gives you new ideas every time you explore another aspect of it. Unfortunately not everybody is able to see its beauty. There are people who admire the Artist and others who'll stay philistines.",
    designs: 'Artistic -- and artificial',
    programming: 'An art',
    principlesLiked: [principle('GP', 'generalization_principle'),
        principle('DRY', 'don_t_repeat_yourself'),
        principle('ECV', 'encapsulate_the_concept_that_varies'),
        principle('DIP', 'dependency_inversion_principle'),
        principle('LSP', 'liskov_substitution_principle')],
    principlesDisregarded: [principle('KISS', 'keep_it_simple_stupid'),
        principle('MIMC', 'more_is_more_complex'),
        principle('RoE', 'rule_of_explicitness'),
        principle('ML', 'murphy_s_law'),
        principle('PLS', 'principle_of_least_surprise'),
        principle('IAP', 'invariant_avoidance_principle')],
    strengths: ["Artists care about their code, they strive for quality and foresighted, powerful solutions"],
    suggestions: ["Keep in mind that software is meant to fulfill business needs. Producing beautiful software is nice but typically you are payed for producing business value. Try to distinguish where you can produce art and where you have to restrain yourself.",
        "Others may find it difficult to understand your code. But one day this might be necessary (e.g. illness or vacation). The colleague who gets to change or use your code has to get the chance to understand it. You may want to learn how to build simple and elegant solutions. There is beauty in simplicity, too.",
        "You may find it difficult to agree with your colleagues when you argue about your code or some design decision to make. Try to find a way to make a decision, a compromise and maybe even find consensus."],
    furtherReading: [''],
},
pcir: {
    name: 'The Clockmaker',
    description: "A good system works precisely, just like a swiss clockwork. When every tiny cog wheel moves as it is suppose to, you can be sure that you've created a masterpiece. A clockmaker knows the tiniest details of his code and certainly there are many of them. His designs are sophisticated but they work perfectly fine. For him there is no replacement for traditional cog wheels and screws. They stood the test of time and work well. And think about the incredible things you can do with just a bit mechanical stuff like presenting the right time and date as well as depth, barometric pressure and much more.",
    designs: 'Full of carefully crafted details',
    programming: 'Like creating a beautiful, precise clockwork',
    principlesLiked: [principle('GP', 'generalization_principle'),
        principle('ML', 'murphy_s_law'),
        principle('UP', 'uniformity_principle')],
    principlesDisregarded: [principle('KISS', 'keep_it_simple_stupid'),
        principle('RoE', 'rule_of_explicitness')],
    strengths: ['You are very good at writing code which exactly does what you want it to do'],
    suggestions: ["Don't get lost in the details. There is some business which depends on you and loving details can also mean to be inefficient.",
        "Keep in mind that your colleagues may need to understand your code; it's not enough to make calling it foolproof; at some time in the future somebody else might have to make changes to your code for some reason; or maybe your code is so great that some other team likes to use and adapt it."],
    furtherReading: [''],
}
};

