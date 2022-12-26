
export async function getServerSideProps() {
    // You must require agent and put it within this function
    // otherwise it will try to get bundled by webpack and cause errors.
    const newrelic = require('newrelic')
    const browserTimingHeader = newrelic.getBrowserTimingHeader()
    return {
        props: {
            browserTimingHeader
        }
    }
}