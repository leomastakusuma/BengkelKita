import telegramLogger from "telegram-logger"
import { generalResponse } from "./generalResponse"
export default class abstractBengkelKita extends generalResponse {
	sendTelegram(params) {
		const logger = telegramLogger({
			token: "518528266:AAFc9e2jhvPkaAsd1QbasV7NsLONTesoyhk",
			chat_id: "-207890427",
		})
		logger(params)
	}

	
}