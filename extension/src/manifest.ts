const base = {
    name: "map-editor",
    description: "map editor for tetr.io",
    version: "1.0.0",
    manifest_version: 3,
    author: "RedStone576",

    content_scripts: [{
        matches: ["https://tetr.io/*", "https://ch.tetr.io/*"],
        js: ["./src/index.js"],
        run_at: "document_start"
    }],
    
    web_accessible_resources: [{
        matches: ["https://tetr.io/*"],
        resources: ["./src/**/*.*", "./res/**/*"]
    }],

    host_permissions: ["*://tetr.io/*"],

    permissions: [
        "declarativeNetRequest",
        "declarativeNetRequestFeedback",
        "storage",
        "unlimitedStorage"
    ],
} 

const ff = {
    background: {
        "scripts": ["./src/background.js"]
    }
}

const cr = {
    background: {
        "service_worker": "./src/background.js",
    },

    browser_specific_settings: {
        gecko: {
            id: "tetrmod@redstone576",
            strict_min_version: "90.0"
        }
    }
}
