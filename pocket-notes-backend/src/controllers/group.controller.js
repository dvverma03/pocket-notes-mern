import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Group } from "../models/group.model.js";

const createGroup = asyncHandler(async (req, res) => {
    const { groupName, groupColor, groupIcon } = req.body;

    if ([groupName, groupColor, groupIcon].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedGroup = await Group.findOne({ groupName });
    if (existedGroup) {
        throw new ApiError(409, "Group name already exists");
    }

    const newGroup = new Group({ groupName, groupIcon, groupColor });
    await newGroup.save();

    
    res.status(200).json(new ApiResponse(200, {}, "Group created successfully"));
});


const fetchAllGroup = asyncHandler(async (req, res) => {
    try {
        
        const groups = await Group.find({});
        return res.status(200).json(new ApiResponse(200, { data: groups }, "Groups fetched successfully"));
    } catch (error) {
        throw new ApiError(409, "No groups are present at this moment");
    }
});

export { createGroup, fetchAllGroup };
