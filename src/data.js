// fetch fda data containing list of drugs and other medicines

const res = await fetch('https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=38647')
const json = await res.json()
const drugsList = Array.from(new Set(json.results.map((i) => i.term)))

export default drugsList
