const { Client, GatewayIntentBits } = require("discord.js")
const mongoose = require('mongoose')
const {connect} = require('mongoose')
const { token } = require('./config.json')
const eventHandler = require('./handler/EventsHandler')

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent] 
});

(async () => {
try {
		// await mongoose.connect('mongodb://localhost:27017/BrawlStats')
		// console.log('MongoDB connected.')
	
		eventHandler(client)
		client.login(token);
} catch (error) {
	console.log(error)
}
})()
