import { encoded, translations } from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decoder(encoded, translations) {
    const str = 'id';
    const GROUP_ID = 'groupId'
    const res = encoded.map(obj => {
        for (let key in obj) {
            if (key !== GROUP_ID) {
                if (key.toLocaleLowerCase().includes(str)) {
                    obj[key] = !translations[obj[key]] ? null :  translations[obj[key]]                }
            }
        }
        return obj
    })
    return res
};

const decoded = decoder(encoded, translations)
console.log(decoded)
