import AuthService from "@/services/authService";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Chat from "@/models/chat";
import Joi from "joi";
import Message from "@/models/message";
import { ObjectId } from "mongodb";

connect();

export async function GET(req, content) {
  try {
    const { chatId } = content.params;
    const { user, error: authError } = await AuthService.verifyToken();

    if (authError) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const chatID = new ObjectId(chatId);
    const userID = new ObjectId(user._id);
    const chat = await Chat.findById(chatID);
    if (!chat) {
      return NextResponse.json(
        { error: "Chat channel does not exist" },
        { status: 400 }
      );
    }
    await Message.updateMany(
      {
        receiver: userID,
        chat_id: chatID,
        is_seen: false,
      },
      {
        $set: { is_seen: true },
      }
    );

    const messages = await Message.find({ chat_id: chatID })
      .populate("sender")
      .populate("receiver");

    return NextResponse.json(
      { message: "Chat messages fetched successfully", data: messages },
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
