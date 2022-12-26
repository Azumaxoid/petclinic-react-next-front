export const setCustomAttribute = (key: string, value: any) => {
    if (!!window.newrelic) {
        window.newrelic && window.newrelic.setCustomAttribute(key, value)
    }
}

export const addPageAction = (key: string, attributes: any) => {
    if (!!window.newrelic) {
        window.newrelic && window.newrelic.addPageAction(key, attributes)
    }
}
