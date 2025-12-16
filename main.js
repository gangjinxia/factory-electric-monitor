import {
	createSSRApp
} from 'vue'
import App from './App.vue'
// 引入 ec-canvas 组件
export function createApp() {
	const app = createSSRApp(App)
	// 全局注册组件（注册后标签名可用 <ec-canvas> 或 <EcCanvas>）
	return {
		app
	}
}