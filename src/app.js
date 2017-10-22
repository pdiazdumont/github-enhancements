import styles from './styles.scss'
import { module as sizeModule } from './modules/size-module'

sizeModule.init()

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	window.location.reload()
})		

chrome.runtime.sendMessage({		
	text: 'Generic.TabUpdated'	
})
