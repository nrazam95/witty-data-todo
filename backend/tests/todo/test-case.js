const preSentences = [
    'I need to ',
    'I have to ',
    'I must ',
    'I should ',
    'I want to ',
    'Me & my friends want to ',
    'Me & my boyfriend need to ',
    'Me & my family have to ',
]

const middleVerbs = [
    'start ',
    'stop ',
    'go ',
    'make ',
    'clean ',
    'buy '
]

const endNouns = [
    'dieting.',
    'compaining.',
    'sleep early.',
    'warning them about the sale.',
    'a new car.',
    'a new house.',
    'a new phone.',
    'a new laptop.',
]

const createRandomSentence = () => {
    const preSentence = preSentences[Math.floor(Math.random() * preSentences.length)]
    const middleVerb = middleVerbs[Math.floor(Math.random() * middleVerbs.length)]
    const endNoun = endNouns[Math.floor(Math.random() * endNouns.length)]
    return preSentence + middleVerb + endNoun
}

const createRandomDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + Math.floor(Math.random() * 10))
    return date
}