export const simpleTestJsonWithArray = {
    a: "hej",
    arrs: [
        1,
        "a",
        {
            a: 1,
            b: true
        },
        false,
    ],
    f: false,
}

export const oneStringTestJson = {
    a: "hejsan",
}

export const oneNumberTestJson = {
    a: 1,
}

export const oneBooleanTestJson = {
    a: true,
}

export const oneObjectTestJson = {
    a: {
        b: 1,
        c: "hejsan",
        d: true,
    },
}

export const oneArrayTestJson = {
    a: [
        1,
        "hejsan",
        true,
    ],
}

export const allTests = [
    simpleTestJsonWithArray,
    oneStringTestJson,
    oneNumberTestJson,
    oneBooleanTestJson,
    oneObjectTestJson,
    oneArrayTestJson,
]


