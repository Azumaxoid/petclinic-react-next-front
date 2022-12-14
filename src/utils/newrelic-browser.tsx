export const setCustomAttribute = (key: string, value: any) => {
    if (!!window.newrelic) {
        window.newrelic && window.newrelic.setCustomAttribute(key, value)
    }
}