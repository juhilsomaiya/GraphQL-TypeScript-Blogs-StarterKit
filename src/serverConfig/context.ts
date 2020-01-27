import { Request, Response, response } from "express";
import { JWTRepository } from "../common/jwt";
import { UserRepository } from "../repository/user/user.repository";
import { BlogRepository } from "../repository/blog/blog.repository";

interface iContext {
  getUserId(): Promise<{ userId: string } | Error>;
  _userRepository: UserRepository;
  _blogRepository: BlogRepository;
}

class ContextRepository {
  private static instance: ContextRepository;
  private request: Request;
  private response: Response;
  public _userRepository: UserRepository;
  public _blogRepository: BlogRepository;
  public _JWTRepository: JWTRepository;

  constructor({ request, response }: { request: Request; response: Response }) {
    this.request = request;
    this.response = response;
    this._userRepository = UserRepository.getInstance();
    this._blogRepository = BlogRepository.getInstance();
    this._JWTRepository = JWTRepository.getInstance();
  }

  async getUserId() {
    const authorization = this.request.headers.authorization;
    if (!authorization) {
      throw new Error("No authorization headers found");
    }
    const token = authorization.replace("Bearer ", "");
    const { userId } = await this._JWTRepository.verfyToken(token);
    return { userId };
  }

  public static getInstance({
    request,
    response
  }: {
    request: Request;
    response: Response;
  }): ContextRepository {
    if (!ContextRepository.instance) {
      ContextRepository.instance = new ContextRepository({ request, response });
    }

    return ContextRepository.instance;
  }
}

export { ContextRepository, iContext };
