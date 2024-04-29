
import * as jose from 'jose';
const secretKey = process.env.JWT_SECRET;
import { cookies } from "next/headers";

const Helper = {
    makeRandomNumber: (numDigits) => {
        if (typeof numDigits !== 'number' || numDigits <= 0) {
            throw new Error('Number of digits must be a positive integer.');
        }
    
        const min = Math.pow(10, numDigits - 1);
        const max = Math.pow(10, numDigits) - 1;
        const randomNumber = Math.floor(min + Math.random() * (max - min + 1));
    
        return randomNumber;
    },
    verifyToken: async () => {
        const {value} = cookies().get("token");
        if (!value) {
          return { error: "Access denied", status: 401 };
        }
        try {
          const secret = new TextEncoder().encode(secretKey);
          const decodedToken = await jose.jwtVerify(value, secret, {
            issuer: "urn:example:issuer",
            audience: "urn:example:audience",
          });
         
          return { verifyUser: decodedToken.protectedHeader.payload }; 
        } catch (error) {
          console.log(error);
          if (error.message === '"exp" claim timestamp check failed') {
            return { error: "Token expired. Please login again.", status: 401 };
          } else {
            return { error: "Invalid token", status: 401 };
          }
        }
      }
};

module.exports = Helper;