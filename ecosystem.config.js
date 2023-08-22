module.exports = {
    apps: [
        {
            name: 'amo_tern_backend',
            port: 3001,
            exec_mode: 'cluster',
            instances: 'max', 
            script: './dist/main.js',
            args: 'start'
        }
    ]
}