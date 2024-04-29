import * as jose from 'jose'
const secretKey = process.env.JWT_SECRET;
const AuthService = {
  async issueToken(payload) {
    const secret = new TextEncoder().encode(secretKey)
    const alg = 'HS256'
    const jwt = await new jose.SignJWT({ 'urn:example:claim': true }).setProtectedHeader({ alg, payload })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('24h')
    .sign(secret)

    return jwt;
  },
};

module.exports = AuthService;
