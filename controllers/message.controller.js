import { response } from "express";
import { Conversation } from "../model/conversation.model.js";
import { Message } from "../model/message.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sendMessage = asyncHandler(async (req, res) => {

    const { message } = req.body;
    const { id: receiverId } = req.params
    const senderId = req.user?._id

    if (!message) throw new ApiError(401, "Message is required")
    if (!receiverId) throw new ApiError(401, "Receiver Id is required")
    if (!senderId) throw new ApiError(401, "Sender Id is required")

    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    })

    //if conversation has nothing
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        })
    }

    const newMessage = await Message.create({
        senderId, receiverId, message
    })

    if (!newMessage) throw new ApiError(501, "Error while creating message")

    conversation.messages.push(newMessage?._id)

    await conversation.save()

    return res.status(200).json(
        new ApiResponse(200, newMessage, "Message send successfully")
    )


})

const getMessages = asyncHandler(async (req, res) => {

    const {id:userToChatId}  = req.params
    const senderId  = req.user?._id

    if(!(userToChatId || senderId)) throw new ApiError(401,"Both userId and senderId are required")

    const conversation = await Conversation.findOne({
        participants:{$all:[senderId,userToChatId]}
    }).populate("messages") //replace ObjectId by actual docuement

    if(!conversation) throw new ApiError(501,"Error while fetching all conversation")

    return res.status(200).json(
        new ApiResponse(200,conversation.messages,"All messages between them fetched")
    )



})


export {
    sendMessage,
    getMessages,
}