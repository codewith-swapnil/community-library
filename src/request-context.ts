import { getNamespace } from "node-request-context";

export class RequestContext {
  public readonly id: number;
  public request: Request;
  public response: Response;

  constructor(request: Request, response: Response) {
    this.id = Math.random();
    this.request = request;
    this.response = response;
  }

  public static currentRequestContext(): RequestContext {
    const namespace = getNamespace("myapp.mynamespace");
    const rc = namespace.get("tid");
    return rc;
  }

  public static currentRequest(): Request {
    const requestContext = RequestContext.currentRequestContext();
    return requestContext.request;
  }

  public static currentUser(): any {
    const requestContext = RequestContext.currentRequestContext();
    return requestContext.request["user"];
  }
}
