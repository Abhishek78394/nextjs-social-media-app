import AuthService from "@/services/authService";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/user";
import Joi from "joi";

connect();

export async function GET(req) {
  try {
    const { user, error } = await AuthService.verifyToken();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const fetchedUser = await User.findOne({
      email: user.email,
      _id: user._id,
    });

    if (!fetchedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    delete fetchedUser._doc.password;

    return NextResponse.json(
      { message: "User fetched successfully", data: fetchedUser },
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

export async function PUT(req) {
  try {
    const { error, value } = Joi.object({
      name: Joi.string().optional(),
      gender: Joi.string().valid("male", "female").optional(),
      username: Joi.string().optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string().min(10).max(10).optional(),
      bio: Joi.string().optional(),
    }).validate(await req.json());
    

    if (error)
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );

      const { user, error:authError } = await AuthService.verifyToken();

      if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 401 });
      }

    const fetchedUser = await User.findOne({
      email: user.email,
      _id: user._id,
    });

    if (!fetchedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    fetchedUser.username = value.username;
    fetchedUser.gender = value.gender;
    fetchedUser.phone = value.phone;
    fetchedUser.email = value.email || user.email;
    fetchedUser.name = value.name;
    fetchedUser.bio = value.bio;
    await fetchedUser.save();

    delete fetchedUser._doc.password;

    return NextResponse.json(
      { message: "Profile updated successfully", data: fetchedUser },
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
