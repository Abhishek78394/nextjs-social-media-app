import AuthService from "@/services/authService";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import Joi from "joi";
import Message from "@/models/message";

connect();

export async function POST(req) {
  try {
    const { user, error: authError } = await AuthService.verifyToken();

    if (authError) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }
    const schema = Joi.object({
      message: Joi.string().required(),
      chat_id: Joi.string().required(),
    });
    const { error, value } = schema.validate(await req.json());
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }
    const chat = await Chat.findById(value.chat_id);
    if (!chat) {
      return NextResponse.json(
        { error: "Chat channel does not exist" },
        { status: 400 }
      );
    }
    if (!chat.sender_id.equals(user._id) && !chat.receiver_id.equals(user._id)) {
      return NextResponse.json(
        { error: "You are not a valid member in this chat" },
        { status: 403 }
      );
    }
    let messageReceiverId;
    if (chat.sender_id.equals(user._id)) {
      messageReceiverId = chat.receiver_id;
    } else {
      messageReceiverId = chat.sender_id;
    }

    const newMessage =  await Message.create({
      sender: user._id,
      receiver: messageReceiverId,
      message: value.message,
      chat_id: value.chat_id
    })

    return NextResponse.json(
      { message: "Chat message created successfully", data: newMessage},
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
