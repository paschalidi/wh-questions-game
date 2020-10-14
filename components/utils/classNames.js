export default function classNames(...args) {
    return args.reduce((prev, index) => {
        const [className, condition] = index

        if (condition) {
            return `${className} ${prev}`
        }
        return prev
    }, '')
}
