import AuthService from "@/services/authService";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Follower from "@/models/follower";
import Joi from "joi";

connect();

export async function DELETE(req) {
  try {
    const { error, value } = Joi.object({
      followeeId: Joi.string().required(),
    }).validate(await req.json());

    if (error)
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );

    const { user, error: authError } = await AuthService.verifyToken();

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }
    const followingUser = await Follower.findOne({
      follower_id: user._id,
      following_id: value.followeeId,
      status: { $in: ['accepted', 'follow', 'followed_back_requested'] }
    });

    
    if (!followingUser) {
      return NextResponse.json(
        { error: "User not found in your following list" },
        { status: 404 }
      );
    }

    followingUser.status = 'accepted';
    await followingUser.save();

    return NextResponse.json(
      { message: "User removed from your following list", success: true },
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
