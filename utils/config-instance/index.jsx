export default class ConfigInstance {
    // 获取单例
    static getInstance() {
        if (!ConfigInstance.instance) {
            ConfigInstance.instance = new ConfigInstance();
        }
        return ConfigInstance.instance;
    }

    config
}

