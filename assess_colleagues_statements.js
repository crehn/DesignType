var prefix = "colleagues";
var statements = {}
statements.simple = [
    "Your colleague writes many but small classes and methods.",
    "In discussions about which solution will fit best, your colleague argues for implementing only the well known requirements instead of thinking too long about potentially upcoming requirements.",
    "You colleague doesn't document very much. In his defense, his codes doesn't need much of it anyway.",
    "Your colleague avoids dependencies, libraries and complex language constructs.",
    "Your colleague's solutions are simple and straight-forward but sometimes a bit nearsighted."
];
statements.powerful = [
    "Understanding your colleague's code can be quite a challenge.",
    "Your colleague often talks about protecting ones code from external changes e.g. by using generalization to avoid changes.",
    "You definitely need some documentation about the details or settings if you want to use an API of your colleague.",
    "Your colleague likes runtime configurability, code generators, and build profiles.",
    "Your colleague constantly thinks about extensibility, flexibility, portability, and future requirements."
];
statements.abstract = [
    "Your colleague never starts coding without thinking about the big picture. Your colleague always knows where the right spot for implementing a certain piece of functionality is.",
    "Your colleague likes classes for &quot;small&quot; concepts like ''Birthday'', ''CustomerNumber'', and ''EmailAddress''.",
    "In discussions your colleague is focused on the whole system and stops discussions on details.",
    "Documentation of your colleague normally covers the concepts and the ideas but rarely the implementation details.",
    "When your colleague tries to explain a certain system, he uses a whiteboard and some drawings."
];
statements.concrete = [
    "Your colleague often has the concrete code to solve the problem in mind and does not waste time with too much conceptual work.",
    "Your colleague gets familiar with any kind of code very fast and is able to explain you the details. This is why he can also deal very well with any legacy code.",
    "You sometimes wonder why several independent components of your colleague work perfectly fine for themselves but do not fit into some kind of big picture.",
    "When your colleague talks about documentation, he thinks about code comments and JavaDoc/Doxygen/etc.",
    "When your colleague tries to explain a certain system, he shows you some code."
];
statements.pragmatic = [
    "You often have the feeling that your colleague is very time driven and omits every kind of waste.",
    "Your colleague is very adaptable and open minded. You normally don't have exhausting discussions with him.",
    "Your colleague is someone who takes the initiative in order to get things done. If e.g. someone is sick, he will take care that necessary tasks are still done.",
    "Your colleague often finds &quot;solutions&quot; you would not think about (also including code snippets from the Internet). He sacrifices typical design approaches and other restrictions (e.g. coding style, good identifiers, comprehensive unit tests, etc.) but never the requested requirements.",
    "If there is a debate on principles your colleague tries to bring all sides down to earth (or he is obviously bored by these discussions)."
];
statements.idealistic = [
    "Your colleague is not satisfied before he is not absolutely convinced that this is the right way to go.",
    "Your colleague strives to produce high-quality code under all circumstances.",
    "Your colleague doesn't like compromises. Misusing certain frameworks, patterns, or concepts is a nightmare to him.",
    "Discussing with your colleague can be exhausting sometimes.",
    "You sometimes get the feeling that your colleague handles newbies a bit condescending."
];
statements.robust = [
    "You find much functionality in your colleagues code concerning with parameter verification, logging, and exception handling (normally with homemade exception classes).",
    "When you want to introduce a new technology, framework, or library, you have to convince your colleague that there are substantial benefits. He seems to stick with &quot;old&quot; technology.",
    "Your colleague often thinks about the consequences each change can imply.",
    "You colleague is very wary of using reflection, aspect orientation, and other forms of &quot;magic&quot;.",
    "You colleague is eager to standardize everything: technology, architectures, coding styles, release procedures, etc. Once these standards are established, your colleague insists on following them."
];
statements.technologic = [
    "Your colleague constantly pushes towards adopting new technology. ",
    "You find a large amount of technologies, frameworks, and libraries in your colleague's code.",
    "The coding style of your colleague seems to constantly change.",
    "Your colleague can get very enthusiastic about new ideas and technologies.",
    "Your colleague does not fear changing and refactoring old code and does so frequently."
];
