import {
  sign,
  verify
} from "jsonwebtoken";

class JWTRepository {
  private static instance: JWTRepository;
  private privateKEY: any;
  private publicKEY: any;
  private signOptions: any;
  private verifyOptions: any;

  constructor() {
    this.privateKEY = "abcd1234";
    this.publicKEY = "abcd1234";
    this.signOptions = {
      expiresIn: "12h"
    };

    this.verifyOptions = {
      expiresIn: "12h"
    };
  }

  generateToken(userId: string) {
    var token = sign(
      { userId },
      this.privateKEY,
      this.signOptions
    );
    return token;
  }

  async verfyToken(token: string) {
    const { userId } = await new Promise((resolve) => {
      verify(
        token,
        this.publicKEY,
        this.verifyOptions,
        (err, data: any) => {
          if (err) {
            throw err;
          } else {
            resolve({ userId: data.userId });
          }
        }
      );
    });
    return { userId };
  }

  public static getInstance(): JWTRepository {
    if (!JWTRepository.instance) {
      JWTRepository.instance = new JWTRepository();
    }

    return JWTRepository.instance;
  }
}

export { JWTRepository };
