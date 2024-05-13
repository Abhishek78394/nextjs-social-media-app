import AuthService from "@/services/authService";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Follower from "@/models/follower";
import Following from "@/models/following";
import Joi from "joi";

connect();

async function handleErrors(error, status = 500) {
  console.error("Error:", error);
  return NextResponse.json(
    { error: error.message || "Internal server error" },
    { status }
  );
}

export async function POST(req) {
  try {
    const { error, value } = Joi.object({
      followeeId: Joi.string().required(),
    }).validate(await req.json());

    if (error) return handleErrors(error, 400);

    const { user, error: authError } = await AuthService.verifyToken();
    if (authError) return handleErrors(authError, 401);

    const existingRequest = await Following.findOne({
      me_id: user._id,
      following: value.followeeId,
    });

    if (existingRequest) {
      if (existingRequest.status === "pending") {
        return NextResponse.json(
          { error: "Following request already pending" },
          { status: 409 }
        );
      } else {
        return NextResponse.json(
          { error: "You are already following this user" },
          { status: 409 }
        );
      }
    }

    const session = await Follower.startSession();
    session.startTransaction();

    try {
      const following = new Following({
        following: user._id,
        me_id: value.followeeId,
        status: "pending",
      });

      const existingFollower = await Follower.findOne(
        { follower: user._id, me_id: value.followeeId },
      );

      if (!existingFollower) {
        const newFollower = new Follower({
          follower: user._id,
          me_id: value.followeeId,
          status: "pending",
        });
        await newFollower.save({ session });
      }else {
        existingFollower.is_follow_back = true;
        existingFollower.status = 'follow_back';
        await existingFollower.save({ session });
      }

      await following.save({ session });

      await session.commitTransaction();

      return NextResponse.json(
        { message: "Following request sent successfully", success: true },
        { status: 200 }
      );
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    return handleErrors(error);
  }
}
