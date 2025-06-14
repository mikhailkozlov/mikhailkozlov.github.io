export default {
  content: [
        './resources/**/*.antlers.html',
        './resources/**/*.blade.php',
        './content/**/*.md'
    ],
    theme: {
        fontFamily: {
            sans: ['Inter', 'sans'],
            mono: ['Menlo', 'monospace']
        },
        extend: {
            colors: {
                'orange': '#f60',
                'teal': '#008483',
                'teal-light': '#a6d0cf'
            }
        }
    },
    plugins: [],
    important: true
}
