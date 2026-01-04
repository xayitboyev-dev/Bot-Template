module.exports = {
    apps: [
        {
            name: 'bot-template',
            script: 'npm',
            args: 'start',
            interpreter: 'none',
            instances: 1,
            autorestart: true,
            max_memory_restart: "300M",
        }
    ]
};