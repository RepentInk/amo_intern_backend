module.exports = {
    apps: [
        {
            name: 'amo_tern_backend',
            port: 8001,
            exec_mode: 'cluster',
            instances: 'max', 
            script: 'dist/main.js',
            args: 'start'
        }
    ]
}