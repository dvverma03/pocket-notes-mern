import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Group } from "../models/group.model.js";
import { Message } from "../models/message.model.js";

const fetchAllMessage = asyncHandler(async (req, res) => {
    const {user_id } = req.body;

    if ([user_id].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    console.log("user id",user_id)
    const group = await Group.findOne({ _id: user_id}).populate({
        path: "groupMessage",
        match: { user_id },
    });

    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    const userMessages = group.groupMessage;

    res.status(200).json(
        new ApiResponse(200, { data: userMessages }, "User messages fetched successfully")
    );
});

const sendMessageToGroup = asyncHandler(async (req, res) => {
    const { group_id, message } = req.body;
    if ([group_id, message].some((field) => !field?.trim())) {
        throw new ApiError(400, "Group id and message are required");
    }
    console.log("group_id",group_id)
    const group = await Group.findOne({ _id:group_id });

    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    const newMessage = new Message({ user_id: group_id,text:message});

    await newMessage.save();

    group.groupMessage.push(newMessage._id);
    await group.save();
    res.status(200).json(new ApiResponse(200, {}, 'Message sent successfully'));
});

export { fetchAllMessage, sendMessageToGroup };
