import AuthService from "@/services/authService";
import Helper from "@/services/helper";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET(req) {
  try {
    const { user, error: authError } = await AuthService.verifyToken();
    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }

    const followingList = await Helper.getFollowing(user._id);

    return NextResponse.json(
      { message: "Following list retrieved successfully", data: followingList },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
