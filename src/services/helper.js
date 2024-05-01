import { writeFile } from "fs/promises";

const Helper = {
  makeRandomNumber: (numDigits) => {
    if (typeof numDigits !== "number" || numDigits <= 0) {
      throw new Error("Number of digits must be a positive integer.");
    }

    const min = Math.pow(10, numDigits - 1);
    const max = Math.pow(10, numDigits) - 1;
    const randomNumber = Math.floor(min + Math.random() * (max - min + 1));

    return randomNumber;
  },
  isOtpExpired: (otpRecord) => {
    const otpExpiryDate = new Date(otpRecord["otp_expiry"]);
    const currentDate = Date.now();
    return otpExpiryDate.getTime() < currentDate;
  },
  isValidObjectId: (id) => {
    if (!id || typeof id !== "string" || id.length !== 24) {
      return false;
    }

    const objectIdRegex = /^[0-9a-f]{24}$/;
    return objectIdRegex.test(id);
  },
  uploadFile: async (file, destination) => {
    try {
      const byteData = await file.arrayBuffer();
      const buffer = Buffer.from(byteData);

      await writeFile(destination, buffer);

      return true;
    } catch (error) {
      console.error("Error uploading file:", error);
      return false;
    }
  },
};

module.exports = Helper;
