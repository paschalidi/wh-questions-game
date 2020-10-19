import { danger, warn } from 'danger'
const fs = require('fs')

// Scan files for $FlowFixMe and encourage to fix
const committedJsFiles = danger.git.created_files
    .concat(danger.git.modified_files)
    .filter(f => f.includes('.js'))

const flowFixMeComment = '$FlowFixMe'
committedJsFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8')
    if (content.includes(flowFixMeComment)) {
        const fileLink = danger.github.utils.fileLinks([file])
        warn(
            `
            Danger found a flow comment \`${flowFixMeComment}\` in a file you edited in this PR.
            Perhaps you would like to see if this flow error can be easily fixed.
            File: ${fileLink}.
            `
        )
    }
})
