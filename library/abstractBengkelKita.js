import telegramLogger from "telegram-logger"
import {
	abstractResponse
} from "./abstractResponse"
import mysql from "mysql"
import config from "config"

export default class abstractBengkelKita extends abstractResponse {
	sendTelegram(params) {
		const logger = telegramLogger({
			token: "518528266:AAFc9e2jhvPkaAsd1QbasV7NsLONTesoyhk",
			chat_id: "-207890427",
		})
		logger(params)
	}

}