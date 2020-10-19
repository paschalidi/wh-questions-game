import { danger, warn, message } from 'danger'
import { readFileSync } from 'fs'

export default async () => {
    // Rule: encourage all new files to be TypeScript
    // const jsAppFiles = danger.git.created_files.filter(
    //     f => f.startsWith('src/') && f.endsWith('.js')
    // )

    // if (jsAppFiles.length) {
    //     const listed = danger.github.utils.fileLinks(jsAppFiles)
    //     fail(`Please use <code>*.ts</code> for new files. Found: ${listed}.`)
    // }

    // Scan files for $FlowFixMe and encourage to fix
    const committedJsFiles = danger.git.created_files
        .concat(danger.git.modified_files)
        .filter(f => f.includes('.js'))
    const flowFixMeComments = ['$FlowFixMe']
    committedJsFiles.forEach(file => {
        const content = readFileSync(file, 'utf8')
        flowFixMeComments.forEach(comment => {
            if (content.includes(comment)) {
                warn(
                    `Found a file you edited with a comment shortcut ${comment}. Perhaps you would like to see if this flow error can be easily fixed.`,
                    file
                )
            }
        })
    })
    message(`you the best`)

    // No `debugger` statements.
    // danger.git.modified_files
    //     .concat(danger.git.created_files)
    //     .filter(f => f.endsWith('.js') || f.endsWith('.ts'))
    //     .forEach(file => {
    //         const content = readFileSync(file, 'utf8')
    //         if (content.includes('debugger')) {
    //             fail(`Found a debugger statement left in by accident.`, file)
    //         }
    //     })
}
