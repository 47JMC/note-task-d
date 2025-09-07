import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRouter = express.Router();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, WEBSITE_URL, JWT_SECRET } =
  process.env;

if (
  !CLIENT_ID ||
  !CLIENT_SECRET ||
  !REDIRECT_URI ||
  !WEBSITE_URL ||
  !JWT_SECRET
) {
  throw new Error("Missing environment variables");
}

authRouter.get("/login", (req, res) => {
  const { CLIENT_ID, REDIRECT_URI } = process.env;

  if (!CLIENT_ID || !REDIRECT_URI) {
    return res.status(500).send("Missing environment variables");
  }

  res.redirect(
    `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=identify`
  );
});

authRouter.get("/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  const oauthRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code as string,
      redirect_uri: REDIRECT_URI,
      scope: "identify",
    }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const oauthData: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  } = await oauthRes.json();

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${oauthData.access_token}` },
  });

  const userData = (await userRes.json()) as {
    username: string;
    id: string;
    global_name: string;
    avatar: string;
  };

  const user = await User.findOne({ id: userData.id });

  if (!user) {
    const newUser = new User({
      id: userData.id,
      username: userData.username,
      global_name: userData.global_name,
      avatar: userData.avatar,
    });

    await newUser.save();
  } else {
    user.username = userData.username;
    user.global_name = userData.global_name;
    user.avatar = userData.avatar;
    await user.save();
  }

  const token = jwt.sign(
    {
      id: userData.id,
      username: userData.avatar,
      global_name: userData.global_name,
      avatar: userData.avatar,
    },
    JWT_SECRET,
    { expiresIn: "7d", algorithm: "HS256" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 14 * 24 * 60 * 60 * 1000,
  });

  res.redirect(WEBSITE_URL);
});

authRouter.get("/me", (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(400).send("No token provided");

  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256", "RS256"],
    }) as { id: string; username: string; global_name: string; avatar: string };

    const user = User.find({ id: decoded.id });

    if (!user) return res.status(404).send("User not found");

    return res.json(decoded);
  } catch (err) {
    res.status(400).send("Invalid token");
  }
});

authRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect(process.env.WEBSITE_URL || "/");
});

export default authRouter;
